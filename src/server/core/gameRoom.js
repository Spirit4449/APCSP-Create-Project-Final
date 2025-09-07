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

    // Game loop
    this.gameLoop = null;
    this.tickRate = 60; // 60 FPS server tick rate
    this.broadcastRate = 20; // 20 Hz snapshot broadcast rate for lower latency
    this.lastBroadcast = 0;

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
      const playerData = {
        socketId: socket.id,
        user_id: user.user_id,
        name: user.name,
        team: matchPlayer.team,
        char_class: matchPlayer.char_class,

        // Game state
        x: 400, // Will be set by spawn logic
        y: 400,
        health: 100,
        isAlive: true,
        lastInput: Date.now(),

        // Input buffer for server authority
        inputBuffer: [],
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
    console.log(`[GameRoom ${this.matchId}] Game loop started`);

    const tickInterval = 1000 / this.tickRate;
    const broadcastInterval = 1000 / this.broadcastRate;

    this.gameLoop = setInterval(() => {
      const now = Date.now();

      // Process game tick (physics, collisions, etc.)
      this.processTick();

      // Broadcast state snapshots to clients
      if (now - this.lastBroadcast >= broadcastInterval) {
        this.broadcastSnapshot();
        this.lastBroadcast = now;
      }
    }, tickInterval);
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

    // Process action (implement specific action handling later)
    // For now, just broadcast to other players
    this.io.to(`game:${this.matchId}`).emit("game:action", {
      playerId: playerData.user_id,
      playerName: playerData.name,
      action: actionData,
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
  broadcastSnapshot() {
    const snapshot = {
      timestamp: Date.now(),
      players: {},
    };

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
    this.io
      .to(`game:${this.matchId}`)
      .compress(false)
      .emit("game:snapshot", snapshot);
  }

  /**
   * Clean up room resources
   */
  cleanup() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
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
}

module.exports = { GameRoom };
