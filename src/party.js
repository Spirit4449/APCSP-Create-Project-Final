// party.js

const socket = io("/");
function ptydbg(label, data = {}) {
  try {
    console.log(`[PARTY][${new Date().toISOString()}] ${label}`, data);
  } catch (e) {
    console.log(`[PARTY] ${label}`);
  }
}
ptydbg("party page load", { partyId: window.location.pathname });

// Document Variables
const character = document.getElementById("character");
const mode = document.getElementById("mode");
const map = document.getElementById("map");
const readyBtn = document.getElementById("ready");

let ready = false;

// Party id variable
const partyId = window.location.pathname.split("/").filter(Boolean).pop();
// Username variable
let username = getCookie("name");

if (username) {
  // Emits user-joined to other players
  socket.emit("user-joined", { name: username, partyId });
  ptydbg("emit user-joined", { username, partyId });
} else {
  // If the username does not exist, player is redirected to welcome screen
  window.location.href = "/welcome";
}

// Sets username text to the username
document.getElementById("username-text").textContent = username;

// Helper to set lobby background based on map value
function setLobbyBackground(mapValue) {
  const v = String(mapValue);
  if (v === "2") {
    // Mangrove Meadow
    document.body.style.backgroundImage = 'url("/assets/bg3.jpg")';
  } else {
    // Default map
    document.body.style.backgroundImage = 'url("/assets/bg2.jpg")';
  }
}

// Initialize the lobby with initial platform setup
checkModeValue();

// Set initial background based on current select value
setLobbyBackground(map.value);

// Set up drag and drop for initial slots
document.querySelectorAll(".character-slot").forEach((slot) => {
  const platform = slot.parentElement;
  const team = platform.getAttribute("data-team");
  setupDragAndDrop(slot, team);
});

const party = document.getElementById("party");

// Popup to copy id to clipboard
let popup;
// Mouse hover
party.addEventListener("mouseover", (event) => {
  popup = document.createElement("div"); // Creates popup
  popup.className = "party-popup";

  popup.textContent = `${window.location.href}`; // Sets text to the url of the window

  const partyCenterX = party.offsetLeft + party.offsetWidth / 2 - 150;
  const partyY = party.offsetTop;

  popup.style.left = partyCenterX + "px";
  popup.style.top = partyY + 55 + "px"; // Lower position

  document.body.appendChild(popup);
});

party.addEventListener("mouseout", (event) => {
  if (popup) {
    popup.remove();
  }
});

party.addEventListener("click", (event) => {
  if (popup) {
    copyInvite(popup);
    setTimeout(() => {
      // Removes clicked text after 2 seconds
      if (popup) {
        popup.textContent = window.location.href;
        popup.style.backgroundColor = "#2F2F2F";
      }
    }, 2000);
  }
});

function copyInvite(popup) {
  if (navigator.clipboard && popup) {
    navigator.clipboard
      .writeText(window.location.href) // Writes window URL to clipboard
      .then(() => {
        popup.textContent = "Copied!";
        popup.style.backgroundColor = "green";
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  }
}

function copyInviteSimple() {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(window.location.href) // Writes window URL to clipboard
      .then(() => {
        console.log("Invite link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  }
}

// Takes user to different party if they leave
const leave = document.getElementById("leave");
leave.addEventListener("click", (event) => {
  window.location.href = "/";
});

const signOut = document.getElementById("sign-out");
signOut.addEventListener("click", (event) => {
  // Sets cookie expiration to the past to delete it
  document.cookie =
    "name" + "=; expires=Mon, 05 May 2019 00:00:00 UTC; path=/;";
  window.location.href = "/welcome"; // Redirects user to welcome screen
});

const yourTeam = document.getElementById("lobby-area");
const opTeam = document.getElementById("lobby-area");

function checkModeValue() {
  const lobbyArea = document.getElementById("lobby-area");

  // Get all existing platforms
  const yourPlatforms = document.querySelectorAll(
    '.platform[data-team="your-team"]'
  );
  const opPlatforms = document.querySelectorAll(
    '.platform[data-team="op-team"]'
  );

  let targetCount;
  switch (mode.value) {
    case "1":
      targetCount = 1;
      lobbyArea.className = "mode-1";
      break;
    case "2":
      targetCount = 2;
      lobbyArea.className = "mode-2";
      break;
    case "3":
      targetCount = 3;
      lobbyArea.className = "mode-3";
      break;
    default:
      targetCount = 1;
      lobbyArea.className = "mode-1";
  }

  // Remove extra platforms if needed
  if (yourPlatforms.length > targetCount) {
    for (let i = yourPlatforms.length - 1; i >= targetCount; i--) {
      yourPlatforms[i].remove();
      opPlatforms[i].remove();
    }
  }

  // Add platforms if needed
  if (yourPlatforms.length < targetCount) {
    for (let i = yourPlatforms.length + 1; i <= targetCount; i++) {
      createPlatform("your-team", i);
      createPlatform("op-team", i);
    }
  }
}

function createPlatform(team, slotNumber) {
  const lobbyArea = document.getElementById("lobby-area");

  // Create platform
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

  // Create username element
  const username = document.createElement("div");
  username.className = team === "op-team" ? "username op-player" : "username";
  username.textContent = "Random";

  // Create character sprite
  const sprite = document.createElement("img");
  sprite.className = "character-sprite random";
  sprite.src = "/assets/random.png";
  sprite.alt = "Random";

  // Create status element
  const status = document.createElement("div");
  status.className = "status invite";
  status.textContent = "Invite";
  status.style.cursor = "pointer";

  // Add invite click functionality
  status.addEventListener("click", (event) => {
    if (status.classList.contains("invite")) {
      copyInviteSimple();
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
  // Add platform image under the character slot so it stacks vertically
  const platformImage = document.createElement("div");
  platformImage.className = "platform-image";
  platform.appendChild(platformImage);

  // Add drag and drop functionality
  setupDragAndDrop(characterSlot, team);

  lobbyArea.appendChild(platform);
}

function setupDragAndDrop(characterSlot, team) {
  // Make draggable
  characterSlot.draggable = true;

  characterSlot.addEventListener("dragstart", (event) => {
    const username = characterSlot.querySelector(".username").textContent;
    const character = "Ninja"; // Default for now
    const status = characterSlot.querySelector(".status").textContent;

    if (username !== "Random") {
      event.dataTransfer.setData(
        "text/plain",
        `${username.replace(" (You)", "")},${character},${status}`
      );
      characterSlot.classList.add("dragging");

      // Create a custom drag image that's smaller
      const dragImage = characterSlot.cloneNode(true);
      dragImage.style.transform = "scale(0.8)";
      dragImage.style.opacity = "0.8";
      document.body.appendChild(dragImage);
      event.dataTransfer.setDragImage(dragImage, 30, 30);
      setTimeout(() => document.body.removeChild(dragImage), 0);
    } else {
      event.preventDefault();
    }
  });

  characterSlot.addEventListener("dragend", () => {
    characterSlot.classList.remove("dragging");
  });

  // Drop zone functionality
  characterSlot.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });

  characterSlot.addEventListener("dragover", (event) => {
    event.preventDefault();
    characterSlot.parentElement.classList.add("drag-over");
  });

  characterSlot.addEventListener("dragleave", (event) => {
    event.preventDefault();
    // Only remove if we're actually leaving the element
    if (!characterSlot.contains(event.relatedTarget)) {
      characterSlot.parentElement.classList.remove("drag-over");
    }
  });

  characterSlot.addEventListener("drop", (event) => {
    event.preventDefault();
    characterSlot.parentElement.classList.remove("drag-over");

    const data = event.dataTransfer.getData("text/plain");
    if (!data) return;

    const [name, character, ready] = data.split(",");

    // Find the source slot
    const sourceSlot =
      document.getElementById(name) ||
      Array.from(document.querySelectorAll(".character-slot")).find((slot) =>
        slot.querySelector(".username").textContent.includes(name)
      );

    if (sourceSlot && sourceSlot !== characterSlot) {
      // Swap content
      swapCharacterSlots(sourceSlot, characterSlot, name, character, ready);

      // Emit team update
      const platform = characterSlot.parentElement;
      const teamName = platform.getAttribute("data-team");
      socket.emit("team-update", {
        tempName: name,
        partyId,
        team: teamName,
      });

      // Emit drop event
      const allSlots = document.querySelectorAll(".character-slot");
      let slotIndex = Array.from(allSlots).indexOf(characterSlot) + 1;
      socket.emit("drop", {
        name,
        character,
        ready,
        count: slotIndex,
      });
    }
  });
}

function swapCharacterSlots(
  sourceSlot,
  targetSlot,
  draggedName,
  draggedCharacter,
  draggedReady
) {
  // Get current target slot content
  const targetUsername = targetSlot.querySelector(".username").textContent;
  const targetSprite = targetSlot.querySelector(".character-sprite").src;
  const targetStatus = targetSlot.querySelector(".status").textContent;

  // Update target slot with dragged content
  updateCharacterSlot(
    targetSlot,
    `${draggedName} (You)`,
    draggedCharacter,
    draggedReady
  );

  // Update source slot with target content (or make it random if target was random)
  if (targetUsername === "Random") {
    updateCharacterSlot(sourceSlot, "Random", "Random", "Invite", true);
  } else {
    updateCharacterSlot(sourceSlot, targetUsername, "Ninja", targetStatus);
  }
}

function updateCharacterSlot(slot, name, character, status, isRandom = false) {
  const username = slot.querySelector(".username");
  const sprite = slot.querySelector(".character-sprite");
  const statusEl = slot.querySelector(".status");

  username.textContent = name;
  slot.id = name === "Random" ? "" : name.replace(" (You)", "");

  if (isRandom || name === "Random") {
    sprite.src = "/assets/random.png";
    sprite.className = "character-sprite random";
    statusEl.className = "status invite";
    statusEl.textContent = "Invite";
    statusEl.style.cursor = "pointer";
    slot.className = "character-slot empty";
  } else {
    if (character === "Ninja") {
      sprite.src = "/assets/ninjaIcon.png";
    }
    sprite.className = "character-sprite";

    // Update status styling
    const display = status || "Not Ready";
    statusEl.textContent = display;
    if (display === "Ready") {
      statusEl.className = "status ready";
    } else if (display === "Not Ready" || display === "Not ready") {
      statusEl.className = "status not-ready";
    } else if (display === "In Battle") {
      statusEl.className = "status ready"; // green to indicate active
    } else if (display === "End Screen (Game Over)") {
      statusEl.className = "status not-ready";
    }

    // Update slot styling based on team
    const platform = slot.parentElement;
    if (platform.getAttribute("data-team") === "your-team") {
      slot.className = "character-slot player-display";
    } else {
      slot.className = "character-slot op-display";
    }
  }
}

function updatePeople(name, character, ready) {
  const allCharacterSlots = document.querySelectorAll(".character-slot");
  let conditionMet = false;
  let tempName = name;
  if (name.includes(" (You)")) {
    tempName = name.replace(" (You)", "").trim();
  }

  for (let i = 0; i < allCharacterSlots.length; i++) {
    const slot = allCharacterSlots[i];
    const platform = slot.parentElement;
    const teamName = platform.getAttribute("data-team");

    if (slot.classList.contains("player-display") || teamName === "your-team") {
      socket.emit("team-update", { tempName, partyId, team: "your-team" });
    } else {
      socket.emit("team-update", { tempName, partyId, team: "op-team" });
    }

    const usernameElement = slot.querySelector(".username");
    if (usernameElement && usernameElement.textContent === "Random") {
      updateCharacterSlot(slot, name, character, ready);

      // Set up drag functionality
      slot.id = tempName;
      slot.draggable = true;
      slot.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData(
          "text/plain",
          `${tempName},${character},${ready}`
        );
      });

      conditionMet = true;
      break;
    }
  }
}

character.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  socket.emit("character-change", { selectedValue, username, partyId }); // Emits character change
  ptydbg("emit character-change", { selectedValue });
});

let previousModeValue = mode.value;
mode.addEventListener("click", (event) => {
  const selectedValue = event.target.value;
  ptydbg("mode click", { selectedValue });
  fetch("/party-members", {
    // Fetches party members on mode change
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ partyId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (Number(selectedValue) * 2 < data.membersCount) {
        // Checks if the number of players are too many for the mode
        // Create error message
        const error = document.createElement("p");
        error.style.position = "absolute";
        error.style.top = "80%";
        error.style.left = "50%";
        error.style.transform = "translate(-50%, -50%)";
        error.style.color = "#ff5252";
        error.style.padding = "5px 10px";
        error.style.backgroundColor = "black";
        error.style.borderRadius = "6px";
        error.style.border = "2px solid white";
        error.textContent =
          "Too many players for this mode! Please remove 1 or more players";

        error.addEventListener("click", (event) => {
          error.remove();
        });

        setTimeout(() => {
          if (error) {
            error.remove();
          }
        }, 2000); // Automatically removes error message after 2 seconds
        document.body.appendChild(error);

        mode.value = previousModeValue; // Sets mode value to previous mode value
      } else {
        socket.emit("mode-change", {
          // If players are few enough, emit change to others
          selectedValue,
          username,
          partyId,
          members: data.members,
        });
        ptydbg("emit mode-change", { selectedValue });
        previousModeValue = mode.value; // Sets previous mode value to current value
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      ptydbg("mode change error", { error: error.message });
    });
});

map.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  socket.emit("map-change", { selectedValue, username, partyId }); // Emits map change
  ptydbg("emit map-change", { selectedValue });
  // Update lobby background on local change
  setLobbyBackground(selectedValue);
});

readyBtn.addEventListener("click", (event) => {
  if (ready === false) {
    ready = true;
    readyBtn.style.backgroundColor = "green";
    readyBtn.value = "Cancel";
  } else if (ready === true) {
    ready = false;
    readyBtn.style.backgroundColor = "";
    readyBtn.value = "Ready";
  }
  socket.emit("ready", { username, ready, partyId, mode: mode.value }); // Emits ready event
  ptydbg("emit ready", { username, ready, partyId, mode: mode.value });
});

socket.on("connection", (data) => {
  ptydbg("recv connection", { members: data.partyMembers.length - 1 });
  // Player connection only
  data.partyMembers.forEach((member) => {
    // Grabs existing players from the party
    if (member.mode && member.map) {
      mode.value = member.mode;
      map.value = member.map;
    } else {
      let tempName = member.name; // Tempname includes (You)
      let character = member.character;
      if (member.name === username) {
        tempName += " (You)";
      }
      // Prefer status field if present; fallback to ready flag
      let readyText = member.status
        ? member.status
        : member.ready === true
        ? "Ready"
        : "Not ready";
      checkModeValue(); // Checks the value of the mode and sets up the td's
      updatePeople(tempName, character, readyText); // Updates the players
    }
  });
});

socket.on("user-joined", (data) => {
  if (partyId === data.partyId) {
    updatePeople(data.name, "Ninja", "Not Ready");
    ptydbg("recv user-joined", data);
  }
});

// Bulk status updates from server (e.g., In Battle or End Screen)
socket.on("status-bulk", (data) => {
  if (data && data.partyId === partyId && Array.isArray(data.statuses)) {
    data.statuses.forEach(({ name, status }) => {
      const slot = document.getElementById(name);
      if (slot) {
        const statusEl = slot.querySelector(".status");
        if (statusEl) {
          statusEl.textContent = status;
          if (status === "Ready") {
            statusEl.className = "status ready";
          } else if (status === "Not Ready" || status === "Not ready") {
            statusEl.className = "status not-ready";
          } else if (status === "In Battle") {
            statusEl.className = "status ready";
          } else if (status === "End Screen (Game Over)") {
            statusEl.className = "status not-ready";
          }
        }
      }
    });
  }
});

// On character change
socket.on("character-change", (data) => {
  if (partyId === data.partyId) {
    ptydbg("recv character-change", data);
    // Check if party is the same
    const user = document.getElementById(data.username);
    if (user) {
      const img = user.querySelector(".character-sprite");
      if (data.character === "Ninja") {
        img.src = "/assets/ninjaIcon.png";
        img.className = "character-sprite";
      }
    }
  }
});

// On mode change
socket.on("mode-change", (data) => {
  if (partyId === data.partyId) {
    ptydbg("recv mode-change", { mode: data.mode });
    // Check if party is the same
    mode.value = data.mode;
    checkModeValue(); // Checks mode value and sets up td's

    const members = data.members; // Grabs member data from server
    for (const userKey in members) {
      if (members[userKey]["name"]) {
        const user = members[userKey];
        if (!document.getElementById(user["name"])) {
          let name = user["name"];
          if (name === username) {
            name = `${user["name"]} (You)`;
          }
          let readyText;
          if (user["ready"] === true) {
            readyText = "Ready";
          } else if (user["ready"] === false) {
            readyText = "Not Ready";
          }
          updatePeople(name, user["character"], readyText); // Updates td's with member data
        }
      }
    }
  }
});

// On map change
socket.on("map-change", (data) => {
  if (partyId === data.partyId) {
    map.value = data.map;
    ptydbg("recv map-change", { map: data.map });
    // Sync background on remote updates as well
    setLobbyBackground(data.map);
  }
});

// On drop
socket.on("drop", (data) => {
  ptydbg("recv drop", data);
  const allSlots = document.querySelectorAll(".character-slot");
  let count = 0;
  allSlots.forEach((slot) => {
    // Finds index of slot
    count++;
    if (count === data.count) {
      // If the index matches
      // Gets the information from the new slot
      const usernameElement = slot.querySelector(".username");
      const imgElement = slot.querySelector(".character-sprite");
      const statusElement = slot.querySelector(".status");

      const previousSlot = document.getElementById(data.name); // Finds previous slot from id
      if (previousSlot) {
        // Gets information from old slot
        const username = previousSlot.querySelector(".username");
        const img = previousSlot.querySelector(".character-sprite");
        const status = previousSlot.querySelector(".status");

        // If new slot is not a random, it sets the information of the old slot to the information of the new slot
        if (usernameElement.textContent !== "Random") {
          username.textContent = usernameElement.textContent;
          img.src = imgElement.src;
          img.className = imgElement.className;
          status.textContent = statusElement.textContent;
          status.className = statusElement.className;
          previousSlot.id = usernameElement.textContent.replace(" (You)", "");
        } else {
          // If the new slot is a random, sets old slot to a random
          updateCharacterSlot(previousSlot, "Random", "Random", "Invite", true);
        }

        // Sets the information of the new slot
        updateCharacterSlot(slot, data.name, data.character, data.ready);
        slot.id = data.name;
      }
    }
  });
});

// On ready
socket.on("ready", (data) => {
  if (partyId === data.party) {
    ptydbg("recv ready", data);
    const playerSlot = document.getElementById(data.name);
    if (playerSlot) {
      const status = playerSlot.querySelector(".status");
      if (data.ready === true) {
        status.textContent = "Ready";
        status.className = "status ready";
      } else if (data.ready === false) {
        status.textContent = "Not Ready";
        status.className = "status not-ready";
      }
    }
  }
});

// If td is not found, redirects to another party
socket.on("room-deleted", () => {
  window.location = "/";
});

// On matchmaking
socket.on("matchmaking", (data) => {
  if (partyId === data.partyId) {
    ptydbg("recv matchmaking", data);
    sessionStorage.setItem("matchmakingMembers", data.members); // Sets session storage of members so that the matchmaking screen can display it
    sessionStorage.setItem("membersToFind", data.membersToFind);
    window.location.href = `/matchmaking/${data.partyId}`; // Redirects to matchmaking for party
  }
});

// On game start
socket.on("game-started", (data) => {
  if (partyId === data.partyId) {
    ptydbg("recv game-started", {
      gameId: data.gameId,
      partyMembers: data.partyMembers,
      map: data.map,
    });
    for (const team in data.gameData) {
      // For each team in the game
      for (const playerKey in data.gameData[team]) {
        // For each player in the team
        const player = data.gameData[team][playerKey];
        if (player["name"] === getCookie("name")) {
          // Set session storage data
          sessionStorage.setItem("character", player["character"]);
          sessionStorage.setItem("spawnPlatform", player["spawnPlatform"]);
          sessionStorage.setItem("spawn", player["spawn"]);
          sessionStorage.setItem("party", data.partyId);
          sessionStorage.setItem("partyMembers", data.partyMembers);
          sessionStorage.setItem("map", data.map);
        }
      }
    }
    window.location = `/game/${data.gameId}`;
    ptydbg("navigate game", { gameId: data.gameId });
  }
});

// On user disconnect
socket.on("user-disconnected", (data) => {
  if (data.partyId === partyId) {
    ptydbg("recv user-disconnected", data);
    const userSlots = document.querySelectorAll(".character-slot"); // Find all slots
    let userSlot;

    userSlots.forEach((slot) => {
      // For each slot
      const usernameElement = slot.querySelector(".username");
      // If the name of the slot matches the name of the user who disconnected it sets it to a random
      if (usernameElement.textContent === data.name) {
        userSlot = slot; // Sets the variable userSlot to the actual slot
        return;
      }
    });

    // If a slot exists, reset it back to random
    if (userSlot) {
      updateCharacterSlot(userSlot, "Random", "Random", "Invite", true);

      const ready = userSlot.querySelector(".status");
      ready.addEventListener("click", (event) => {
        if (ready.classList.contains("invite")) {
          copyInviteSimple();
          ready.textContent = "Copied!";
          setTimeout(() => {
            ready.textContent = "Invite";
          }, 1000);
        }
      });

      userSlot.id = "";
    } else {
      console.error("Could not remove user");
    }
  }
});

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const array = decodedCookie.split(";");
  for (let i = 0; i < array.length; i++) {
    let cookie = array[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}
