// gameRoom.js
// Individual game room handling server-authoritative game state

// World bounds for Phase 1 (client-authoritative positions)
const WORLD_BOUNDS = {
  width: 1300, // match Phaser config width
  height: 650, // match Phaser config height
  margin: 200, // allow going a bit off-screen before clamping
};

class GameRoom {
  constructor(matchId, matchData, { io, db }) {
    this.matchId = matchId;
    this.matchData = matchData; // { mode, map, players }
    this.io = io;
    this.db = db;

    // Room state
    this.status = "waiting"; // waiting, active, finished
    this.startTime = Date.now();
    this.players = new Map(); // socketId -> playerData
    this.gameState = null;

  // Game loop (will migrate to fixed-step accumulator + snapshot cadence)
  this.gameLoop = null; // legacy interval reference (used only until refactor start)
  this._loopRunning = false;
  this._tickId = 0; // monotonically increasing per 60Hz tick
  this._lastSnapshotMono = 0;
  this._snapshotIntervals = []; // diagnostics (ms spacing between snapshots)
  this._diagLastLogMono = 0;
  this.FIXED_DT_MS = 1000 / 60; // 60 Hz fixed step
  this.SNAPSHOT_EVERY_TICKS = 3; // 60/3 = 20 Hz snapshots
  this.DEV_TIMING_DIAG = true; // temporary diagnostics flag

    // Health/regen tuning (simple, readable constants)
    this.REGEN_DELAY_MS = 3500; // idle time before regen starts
    this.REGEN_TICK_MS = 1500; // heal every 1.5 seconds in discrete ticks
    this.REGEN_MISSING_RATIO = 0.30; // heal 30% of missing health each tick (regressive)
    this.REGEN_MIN_ABS = 500; // absolute minimum heal per tick (fixed amount, not percent)
    this.REGEN_BROADCAST_MIN_MS = 120; // avoid spamming health-update too fast

    console.log(
      `[GameRoom ${matchId}] Created for mode ${matchData.mode}, map ${matchData.map}`
    );
  }

  /**
   * Add a player to this game room
   * @param {object} socket
   * @param {object} user
   */
  async addPlayer(socket, user) {
    // Verify this user is actually supposed to be in this match
    const isParticipant = this.matchData.players.some(
      (p) => p.user_id === user.user_id
    );
    if (!isParticipant) {
      throw new Error("You are not a participant in this match");
    }

    // Check if player is already in the room (reconnection)
    const existingPlayer = Array.from(this.players.values()).find(
      (p) => p.user_id === user.user_id
    );
    if (existingPlayer) {
      // Update socket for reconnection
      this.players.delete(existingPlayer.socketId);
      existingPlayer.socketId = socket.id;
      this.players.set(socket.id, existingPlayer);
      console.log(`[GameRoom ${this.matchId}] Player ${user.name} reconnected`);
    } else {
      // New player joining
      const matchPlayer = this.matchData.players.find(
        (p) => p.user_id === user.user_id
      );
      // Fetch player's character level for current class to compute health/damage
      const level = await this._fetchLevelForUser(
        user.user_id,
        matchPlayer.char_class
      );
      const { maxHealth, baseDamage, specialDamage } = this._computeStats(
        matchPlayer.char_class,
        level
      );

      const playerData = {
        socketId: socket.id,
        user_id: user.user_id,
        name: user.name,
        team: matchPlayer.team,
        char_class: matchPlayer.char_class,

        // Game state
        x: 400, // Will be set by spawn logic
        y: 400,
        maxHealth,
        health: maxHealth,
        isAlive: true,
        lastInput: Date.now(),

        // Input buffer for server authority
        inputBuffer: [],

        // Combat stats (server-side authoritative)
        level,
        baseDamage,
        specialDamage,

        // Combat timestamps for regen and anti-spam
        lastCombatAt: Date.now(), // updated when attacking or being hit
        lastAttackAt: 0,
        lastDamagedAt: 0,
        _regenCarry: 0, // fractional regen accumulator
        _lastHealthBroadcastAt: 0,
      };

      this.players.set(socket.id, playerData);
      console.log(
        `[GameRoom ${this.matchId}] Player ${user.name} joined (${this.players.size}/${this.matchData.players.length})`
      );
    }

    // Join socket to game room
    socket.join(`game:${this.matchId}`);

    // Set up socket event handlers for this room
    this.setupPlayerSocket(socket);

    // Send initial game state to the player
    this.sendGameStateToPlayer(socket);

    // Start game if all players are present
    if (
      this.players.size === this.matchData.players.length &&
      this.status === "waiting"
    ) {
      this.startGame();
    }
  }

  /**
   * Remove a player from this game room
   * @param {object} socket
   * @param {object} user
   */
  async removePlayer(socket, user) {
    const playerData = this.players.get(socket.id);
    if (!playerData) return;

    socket.leave(`game:${this.matchId}`);
    this.players.delete(socket.id);

    console.log(
      `[GameRoom ${this.matchId}] Player ${user.name} left (${this.players.size} remaining)`
    );

    // Handle disconnection during active game
    if (this.status === "active") {
      // Mark player as disconnected but keep in game for potential reconnection
      // In a real game, you might want to pause or give them a grace period
      this.io.to(`game:${this.matchId}`).emit("player:disconnected", {
        name: user.name,
        playersRemaining: this.players.size,
      });
    }
  }

  /**
   * Set up socket event handlers for a player in this room
   * @param {object} socket
   */
  setupPlayerSocket(socket) {
    // Handle player input
    socket.on("game:input", (inputData) => {
      this.handlePlayerInput(socket.id, inputData);
    });

    // Handle player actions (attacks, abilities, etc.)
    socket.on("game:action", (actionData) => {
      this.handlePlayerAction(socket.id, actionData);
    });

    // Owner-side hit proposal (server authoritative application)
    socket.on("hit", (payload) => {
      this.handleHit(socket.id, payload);
    });

    // Heal proposal (e.g., abilities/pickups) - server clamps and applies
    socket.on("heal", (payload) => {
      this.handleHeal(socket.id, payload);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      // This will be handled by the main socket disconnect handler
      // which calls gameHub.handlePlayerLeave
    });
  }

  /**
   * Send initial game state to a player
   * @param {object} socket
   */
  sendGameStateToPlayer(socket) {
    const playerData = this.players.get(socket.id);
    if (!playerData) return;

    // Prepare game state for this player
    const gameStateForPlayer = {
      matchId: this.matchId,
      mode: this.matchData.mode,
      map: this.matchData.map,
      yourTeam: playerData.team,
      yourCharacter: playerData.char_class,
      players: Array.from(this.players.values()).map((p) => ({
        name: p.name,
        team: p.team,
        char_class: p.char_class,
        x: p.x,
        y: p.y,
        health: p.health,
        stats: { health: p.maxHealth },
        level: p.level,
        isAlive: p.isAlive,
      })),
      status: this.status,
    };

    socket.emit("game:init", gameStateForPlayer);
  }

  /**
   * Start the game
   */
  startGame() {
    console.log(
      `[GameRoom ${this.matchId}] Starting game with ${this.players.size} players`
    );

    this.status = "active";

    // Initialize spawn positions (basic implementation)
    this.initializeSpawnPositions();

    // Notify all players that game is starting
    this.io.to(`game:${this.matchId}`).emit("game:start", {
      countdown: 3, // 3 second countdown
    });

    // Start the game loop after countdown
    setTimeout(() => {
      this.startGameLoop();
    }, 3000);
  }

  /**
   * Initialize spawn positions for players
   */
  initializeSpawnPositions() {
    const spawnPositions = {
      team1: [
        { x: 200, y: 300 },
        { x: 250, y: 300 },
        { x: 300, y: 300 },
      ],
      team2: [
        { x: 800, y: 300 },
        { x: 850, y: 300 },
        { x: 900, y: 300 },
      ],
    };

    let team1Index = 0;
    let team2Index = 0;

    for (const playerData of this.players.values()) {
      if (playerData.team === "team1") {
        const spawn =
          spawnPositions.team1[team1Index % spawnPositions.team1.length];
        playerData.x = spawn.x;
        playerData.y = spawn.y;
        team1Index++;
      } else {
        const spawn =
          spawnPositions.team2[team2Index % spawnPositions.team2.length];
        playerData.x = spawn.x;
        playerData.y = spawn.y;
        team2Index++;
      }
    }
  }

  /**
   * Start the server game loop
   */
  startGameLoop() {
    if (this._loopRunning) return; // already running
    console.log(`[GameRoom ${this.matchId}] Fixed-step loop started`);
    this._loopRunning = true;
    const perf = (typeof performance !== 'undefined' && performance) || null;
    const monoNow = () => (perf && typeof perf.now === 'function' ? perf.now() : Date.now());
    let lastMono = monoNow();
    let acc = 0;

    const step = (currentMono) => {
      this._tickId++;
      this.processTick();
      this.processRegen();
      // Snapshot cadence: deterministic every N ticks
      if (this._tickId % this.SNAPSHOT_EVERY_TICKS === 0) {
        this._emitSnapshotWithTiming(currentMono);
      }
    };

    const loop = () => {
      if (!this._loopRunning) return;
      const nowMono = monoNow();
      let delta = nowMono - lastMono;
      if (delta < 0) delta = 0; // guard
      if (delta > 1000) delta = 1000; // clamp huge pause (avoid spiral)
      lastMono = nowMono;
      acc += delta;
      while (acc >= this.FIXED_DT_MS) {
        step(nowMono);
        acc -= this.FIXED_DT_MS;
      }
      setImmediate(loop);
    };
    setImmediate(loop);
  }

  _emitSnapshotWithTiming(snapMono) {
    const wall = Date.now();
    if (this._lastSnapshotMono > 0) {
      const spacing = snapMono - this._lastSnapshotMono;
      if (spacing >= 0) this._snapshotIntervals.push(spacing);
    }
    this._lastSnapshotMono = snapMono;
    this.broadcastSnapshot({
      tickId: this._tickId,
      tMono: snapMono,
      sentAtWallMs: wall,
    });
    if (this.DEV_TIMING_DIAG) {
      if (snapMono - this._diagLastLogMono >= 1000 && this._snapshotIntervals.length) {
        const arr = this._snapshotIntervals.slice(-60);
        const avg = arr.reduce((a,b)=>a+b,0) / arr.length;
        const variance = arr.reduce((a,b)=>a+Math.pow(b-avg,2),0)/arr.length;
        const stdev = Math.sqrt(variance);
        console.log(`[GameRoom ${this.matchId}] timing tickId=${this._tickId} avgSpacing=${avg.toFixed(2)}ms stdev=${stdev.toFixed(2)}ms samples=${arr.length}`);
        this._diagLastLogMono = snapMono;
      }
    }
  }

  /**
   * Handle player input (movement, etc.)
   * @param {string} socketId
   * @param {object} inputData
   */
  handlePlayerInput(socketId, inputData) {
    const playerData = this.players.get(socketId);
    if (!playerData || !playerData.isAlive) return;

    // Validate input
    if (!inputData || typeof inputData !== "object") return;

    // If client sent authoritative position, accept it (Phase 1: make it work)
    if (
      typeof inputData.x === "number" &&
      typeof inputData.y === "number" &&
      Number.isFinite(inputData.x) &&
      Number.isFinite(inputData.y)
    ) {
      const minX = -WORLD_BOUNDS.margin;
      const maxX = WORLD_BOUNDS.width + WORLD_BOUNDS.margin;
      const minY = -WORLD_BOUNDS.margin;
      const maxY = WORLD_BOUNDS.height + WORLD_BOUNDS.margin;
      playerData.x = Math.max(minX, Math.min(maxX, inputData.x));
      playerData.y = Math.max(minY, Math.min(maxY, inputData.y));
      if (typeof inputData.flip !== "undefined") {
        playerData.flip = !!inputData.flip;
      }
      if (typeof inputData.animation === "string") {
        playerData.animation = inputData.animation;
      }
      playerData.lastInput = Date.now();
      return; // done
    }

    // Else treat as directional input (server-simulated fallback)
    inputData.timestamp = Date.now();
    playerData.inputBuffer.push(inputData);
    if (playerData.inputBuffer.length > 10) playerData.inputBuffer.shift();
    playerData.lastInput = Date.now();
  }

  /**
   * Handle player actions (attacks, abilities)
   * @param {string} socketId
   * @param {object} actionData
   */
  handlePlayerAction(socketId, actionData) {
    const playerData = this.players.get(socketId);
    if (!playerData || !playerData.isAlive) return;

    // Basic action validation
    if (!actionData || !actionData.type) return;

    console.log(
      `[GameRoom ${this.matchId}] Player ${playerData.name} action: ${actionData.type}`
    );

    // Mark as combat to pause regen even if attack misses
    playerData.lastCombatAt = Date.now();

    // Process action (implement specific action handling later)
    // For now, just broadcast to other players
    this.io.to(`game:${this.matchId}`).emit("game:action", {
      playerId: playerData.user_id,
      playerName: playerData.name,
      // Include authoritative origin and facing for accurate remote visuals
      origin: { x: playerData.x, y: playerData.y },
      flip: !!playerData.flip,
      character: playerData.char_class,
      action: actionData,
      // Optional timestamp for ordering on client
      t: Date.now(),
    });
  }

  /**
   * Process a single game tick
   */
  processTick() {
    // For Phase 1, just process basic movement inputs
    for (const playerData of this.players.values()) {
      if (!playerData.isAlive) continue;

      // Process latest input from buffer
      if (playerData.inputBuffer.length > 0) {
        const latestInput =
          playerData.inputBuffer[playerData.inputBuffer.length - 1];
        this.processPlayerMovement(playerData, latestInput);

        // Clear old inputs
        playerData.inputBuffer = [];
      }
    }
  }

  /**
   * Apply passive health regeneration to players who are out of combat.
   */
  processRegen() {
    const now = Date.now();
    for (const p of this.players.values()) {
      if (!p.isAlive) continue;
      if (typeof p.maxHealth !== "number" || typeof p.health !== "number")
        continue;

      const idleFor = now - (p.lastCombatAt || 0);
      if (idleFor < this.REGEN_DELAY_MS) continue; // still in post-combat cooldown
      if (p.health >= p.maxHealth) continue; // already full

      const nextAt = p._regenNextAt || 0;
      if (now < nextAt) continue; // wait until next tick

      const missing = Math.max(0, p.maxHealth - p.health);
      // Base desired heal = max(fixed minimum, % of missing)
      const baseDesired = Math.max(
        this.REGEN_MIN_ABS,
        Math.ceil(missing * this.REGEN_MISSING_RATIO)
      );
      // Round up to next 100 multiple (e.g., 1->100, 401->500)
      let inc = Math.ceil(baseDesired / 100) * 100;
      // Never exceed the actual missing health
      inc = Math.min(inc, missing);
      const old = p.health;
      p.health = Math.min(p.maxHealth, p.health + inc);
      p._regenNextAt = now + this.REGEN_TICK_MS;
      if (p.health !== old) {
        this._maybeBroadcastHealth(p, now);
      }
    }
  }

  /**
   * Process player movement
   * @param {object} playerData
   * @param {object} input
   */
  processPlayerMovement(playerData, input) {
    // Basic movement processing (expand this later)
    const speed = 5;

    if (input.left) playerData.x -= speed;
    if (input.right) playerData.x += speed;
    if (input.up) playerData.y -= speed;
    if (input.down) playerData.y += speed;

    // Basic bounds checking (allow slight off-screen margin)
    const minX = -WORLD_BOUNDS.margin;
    const maxX = WORLD_BOUNDS.width + WORLD_BOUNDS.margin;
    const minY = -WORLD_BOUNDS.margin;
    const maxY = WORLD_BOUNDS.height + WORLD_BOUNDS.margin;
    playerData.x = Math.max(minX, Math.min(maxX, playerData.x));
    playerData.y = Math.max(minY, Math.min(maxY, playerData.y));
  }

  /**
   * Broadcast game state snapshot to all players
   */
  broadcastSnapshot(extraTiming = null) {
    const snapshot = {
      timestamp: Date.now(), // legacy field for existing clients
      players: {},
    };
    if (extraTiming) {
      snapshot.tickId = extraTiming.tickId;
      snapshot.tMono = extraTiming.tMono;
      snapshot.sentAtWallMs = extraTiming.sentAtWallMs;
    }

    // Build snapshot of all player positions
    for (const playerData of this.players.values()) {
      snapshot.players[playerData.name] = {
        x: playerData.x,
        y: playerData.y,
        flip: !!playerData.flip,
        animation: playerData.animation || null,
        health: playerData.health,
        isAlive: playerData.isAlive,
      };
    }

    // Disable compression for frequent movement messages to reduce latency
  this.io.to(`game:${this.matchId}`).compress(false).emit("game:snapshot", snapshot);
  }

  /**
   * Clean up room resources
   */
  cleanup() {
    // Stop fixed-step loop
    this._loopRunning = false;
    if (this.gameLoop) { // legacy interval if still allocated
      try { clearInterval(this.gameLoop); } catch(_) {}
      this.gameLoop = null;
    }

    // Disconnect all remaining players
    for (const playerData of this.players.values()) {
      const socket = this.io.sockets.sockets.get(playerData.socketId);
      if (socket) {
        socket.leave(`game:${this.matchId}`);
      }
    }

    this.players.clear();
    console.log(`[GameRoom ${this.matchId}] Cleaned up`);
  }

  // Getters
  getPlayerCount() {
    return this.players.size;
  }
  getStatus() {
    return this.status;
  }
  getStartTime() {
    return this.startTime;
  }

  /**
   * Handle a client-proposed hit. Server validates and applies damage.
   * @param {string} socketId
   * @param {object} payload { attacker, target, attackType?, instanceId?, damage? }
   */
  handleHit(socketId, payload) {
    try {
      if (!payload || typeof payload !== "object") return;
      const attackerName = String(payload.attacker || "").trim();
      const targetName = String(payload.target || "").trim();
      if (!attackerName || !targetName) return;

      const attacker = Array.from(this.players.values()).find(
        (p) => p.name === attackerName
      );
      const target = Array.from(this.players.values()).find(
        (p) => p.name === targetName
      );
      if (!attacker || !target) return;
      if (!attacker.isAlive || !target.isAlive) return;
      // Allow self-hit (suicide on fall) but otherwise disable friendly fire
      const isSelf = attacker.name === target.name;
      if (
        !isSelf &&
        attacker.team &&
        target.team &&
        attacker.team === target.team
      )
        return;

      // Determine damage from server-side stats
      const attackType = String(payload.attackType || "basic").toLowerCase();
      const base =
        attackType === "special"
          ? Number(attacker.specialDamage || 0)
          : Number(attacker.baseDamage || 0);
      let dmg = Number.isFinite(base) && base > 0 ? base : 0;

      if (dmg <= 0) return;

      // Generous plausibility check on distance (without per-ability ranges yet)
      // Prevents blatant long-range spoofing while not being too strict.
      const dx = (attacker.x || 0) - (target.x || 0);
      const dy = (attacker.y || 0) - (target.y || 0);
      const dist = Math.hypot(dx, dy);
      const maxDist = attackType === "special" ? 1000 : 850; // px
      if (!isSelf && dist > maxDist) return; // ignore impossible hits

      // Basic per-attacker->target rate limit to avoid accidental double submissions
      this._recentHits = this._recentHits || new Map(); // key: attacker|target -> timestamp
      const key = attacker.name + "|" + target.name + "|" + attackType;
      const now = Date.now();
      const last = this._recentHits.get(key) || 0;
      const DUP_WINDOW_MS = 80; // hits within 80ms considered duplicate
      if (!isSelf && now - last < DUP_WINDOW_MS) return; // duplicate, ignore
      this._recentHits.set(key, now);

      // Apply damage
      const old = target.health;
      target.health = Math.max(0, target.health - Math.round(dmg));
      attacker.lastAttackAt = now;
      target.lastDamagedAt = now;
      attacker.lastCombatAt = now;
      target.lastCombatAt = now;

      if (target.health !== old) {
        if (target.health === 0) target.isAlive = false;
        this._broadcastHealthUpdate(target);
        if (!target.isAlive) {
          console.log(
            `%c[GameRoom ${this.matchId}] Player ${target.name} was killed by ${attacker.name}`,
            "color: red; font-weight: bold;"
          );
          // Optional: emit death event
          this.io.to(`game:${this.matchId}`).emit("player:dead", {
            username: target.name,
            gameId: this.matchId,
          });
          // After a death, check victory conditions
          try {
            this._checkVictoryCondition();
          } catch (e) {
            console.warn(
              `[GameRoom ${this.matchId}] victory check failed`,
              e?.message
            );
          }
        }
      }
    } catch (e) {
      console.warn(`[GameRoom ${this.matchId}] handleHit error:`, e?.message);
    }
  }

  /**
   * Fetch the level for a user's current character class.
   */
  async _fetchLevelForUser(userId, charClass) {
    try {
      const rows = await this.db.runQuery(
        "SELECT char_levels FROM users WHERE user_id = ? LIMIT 1",
        [userId]
      );
      const json = rows[0]?.char_levels || null;
      if (!json) return 1;
      const obj = JSON.parse(json);
      const lvl = Number(obj?.[charClass]) || 1;
      return Math.max(1, lvl);
    } catch (_) {
      return 1;
    }
  }

  /**
   * Compute derived stats for a character at a level.
   */
  _computeStats(charClass, level) {
    try {
      const {
        getHealth,
        getDamage,
        getSpecialDamage,
      } = require("../../lib/characterStats.js");
      const maxHealth = Math.max(1, Number(getHealth(charClass, level)) || 1);
      const baseDamage = Math.max(0, Number(getDamage(charClass, level)) || 0);
      const specialDamage = Math.max(
        0,
        Number(getSpecialDamage(charClass, level)) || 0
      );
      return { maxHealth, baseDamage, specialDamage };
    } catch (e) {
      console.warn(
        `[GameRoom ${this.matchId}] computeStats failed:`,
        e?.message
      );
      return { maxHealth: 100, baseDamage: 100, specialDamage: 200 };
    }
  }

  /**
   * Emit a health-update to all players in the room.
   */
  _broadcastHealthUpdate(playerData) {
    this.io.to(`game:${this.matchId}`).emit("health-update", {
      username: playerData.name,
      health: Math.max(0, Math.round(playerData.health)),
      maxHealth: Math.max(
        1,
        Math.round(playerData.maxHealth || playerData.health || 1)
      ),
      gameId: this.matchId,
    });
    playerData._lastHealthBroadcastAt = Date.now();
  }

  /**
   * Conditionally broadcast health if min interval elapsed.
   */
  _maybeBroadcastHealth(playerData, nowTs) {
    const last = Number(playerData._lastHealthBroadcastAt || 0);
    if (
      nowTs - last >= this.REGEN_BROADCAST_MIN_MS ||
      playerData.health === playerData.maxHealth
    ) {
      this._broadcastHealthUpdate(playerData);
    }
  }

  /**
   * Handle heal proposal from client. Applies clamped heal to target.
   */
  handleHeal(socketId, payload) {
    try {
      if (!payload || typeof payload !== "object") return;
      const sourceName = String(
        payload.source || payload.attacker || ""
      ).trim();
      const targetName = String(payload.target || "").trim();
      if (!targetName) return;

      const source = sourceName
        ? Array.from(this.players.values()).find((p) => p.name === sourceName)
        : null;
      const target = Array.from(this.players.values()).find(
        (p) => p.name === targetName
      );
      if (!target || !target.isAlive) return;

      // Basic anti-abuse: optionally require same team if source provided
      if (source && source.team && target.team && source.team !== target.team)
        return;

      // Compute heal amount: use a conservative default (half of baseDamage) if no ability type specified
      const ability = String(
        payload.abilityType || payload.attackType || "heal"
      ).toLowerCase();
      let amount = 0;
      if (source) {
        // Tie to source offensive power to avoid huge spoofed heals
        const ref = Math.max(0, Number(source.baseDamage || 0));
        amount = Math.round(ref * 0.5);
      } else {
        amount = 200; // fallback small heal
      }
      if (amount <= 0) return;

      const now = Date.now();
      const old = target.health;
      target.health = Math.min(target.maxHealth, target.health + amount);
      if (target.health !== old) {
        // Mark combat only if healing counts as combat pause (we will mark as combat to pause regen stacking)
        target.lastCombatAt = now;
        this._broadcastHealthUpdate(target);
      }
    } catch (e) {
      console.warn(`[GameRoom ${this.matchId}] handleHeal error:`, e?.message);
    }
  }

  /**
   * Evaluate whether one team has been fully eliminated and finish the game if so.
   */
  _checkVictoryCondition() {
    if (this.status !== "active") return; // only during active play
    const aliveByTeam = { team1: 0, team2: 0 };
    for (const p of this.players.values()) {
      if (p.isAlive) {
        if (p.team === "team1") aliveByTeam.team1++;
        else if (p.team === "team2") aliveByTeam.team2++;
      }
    }
    const t1Alive = aliveByTeam.team1;
    const t2Alive = aliveByTeam.team2;
    let winner = null;
    if (t1Alive === 0 && t2Alive === 0) {
      // Simultaneous elimination -> draw (null winner)
      winner = null;
    } else if (t1Alive === 0) {
      winner = "team2";
    } else if (t2Alive === 0) {
      winner = "team1";
    }
    if (winner !== null || (t1Alive === 0 && t2Alive === 0)) {
      this._finishGame(winner, { t1Alive, t2Alive });
    }
  }

  /**
   * Finish game, update DB, broadcast game over, and cleanup loop.
   * @param {string|null} winnerTeam null means draw
   */
  async _finishGame(winnerTeam, meta = {}) {
    if (this.status === "finished") return; // idempotent
    this.status = "finished";
    console.log(
      `[GameRoom ${this.matchId}] Game finished. Winner: ${
        winnerTeam || "draw"
      }`
    );
  // Stop loop
  this._loopRunning = false;
  if (this.gameLoop) { try { clearInterval(this.gameLoop); } catch(_) {} this.gameLoop = null; }
    // Persist match completion (best-effort)
    try {
      await this.db.runQuery(
        "UPDATE matches SET status = 'completed' WHERE match_id = ?",
        [this.matchId]
      );
    } catch (e) {
      console.warn(
        `[GameRoom ${this.matchId}] failed to update match status`,
        e?.message
      );
    }
    // Broadcast game over event to clients
    this.io.to(`game:${this.matchId}`).emit("game:over", {
      matchId: this.matchId,
      winnerTeam: winnerTeam, // may be null for draw
      meta,
    });
    // Optional: schedule room cleanup later (allow clients to show UI)
    setTimeout(() => {
      try {
        this.cleanup();
      } catch (_) {}
    }, 15000); // 15s grace
  }
}

module.exports = { GameRoom };
