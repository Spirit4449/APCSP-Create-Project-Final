import { sonner } from "./lib/sonner.js";
import socket from "./socket";

export function checkIfInParty() {
  const pathname = window.location.pathname;
  if (pathname.includes("party")) {
    return pathname.split("/").filter(Boolean).pop();
  }
  return false;
}

export function createParty() {
  fetch("/create-party", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `/party/${data.partyId}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function leaveParty() {
  fetch("/leave-party", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = `/`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Socket heartbeat
let hbTimer;
export function startHeartbeat(partyId) {
  clearInterval(hbTimer);
  if (!partyId) return;
  hbTimer = setInterval(() => socket.emit("heartbeat", partyId), 10000);
}
export function stopHeartbeat() {
  clearInterval(hbTimer);
}

// ---------------------------
// Socket
// ---------------------------

export function socketInit() {
  const currentPartyId = checkIfInParty();

  // Connection lifecycle
  socket.on("connect", () => {
    console.log("[socket] connected", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("[socket] disconnected", reason);
    stopHeartbeat();
  });

  // Proactively notify server before tab closes or navigates away
  let byeSent = false;
  function sendByeOnce() {
    if (byeSent) return;
    byeSent = true;
    try {
      socket.emit("client:bye");
    } catch {}
  }
  // beforeunload fires on close/refresh/navigation. Does not fire on switching tabs.
  window.addEventListener("beforeunload", sendByeOnce);
  // pagehide also indicates leaving the page (including bfcache), not just switching tabs
  window.addEventListener("pagehide", sendByeOnce, { once: true });

  // Server tells us which room we're in (party or lobby)
  socket.on("party:joined", ({ partyId }) => {
    console.log("[socket] joined room", partyId ?? "lobby");
    if (partyId) startHeartbeat(partyId);
    else stopHeartbeat();
  });

  // Live roster updates for the party
  socket.on("party:members", (data) => {
    try {
      console.log("[party] party:members", {
        partyId: data?.partyId,
        mode: data?.mode,
        membersCount: Array.isArray(data?.members) ? data.members.length : 0,
      });
      // If this update isn't for our current party page, ignore
      if (currentPartyId && String(data.partyId) !== String(currentPartyId))
        return;

      // Sync mode/map dropdowns if present
      const modeSel = document.getElementById("mode");
      if (modeSel && data.mode) modeSel.value = String(data.mode);
      const mapSel = document.getElementById("map");
      if (mapSel && data.map) mapSel.value = String(data.map);

      // Render minimal 1v1 view into the existing two slots if available
      renderPartyMembers(data);
      // Re-bind ready toggle on your slot after DOM updates
      initReadyToggle();
    } catch (e) {
      console.warn("[socket] party:members render failed", e);
    }
  });

  // Presence/status changes: update the matching slot if visible
  socket.on("status:update", (evt) => {
    if (currentPartyId && String(evt.partyId) !== String(currentPartyId))
      return;
    const slots = document.querySelectorAll(".character-slot");
    for (const slot of slots) {
      if (!slot) continue;
      const nameEl = slot.querySelector(".username");
      const statusEl = slot.querySelector(".status");
      if (!nameEl || !statusEl) continue;
      const text = nameEl.textContent || "";
      if (text === evt.name || text === `${evt.name} (You)`) {
        statusEl.textContent = evt.status || "Not Ready";
        statusEl.className = `status ${statusToClass(evt.status)}`;
      }
    }
  });

  // Mode change updates
  socket.on("mode-change", (data) => {
    if (currentPartyId && String(data.partyId) !== String(currentPartyId))
      return;

    const modeDropdown = document.getElementById("mode");
    if (modeDropdown) {
      modeDropdown.value = data.selectedValue || data.mode;
    }

    // Update platforms for new mode
    updatePlatformsForMode(data.selectedValue || data.mode);

    // Re-render members in new platform layout
    if (data.members) {
      renderPartyMembers({
        partyId: currentPartyId,
        members: data.members,
        mode: data.selectedValue || data.mode,
        map: data.map,
      });
    }
  });

  // Map change updates
  socket.on("map-change", (data) => {
    if (currentPartyId && String(data.partyId) !== String(currentPartyId))
      return;

    const mapDropdown = document.getElementById("map");
    if (mapDropdown) {
      mapDropdown.value = data.selectedValue || data.map;
    }

    // Update lobby background
    setLobbyBackground(data.selectedValue || data.map);
  });

  // Party-wide: everyone ready -> show matchmaking overlay
  socket.on("party:matchmaking:start", ({ partyId }) => {
    if (currentPartyId && String(partyId) !== String(currentPartyId)) return;
    showMatchmakingOverlay();
  });

  // When a match is found, update overlay and auto-ack ready for this client
  socket.on("match:found", (payload) => {
    // payload: { matchId, mode, map, yourTeam, players }
    const statusEl = document.getElementById("mm-status");
    if (statusEl) statusEl.textContent = "Match found. Waiting for players...";
    if (payload?.matchId) {
      socket.emit("ready:ack", { matchId: payload.matchId });
    }
  });

  // Queue error -> notify and hide overlay (useful for solo flow)
  socket.on("queue:error", (err) => {
    try {
      hideMatchmakingOverlay();
      if (err?.message) {
        sonner("Queue error", err.message, "error");
      }
    } catch (_) {}
  });

  // Match cancelled (e.g., ready timeout) -> hide overlay
  socket.on("match:cancelled", () => {
    hideMatchmakingOverlay();
  });

  // // Member join/leave events
  // socket.on("user-joined", (data) => {
  //   if (currentPartyId && String(data.partyId) !== String(currentPartyId)) {
  //     return;
  //   }

  //   console.log(`[party] ${data.name} joined the party`);

  //   // Fetch updated party data to refresh the view
  //   if (currentPartyId) {
  //     fetch("/partydata", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "same-origin",
  //       body: JSON.stringify({ partyId: currentPartyId }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((partyData) => {
  //         if (partyData?.members) {
  //           renderPartyMembers({
  //             partyId: currentPartyId,
  //             members: partyData.members,
  //             mode: partyData?.party?.mode,
  //             map: partyData?.party?.map,
  //           });
  //         }
  //       })
  //       .catch((err) =>
  //         console.warn("Failed to fetch party data after user join:", err)
  //       );
  //   }
  // });

  // socket.on("user-disconnected", (data) => {
  //   if (currentPartyId && String(data.partyId) !== String(currentPartyId))
  //     return;

  //   console.log(`[party] ${data.name} left the party`);

  //   // Find and reset the slot for the disconnected user
  //   const userSlots = document.querySelectorAll(".character-slot");
  //   for (const slot of userSlots) {
  //     const usernameElement = slot.querySelector(".username");
  //     if (
  //       usernameElement &&
  //       (usernameElement.textContent === data.name ||
  //         usernameElement.textContent === `${data.name} (You)`)
  //     ) {
  //       resetSlotToRandom(slot);
  //       break;
  //     }
  //   }
  // });
}

export function renderPartyMembers(data) {
  const members = Array.isArray(data.members) ? data.members : [];
  const currentUserName =
    document.getElementById("username-text")?.textContent || "";

  // Ensure platforms match the current mode
  if (data.mode) {
    updatePlatformsForMode(data.mode);
  }

  console.log("[party] renderPartyMembers()", {
    partyId: data?.partyId,
    mode: data?.mode,
    currentUserName,
    members: members.map((m) => ({
      name: m?.name,
      team: m?.team,
      status: m?.status,
      char_class: m?.char_class,
    })),
  });

  // Get all character slots
  const allSlots = document.querySelectorAll(".character-slot");
  console.log("[party] slots found:", allSlots.length);

  // Reset all slots to Random first
  allSlots.forEach((slot) => {
    resetSlotToRandom(slot);
  });

  // If we have members, place them in slots
  if (members.length > 0) {
    // Find the current user to determine their team
    const currentUser = members.find((m) => m.name === currentUserName);
    const currentUserTeam = currentUser ? currentUser.team : "team1";

    // Separate members by teams
    const team1Members = members.filter((m) => m.team === "team1");
    const team2Members = members.filter((m) => m.team === "team2");
    console.log("[party] team split", {
      yourTeam: currentUserTeam,
      team1: team1Members.map((m) => m.name),
      team2: team2Members.map((m) => m.name),
    });

    // Determine which team is "your team" and which is "opponent team"
    let yourTeamMembers, opponentTeamMembers;

    if (currentUserTeam === "team1") {
      yourTeamMembers = team1Members;
      opponentTeamMembers = team2Members;
    } else {
      yourTeamMembers = team2Members;
      opponentTeamMembers = team1Members;
    }

    // Place your team members
    yourTeamMembers.forEach((member, index) => {
      const slotId = `your-slot-${index + 1}`;
      applyMemberToSlot(member, slotId, true);
    });

    // Place opponent team members
    opponentTeamMembers.forEach((member, index) => {
      const slotId = `op-slot-${index + 1}`;
      applyMemberToSlot(member, slotId, false);
    });
  }
}

function applyMemberToSlot(member, slotId, isYourTeam = null) {
  const slot = document.getElementById(slotId);
  if (!slot) {
    console.warn("[party] applyMemberToSlot: slot not found", {
      slotId,
      member,
    });
    return;
  }
  // Helpful debug
  console.log("[party] applyMemberToSlot", {
    slotId,
    memberName: member?.name,
    isYourTeam,
  });
  if (!slot) return;

  const usernameEl = slot.querySelector(".username");
  const spriteEl = slot.querySelector(".character-sprite");
  const statusEl = slot.querySelector(".status");

  if (!member) {
    // Reset to Random state if empty
    resetSlotToRandom(slot);
    return;
  }

  // Fill with member info
  const currentUserName =
    document.getElementById("username-text")?.textContent || "";
  const isCurrentUser = member.name === currentUserName;
  const displayName = isCurrentUser ? `${member.name} (You)` : member.name;
  // Mark slot ownership for delegated handlers
  slot.dataset.isCurrentUser = isCurrentUser ? "true" : "false";

  if (usernameEl) {
    usernameEl.textContent = displayName;
    // Set username styling based on team
    if (isYourTeam) {
      usernameEl.className = "username";
    } else {
      usernameEl.className = "username op-player";
    }
  }

  if (spriteEl) {
    const cls = member.char_class || "ninja";
    spriteEl.src = `/assets/${cls}/body.png`;
    spriteEl.alt = cls;
    spriteEl.classList.remove("random");
    spriteEl.className = "character-sprite";
  }

  if (statusEl) {
    const st = member.status || "Not Ready";
    statusEl.textContent = st;
    statusEl.className = `status ${statusToClass(st)}`;
    // Remove any previous event listeners
    statusEl.style.pointerEvents = "";
    statusEl.style.cursor = "";
  }

  // Toggle switch-character visibility for current user only
  let switchEl = slot.querySelector(".switch-character");
  if (isCurrentUser) {
    if (!switchEl) {
      switchEl = document.createElement("div");
      switchEl.className = "switch-character";
      const img = document.createElement("img");
      img.src = "/assets/switch.svg";
      img.alt = "";
      img.height = 18;
      switchEl.appendChild(img);
      // Prefer it as first child
      slot.insertBefore(switchEl, slot.firstChild);
    }
    switchEl.style.display = "";
  } else if (switchEl) {
    switchEl.style.display = "none";
  }

  // Set slot style class for outline/visuals and border colors
  if (isYourTeam === null) {
    // Auto-detect based on current user
    isYourTeam = isCurrentUser;
  }

  slot.className = `character-slot ${
    isYourTeam ? "player-display" : "op-display"
  }`;
  slot.dataset.character = member.char_class || "ninja";

  // Set interaction properties
  slot.style.pointerEvents = "auto";
  // Only current user’s slot should look clickable
  slot.style.cursor = isCurrentUser ? "pointer" : "default";
}

function statusToClass(status) {
  const s = String(status || "").toLowerCase();
  if (s === "online") return "ready"; // online should render as green
  if (s.includes("ready") || s.includes("battle")) return "ready";
  return "not-ready";
}

// ---------------------------
// Mode & Platform Management
// ---------------------------

export function initializeModeDropdown() {
  const modeDropdown = document.getElementById("mode");
  const mapDropdown = document.getElementById("map");
  const partyId = checkIfInParty();

  if (!modeDropdown) return;

  let previousModeValue = modeDropdown.value;

  modeDropdown.addEventListener("change", async (event) => {
    const selectedValue = event.target.value;
    const username = document.getElementById("username-text")?.textContent;

    // If in a party, validate and emit socket events
    if (partyId) {
      try {
        // Fetch current party members to validate mode change
        const response = await fetch("/party-members", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ partyId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch party members");
        }

        const data = await response.json();
        const requiredSlots = Number(selectedValue) * 2;

        if (requiredSlots < data.membersCount) {
          // Too many players for this mode
          sonner(
            "Too many players for this mode!",
            "Please remove 1 or more players before changing to this mode",
            "error"
          );
          modeDropdown.value = previousModeValue;
          return;
        }

        // Update platforms locally first for immediate feedback
        updatePlatformsForMode(selectedValue);

        // Emit mode change to server
        socket.emit("mode-change", {
          selectedValue,
          username,
          partyId,
          members: data.members,
        });

        previousModeValue = selectedValue;
      } catch (error) {
        console.error("Error changing mode:", error);
        sonner(
          "Failed to change mode",
          "Please try again. If the problem persists, try refreshing the page.",
          "error"
        );
        modeDropdown.value = previousModeValue;
      }
    } else {
      // Not in a party - just update platforms locally
      updatePlatformsForMode(selectedValue);
      previousModeValue = selectedValue;
    }
  });

  // Map change handler
  if (mapDropdown) {
    mapDropdown.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      const username = document.getElementById("username-text")?.textContent;

      // Update lobby background immediately
      setLobbyBackground(selectedValue);

      // If in a party, emit to server
      if (partyId) {
        socket.emit("map-change", {
          selectedValue,
          username,
          partyId,
        });
      }
    });
  }
}

export function updatePlatformsForMode(mode) {
  const lobbyArea = document.getElementById("lobby-area");
  if (!lobbyArea) return;

  const targetCount = Number(mode) || 1;
  console.log("[party] updatePlatformsForMode", { mode, targetCount });

  // Update lobby area class
  lobbyArea.className = `mode-${targetCount}`;

  // Get existing platforms
  const yourPlatforms = document.querySelectorAll(
    '.platform[data-team="your-team"]'
  );
  const opPlatforms = document.querySelectorAll(
    '.platform[data-team="op-team"]'
  );
  console.log("[party] platform counts", {
    your: yourPlatforms.length,
    op: opPlatforms.length,
  });

  // Remove excess platforms
  if (yourPlatforms.length > targetCount) {
    for (let i = yourPlatforms.length - 1; i >= targetCount; i--) {
      console.log("[party] removing platform index", i + 1);
      yourPlatforms[i].remove();
      opPlatforms[i].remove();
    }
  }

  // Add missing platforms
  if (yourPlatforms.length < targetCount) {
    for (let i = yourPlatforms.length + 1; i <= targetCount; i++) {
      console.log("[party] creating platforms for slot", i);
      createPlatform("your-team", i);
      createPlatform("op-team", i);
    }
  }
}

function createPlatform(team, slotNumber) {
  const lobbyArea = document.getElementById("lobby-area");
  if (!lobbyArea) return;
  console.log("[party] createPlatform", { team, slotNumber });

  // Create platform container
  const platform = document.createElement("div");
  platform.className = `platform ${team}-${slotNumber}`;
  platform.setAttribute("data-team", team);
  platform.setAttribute("data-slot", slotNumber);

  // Create character slot
  const characterSlot = document.createElement("div");
  characterSlot.className = "character-slot empty";
  characterSlot.id = `${
    team === "your-team" ? "your" : "op"
  }-slot-${slotNumber}`;
  characterSlot.dataset.isCurrentUser = "false";

  // Add switch-character control (hidden by default), only on your-team side
  if (team === "your-team") {
    const switchDiv = document.createElement("div");
    switchDiv.className = "switch-character";
    switchDiv.style.display = "none";
    const img = document.createElement("img");
    img.src = "/assets/switch.svg";
    img.alt = "";
    img.height = 18;
    switchDiv.appendChild(img);
    characterSlot.appendChild(switchDiv);
  }

  // Create username element
  const username = document.createElement("div");
  username.className = team === "op-team" ? "username op-player" : "username";
  username.textContent = "Random";

  // Create character sprite
  const sprite = document.createElement("img");
  sprite.className = "character-sprite random";
  sprite.src = "/assets/random.png";
  sprite.alt = "Random";

  // Create status element with invite functionality
  const status = document.createElement("div");
  status.className = "status invite";
  status.textContent = "Invite";
  status.style.cursor = "pointer";
  status.style.pointerEvents = "auto";

  // Add invite click functionality
  status.addEventListener("click", (event) => {
    event.stopPropagation();
    if (status.classList.contains("invite")) {
      copyInviteToClipboard();
      status.textContent = "Copied!";
      setTimeout(() => {
        status.textContent = "Invite";
      }, 1000);
    }
  });

  // Assemble the structure
  characterSlot.appendChild(username);
  characterSlot.appendChild(sprite);
  characterSlot.appendChild(status);
  platform.appendChild(characterSlot);

  // Add platform image
  const platformImage = document.createElement("div");
  platformImage.className = "platform-image";
  platform.appendChild(platformImage);

  lobbyArea.appendChild(platform);
}

function copyInviteToClipboard() {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("Invite link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  }
}

function resetSlotToRandom(slot) {
  if (!slot) return;
  // Don't destroy stable IDs; just reset content
  const originalId = slot.id;
  console.log("[party] resetSlotToRandom", { id: originalId });
  const username = slot.querySelector(".username");
  const sprite = slot.querySelector(".character-sprite");
  const statusEl = slot.querySelector(".status");

  if (!username || !sprite || !statusEl) return;

  username.textContent = "Random";
  sprite.src = "/assets/random.png";
  sprite.alt = "Random";
  sprite.classList.add("random");
  statusEl.className = "status invite";
  statusEl.textContent = "Invite";
  statusEl.style.cursor = "pointer";
  statusEl.style.pointerEvents = "auto";
  slot.className = "character-slot empty";
  slot.dataset.character = "Random";
  slot.dataset.isCurrentUser = "false";
  // Hide switch-character if present
  const switchEl = slot.querySelector(".switch-character");
  if (switchEl) switchEl.style.display = "none";
  // Preserve slot.id so future updates can target this slot reliably

  // Re-add invite functionality
  const newStatusEl = statusEl.cloneNode(true);
  statusEl.parentNode.replaceChild(newStatusEl, statusEl);

  newStatusEl.addEventListener("click", (event) => {
    event.stopPropagation();
    if (newStatusEl.classList.contains("invite")) {
      copyInviteToClipboard();
      newStatusEl.textContent = "Copied!";
      setTimeout(() => {
        newStatusEl.textContent = "Invite";
      }, 1000);
    }
  });
}

// Import setLobbyBackground function
import { setLobbyBackground } from "./index.js";

// ---------------------------
// Ready toggle + overlay UI
// ---------------------------

// Attach a click handler to current user's status to toggle ready.
export function initReadyToggle() {
  const partyId = checkIfInParty();
  const readyBtn = document.getElementById("ready");
  if (!readyBtn) return;
  // Avoid duplicate bindings when UI re-renders
  if (readyBtn.dataset.bound === "1") return;
  readyBtn.dataset.bound = "1";

  readyBtn.addEventListener("click", () => {
    // Find current user's status element to update optimistically
    const selfSlot = Array.from(
      document.querySelectorAll(".character-slot")
    ).find((s) => s.dataset.isCurrentUser === "true");
    const statusEl = selfSlot?.querySelector(".status");
    if (!statusEl) return;

    const cur = (statusEl.textContent || "").toLowerCase();
    const nextReady = !cur.includes("ready");

    // Optimistic local update
    statusEl.textContent = nextReady ? "Ready" : "Online";
    statusEl.className = `status ${nextReady ? "ready" : "not-ready"}`;

    if (partyId) {
      // Party flow: server will show overlay when all ready
      socket.emit("ready:status", { partyId, ready: nextReady });
    } else {
      // Solo flow: directly join/leave the queue and control overlay locally
      if (nextReady) {
        const mode = Number(document.getElementById("mode")?.value) || 1;
        const map = Number(document.getElementById("map")?.value) || 1;
        const side = "team1"; // default; server may flip if needed
        socket.emit("queue:join", { mode, map, side });
        showMatchmakingOverlay();
      } else {
        socket.emit("queue:leave");
        hideMatchmakingOverlay();
      }
    }
  });
}

function ensureOverlay() {
  let ov = document.getElementById("matchmaking-overlay");
  if (ov) return ov;
  ov = document.createElement("div");
  ov.id = "matchmaking-overlay";
  ov.style.position = "fixed";
  ov.style.inset = "0";
  ov.style.background = "rgba(0,0,0,0.8)";
  ov.style.zIndex = "9999";
  ov.style.color = "#fff";
  ov.style.fontFamily = "'Poppins', sans-serif";
  ov.style.alignItems = "center";
  ov.style.justifyContent = "center";
  ov.style.textAlign = "center";
  ov.style.gap = "12px";
  ov.style.flexDirection = "column";
  ov.style.padding = "24px";
  ov.style.boxSizing = "border-box";

  const inner = document.createElement("div");
  inner.style.maxWidth = "640px";
  inner.style.margin = "0 auto";
  inner.innerHTML = `
    <h2 style="margin:0 0 8px 0;font-weight:700;">Matchmaking</h2>
    <div id="mm-status" style="opacity:.9">Waiting for opponent...</div>
  `;
  ov.appendChild(inner);
  ov.style.flex = "1";
  ov.style.display = "none"; // hidden initially

  document.body.appendChild(ov);
  return ov;
}

export function showMatchmakingOverlay() {
  const ov = ensureOverlay();
  ov.style.display = "flex";
  const statusEl = document.getElementById("mm-status");
  if (statusEl) statusEl.textContent = "Everyone ready. Searching...";
}

export function hideMatchmakingOverlay() {
  const ov = document.getElementById("matchmaking-overlay");
  if (ov) ov.style.display = "none";
}

// Lightweight debug hook to test rendering without server
if (typeof window !== "undefined") {
  window.__partyDebug = {
    testRender(mode = 2) {
      const current =
        document.getElementById("username-text")?.textContent || "You";
      const others = [
        { name: current, team: "team1", status: "Online", char_class: "ninja" },
        {
          name: "Ally",
          team: "team1",
          status: "Not Ready",
          char_class: "wizard",
        },
        {
          name: "Enemy1",
          team: "team2",
          status: "Ready",
          char_class: "draven",
        },
        {
          name: "Enemy2",
          team: "team2",
          status: "Online",
          char_class: "thorg",
        },
      ];
      renderPartyMembers({
        partyId: "debug",
        mode,
        members: others.slice(0, mode * 2),
      });
    },
    showMM() {
      showMatchmakingOverlay();
    },
  };
}
