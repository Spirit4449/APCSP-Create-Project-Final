/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/party.js ***!
  \**********************/
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// party.js

var socket = io("/");
function ptydbg(label) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    console.log("[PARTY][".concat(new Date().toISOString(), "] ").concat(label), data);
  } catch (e) {
    console.log("[PARTY] ".concat(label));
  }
}
ptydbg("party page load", {
  partyId: window.location.pathname
});

// Document Variables
var character = document.getElementById("character");
var mode = document.getElementById("mode");
var map = document.getElementById("map");
var readyBtn = document.getElementById("ready");
var ready = false;

// Party id variable
var partyId = window.location.pathname.split("/").filter(Boolean).pop();
// Username variable
var username = getCookie("name");
if (username) {
  // Emits user-joined to other players
  socket.emit("user-joined", {
    name: username,
    partyId: partyId
  });
  ptydbg("emit user-joined", {
    username: username,
    partyId: partyId
  });
} else {
  // If the username does not exist, player is redirected to welcome screen
  window.location.href = "/welcome";
}

// Sets username text to the username
document.getElementById("username-text").textContent = username;

// Helper to set lobby background based on map value
function setLobbyBackground(mapValue) {
  var v = String(mapValue);
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
document.querySelectorAll(".character-slot").forEach(function (slot) {
  var platform = slot.parentElement;
  var team = platform.getAttribute("data-team");
  setupDragAndDrop(slot, team);
});
var party = document.getElementById("party");

// Popup to copy id to clipboard
var popup;
// Mouse hover
party.addEventListener("mouseover", function (event) {
  popup = document.createElement("div"); // Creates popup
  popup.className = "party-popup";
  popup.textContent = "".concat(window.location.href); // Sets text to the url of the window

  var partyCenterX = party.offsetLeft + party.offsetWidth / 2 - 150;
  var partyY = party.offsetTop;
  popup.style.left = partyCenterX + "px";
  popup.style.top = partyY + 55 + "px"; // Lower position

  document.body.appendChild(popup);
});
party.addEventListener("mouseout", function (event) {
  if (popup) {
    popup.remove();
  }
});
party.addEventListener("click", function (event) {
  if (popup) {
    copyInvite(popup);
    setTimeout(function () {
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
    navigator.clipboard.writeText(window.location.href) // Writes window URL to clipboard
    .then(function () {
      popup.textContent = "Copied!";
      popup.style.backgroundColor = "green";
    })["catch"](function (error) {
      console.error("Failed to copy text: ", error);
    });
  }
}
function copyInviteSimple() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href) // Writes window URL to clipboard
    .then(function () {
      console.log("Invite link copied to clipboard");
    })["catch"](function (error) {
      console.error("Failed to copy text: ", error);
    });
  }
}

// Takes user to different party if they leave
var leave = document.getElementById("leave");
leave.addEventListener("click", function (event) {
  window.location.href = "/";
});
var signOut = document.getElementById("sign-out");
signOut.addEventListener("click", function (event) {
  // Sets cookie expiration to the past to delete it
  document.cookie = "name" + "=; expires=Mon, 05 May 2019 00:00:00 UTC; path=/;";
  window.location.href = "/welcome"; // Redirects user to welcome screen
});
var yourTeam = document.getElementById("lobby-area");
var opTeam = document.getElementById("lobby-area");
function checkModeValue() {
  var lobbyArea = document.getElementById("lobby-area");

  // Get all existing platforms
  var yourPlatforms = document.querySelectorAll('.platform[data-team="your-team"]');
  var opPlatforms = document.querySelectorAll('.platform[data-team="op-team"]');
  var targetCount;
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
    for (var i = yourPlatforms.length - 1; i >= targetCount; i--) {
      yourPlatforms[i].remove();
      opPlatforms[i].remove();
    }
  }

  // Add platforms if needed
  if (yourPlatforms.length < targetCount) {
    for (var _i = yourPlatforms.length + 1; _i <= targetCount; _i++) {
      createPlatform("your-team", _i);
      createPlatform("op-team", _i);
    }
  }
}
function createPlatform(team, slotNumber) {
  var lobbyArea = document.getElementById("lobby-area");

  // Create platform
  var platform = document.createElement("div");
  platform.className = "platform ".concat(team, "-").concat(slotNumber);
  platform.setAttribute("data-team", team);
  platform.setAttribute("data-slot", slotNumber);

  // Create character slot
  var characterSlot = document.createElement("div");
  characterSlot.className = "character-slot empty";
  characterSlot.id = "".concat(team === "your-team" ? "your" : "op", "-slot-").concat(slotNumber);

  // Create username element
  var username = document.createElement("div");
  username.className = team === "op-team" ? "username op-player" : "username";
  username.textContent = "Random";

  // Create character sprite
  var sprite = document.createElement("img");
  sprite.className = "character-sprite random";
  sprite.src = "/assets/random.png";
  sprite.alt = "Random";

  // Create status element
  var status = document.createElement("div");
  status.className = "status invite";
  status.textContent = "Invite";
  status.style.cursor = "pointer";

  // Add invite click functionality
  status.addEventListener("click", function (event) {
    if (status.classList.contains("invite")) {
      copyInviteSimple();
      status.textContent = "Copied!";
      setTimeout(function () {
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
  var platformImage = document.createElement("div");
  platformImage.className = "platform-image";
  platform.appendChild(platformImage);

  // Add drag and drop functionality
  setupDragAndDrop(characterSlot, team);
  lobbyArea.appendChild(platform);
}
function setupDragAndDrop(characterSlot, team) {
  // Make draggable
  characterSlot.draggable = true;
  characterSlot.addEventListener("dragstart", function (event) {
    var username = characterSlot.querySelector(".username").textContent;
    var character = "Ninja"; // Default for now
    var status = characterSlot.querySelector(".status").textContent;
    if (username !== "Random") {
      event.dataTransfer.setData("text/plain", "".concat(username.replace(" (You)", ""), ",").concat(character, ",").concat(status));
      characterSlot.classList.add("dragging");

      // Create a custom drag image that's smaller
      var dragImage = characterSlot.cloneNode(true);
      dragImage.style.transform = "scale(0.8)";
      dragImage.style.opacity = "0.8";
      document.body.appendChild(dragImage);
      event.dataTransfer.setDragImage(dragImage, 30, 30);
      setTimeout(function () {
        return document.body.removeChild(dragImage);
      }, 0);
    } else {
      event.preventDefault();
    }
  });
  characterSlot.addEventListener("dragend", function () {
    characterSlot.classList.remove("dragging");
  });

  // Drop zone functionality
  characterSlot.addEventListener("dragenter", function (event) {
    event.preventDefault();
  });
  characterSlot.addEventListener("dragover", function (event) {
    event.preventDefault();
    characterSlot.parentElement.classList.add("drag-over");
  });
  characterSlot.addEventListener("dragleave", function (event) {
    event.preventDefault();
    // Only remove if we're actually leaving the element
    if (!characterSlot.contains(event.relatedTarget)) {
      characterSlot.parentElement.classList.remove("drag-over");
    }
  });
  characterSlot.addEventListener("drop", function (event) {
    event.preventDefault();
    characterSlot.parentElement.classList.remove("drag-over");
    var data = event.dataTransfer.getData("text/plain");
    if (!data) return;
    var _data$split = data.split(","),
      _data$split2 = _slicedToArray(_data$split, 3),
      name = _data$split2[0],
      character = _data$split2[1],
      ready = _data$split2[2];

    // Find the source slot
    var sourceSlot = document.getElementById(name) || Array.from(document.querySelectorAll(".character-slot")).find(function (slot) {
      return slot.querySelector(".username").textContent.includes(name);
    });
    if (sourceSlot && sourceSlot !== characterSlot) {
      // Swap content
      swapCharacterSlots(sourceSlot, characterSlot, name, character, ready);

      // Emit team update
      var platform = characterSlot.parentElement;
      var teamName = platform.getAttribute("data-team");
      socket.emit("team-update", {
        tempName: name,
        partyId: partyId,
        team: teamName
      });

      // Emit drop event
      var allSlots = document.querySelectorAll(".character-slot");
      var slotIndex = Array.from(allSlots).indexOf(characterSlot) + 1;
      socket.emit("drop", {
        name: name,
        character: character,
        ready: ready,
        count: slotIndex
      });
    }
  });
}
function swapCharacterSlots(sourceSlot, targetSlot, draggedName, draggedCharacter, draggedReady) {
  // Get current target slot content
  var targetUsername = targetSlot.querySelector(".username").textContent;
  var targetSprite = targetSlot.querySelector(".character-sprite").src;
  var targetStatus = targetSlot.querySelector(".status").textContent;

  // Update target slot with dragged content
  updateCharacterSlot(targetSlot, "".concat(draggedName, " (You)"), draggedCharacter, draggedReady);

  // Update source slot with target content (or make it random if target was random)
  if (targetUsername === "Random") {
    updateCharacterSlot(sourceSlot, "Random", "Random", "Invite", true);
  } else {
    updateCharacterSlot(sourceSlot, targetUsername, "Ninja", targetStatus);
  }
}
function updateCharacterSlot(slot, name, character, status) {
  var isRandom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var username = slot.querySelector(".username");
  var sprite = slot.querySelector(".character-sprite");
  var statusEl = slot.querySelector(".status");
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
    statusEl.textContent = status;
    if (status === "Ready") {
      statusEl.className = "status ready";
    } else if (status === "Not Ready" || status === "Not ready") {
      statusEl.className = "status not-ready";
    }

    // Update slot styling based on team
    var platform = slot.parentElement;
    if (platform.getAttribute("data-team") === "your-team") {
      slot.className = "character-slot player-display";
    } else {
      slot.className = "character-slot op-display";
    }
  }
}
function updatePeople(name, character, ready) {
  var allCharacterSlots = document.querySelectorAll(".character-slot");
  var conditionMet = false;
  var tempName = name;
  if (name.includes(" (You)")) {
    tempName = name.replace(" (You)", "").trim();
  }
  for (var i = 0; i < allCharacterSlots.length; i++) {
    var slot = allCharacterSlots[i];
    var platform = slot.parentElement;
    var teamName = platform.getAttribute("data-team");
    if (slot.classList.contains("player-display") || teamName === "your-team") {
      socket.emit("team-update", {
        tempName: tempName,
        partyId: partyId,
        team: "your-team"
      });
    } else {
      socket.emit("team-update", {
        tempName: tempName,
        partyId: partyId,
        team: "op-team"
      });
    }
    var usernameElement = slot.querySelector(".username");
    if (usernameElement && usernameElement.textContent === "Random") {
      updateCharacterSlot(slot, name, character, ready);

      // Set up drag functionality
      slot.id = tempName;
      slot.draggable = true;
      slot.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", "".concat(tempName, ",").concat(character, ",").concat(ready));
      });
      conditionMet = true;
      break;
    }
  }
}
character.addEventListener("change", function (event) {
  var selectedValue = event.target.value;
  socket.emit("character-change", {
    selectedValue: selectedValue,
    username: username,
    partyId: partyId
  }); // Emits character change
  ptydbg("emit character-change", {
    selectedValue: selectedValue
  });
});
var previousModeValue = mode.value;
mode.addEventListener("click", function (event) {
  var selectedValue = event.target.value;
  ptydbg("mode click", {
    selectedValue: selectedValue
  });
  fetch("/party-members", {
    // Fetches party members on mode change
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      partyId: partyId
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (Number(selectedValue) * 2 < data.membersCount) {
      // Checks if the number of players are too many for the mode
      // Create error message
      var error = document.createElement("p");
      error.style.position = "absolute";
      error.style.top = "80%";
      error.style.left = "50%";
      error.style.transform = "translate(-50%, -50%)";
      error.style.color = "#ff5252";
      error.style.padding = "5px 10px";
      error.style.backgroundColor = "black";
      error.style.borderRadius = "6px";
      error.style.border = "2px solid white";
      error.textContent = "Too many players for this mode! Please remove 1 or more players";
      error.addEventListener("click", function (event) {
        error.remove();
      });
      setTimeout(function () {
        if (error) {
          error.remove();
        }
      }, 2000); // Automatically removes error message after 2 seconds
      document.body.appendChild(error);
      mode.value = previousModeValue; // Sets mode value to previous mode value
    } else {
      socket.emit("mode-change", {
        // If players are few enough, emit change to others
        selectedValue: selectedValue,
        username: username,
        partyId: partyId,
        members: data.members
      });
      ptydbg("emit mode-change", {
        selectedValue: selectedValue
      });
      previousModeValue = mode.value; // Sets previous mode value to current value
    }
  })["catch"](function (error) {
    console.error("Error:", error);
    ptydbg("mode change error", {
      error: error.message
    });
  });
});
map.addEventListener("change", function (event) {
  var selectedValue = event.target.value;
  socket.emit("map-change", {
    selectedValue: selectedValue,
    username: username,
    partyId: partyId
  }); // Emits map change
  ptydbg("emit map-change", {
    selectedValue: selectedValue
  });
  // Update lobby background on local change
  setLobbyBackground(selectedValue);
});
readyBtn.addEventListener("click", function (event) {
  if (ready === false) {
    ready = true;
    readyBtn.style.backgroundColor = "green";
    readyBtn.value = "Cancel";
  } else if (ready === true) {
    ready = false;
    readyBtn.style.backgroundColor = "";
    readyBtn.value = "Ready";
  }
  socket.emit("ready", {
    username: username,
    ready: ready,
    partyId: partyId,
    mode: mode.value
  }); // Emits ready event
  ptydbg("emit ready", {
    username: username,
    ready: ready,
    partyId: partyId,
    mode: mode.value
  });
});
socket.on("connection", function (data) {
  ptydbg("recv connection", {
    members: data.partyMembers.length - 1
  });
  // Player connection only
  data.partyMembers.forEach(function (member) {
    // Grabs existing players from the party
    if (member.mode && member.map) {
      mode.value = member.mode;
      map.value = member.map;
    } else {
      var tempName = member.name; // Tempname includes (You)
      var _character = member.character;
      if (member.name === username) {
        tempName += " (You)";
      }
      var readyText;
      if (member.ready === true) {
        readyText = "Ready";
      } else if (member.ready === false) {
        readyText = "Not ready";
      }
      checkModeValue(); // Checks the value of the mode and sets up the td's
      updatePeople(tempName, _character, readyText); // Updates the players
    }
  });
});
socket.on("user-joined", function (data) {
  if (partyId === data.partyId) {
    updatePeople(data.name, "Ninja", "Not Ready");
    ptydbg("recv user-joined", data);
  }
});

// On character change
socket.on("character-change", function (data) {
  if (partyId === data.partyId) {
    ptydbg("recv character-change", data);
    // Check if party is the same
    var user = document.getElementById(data.username);
    if (user) {
      var img = user.querySelector(".character-sprite");
      if (data.character === "Ninja") {
        img.src = "/assets/ninjaIcon.png";
        img.className = "character-sprite";
      }
    }
  }
});

// On mode change
socket.on("mode-change", function (data) {
  if (partyId === data.partyId) {
    ptydbg("recv mode-change", {
      mode: data.mode
    });
    // Check if party is the same
    mode.value = data.mode;
    checkModeValue(); // Checks mode value and sets up td's

    var members = data.members; // Grabs member data from server
    for (var userKey in members) {
      if (members[userKey]["name"]) {
        var user = members[userKey];
        if (!document.getElementById(user["name"])) {
          var name = user["name"];
          if (name === username) {
            name = "".concat(user["name"], " (You)");
          }
          var readyText = void 0;
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
socket.on("map-change", function (data) {
  if (partyId === data.partyId) {
    map.value = data.map;
    ptydbg("recv map-change", {
      map: data.map
    });
    // Sync background on remote updates as well
    setLobbyBackground(data.map);
  }
});

// On drop
socket.on("drop", function (data) {
  ptydbg("recv drop", data);
  var allSlots = document.querySelectorAll(".character-slot");
  var count = 0;
  allSlots.forEach(function (slot) {
    // Finds index of slot
    count++;
    if (count === data.count) {
      // If the index matches
      // Gets the information from the new slot
      var usernameElement = slot.querySelector(".username");
      var imgElement = slot.querySelector(".character-sprite");
      var statusElement = slot.querySelector(".status");
      var previousSlot = document.getElementById(data.name); // Finds previous slot from id
      if (previousSlot) {
        // Gets information from old slot
        var _username = previousSlot.querySelector(".username");
        var img = previousSlot.querySelector(".character-sprite");
        var status = previousSlot.querySelector(".status");

        // If new slot is not a random, it sets the information of the old slot to the information of the new slot
        if (usernameElement.textContent !== "Random") {
          _username.textContent = usernameElement.textContent;
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
socket.on("ready", function (data) {
  if (partyId === data.party) {
    ptydbg("recv ready", data);
    var playerSlot = document.getElementById(data.name);
    if (playerSlot) {
      var status = playerSlot.querySelector(".status");
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
socket.on("room-deleted", function () {
  window.location = "/";
});

// On matchmaking
socket.on("matchmaking", function (data) {
  if (partyId === data.partyId) {
    ptydbg("recv matchmaking", data);
    sessionStorage.setItem("matchmakingMembers", data.members); // Sets session storage of members so that the matchmaking screen can display it
    sessionStorage.setItem("membersToFind", data.membersToFind);
    window.location.href = "/matchmaking/".concat(data.partyId); // Redirects to matchmaking for party
  }
});

// On game start
socket.on("game-started", function (data) {
  if (partyId === data.partyId) {
    ptydbg("recv game-started", {
      gameId: data.gameId,
      partyMembers: data.partyMembers,
      map: data.map
    });
    for (var team in data.gameData) {
      // For each team in the game
      for (var playerKey in data.gameData[team]) {
        // For each player in the team
        var player = data.gameData[team][playerKey];
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
    window.location = "/game/".concat(data.gameId);
    ptydbg("navigate game", {
      gameId: data.gameId
    });
  }
});

// On user disconnect
socket.on("user-disconnected", function (data) {
  if (data.partyId === partyId) {
    ptydbg("recv user-disconnected", data);
    var userSlots = document.querySelectorAll(".character-slot"); // Find all slots
    var userSlot;
    userSlots.forEach(function (slot) {
      // For each slot
      var usernameElement = slot.querySelector(".username");
      // If the name of the slot matches the name of the user who disconnected it sets it to a random
      if (usernameElement.textContent === data.name) {
        userSlot = slot; // Sets the variable userSlot to the actual slot
        return;
      }
    });

    // If a slot exists, reset it back to random
    if (userSlot) {
      updateCharacterSlot(userSlot, "Random", "Random", "Invite", true);
      var _ready = userSlot.querySelector(".status");
      _ready.addEventListener("click", function (event) {
        if (_ready.classList.contains("invite")) {
          copyInviteSimple();
          _ready.textContent = "Copied!";
          setTimeout(function () {
            _ready.textContent = "Invite";
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
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var array = decodedCookie.split(";");
  for (var i = 0; i < array.length; i++) {
    var cookie = array[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxDQUFDLEVBQUU7TUFDOUIsT0FBTzhDLE1BQU0sQ0FBQzZHLFNBQVMsQ0FBQzNKLElBQUksQ0FBQzFCLE1BQU0sQ0FBQztJQUN0QztFQUNGO0VBQ0EsT0FBTyxFQUFFO0FBQ1gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvcGFydHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFydHkuanNcblxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xuZnVuY3Rpb24gcHR5ZGJnKGxhYmVsLCBkYXRhID0ge30pIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhgW1BBUlRZXVske25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1dICR7bGFiZWx9YCwgZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhgW1BBUlRZXSAke2xhYmVsfWApO1xuICB9XG59XG5wdHlkYmcoXCJwYXJ0eSBwYWdlIGxvYWRcIiwgeyBwYXJ0eUlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgfSk7XG5cbi8vIERvY3VtZW50IFZhcmlhYmxlc1xuY29uc3QgY2hhcmFjdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXJcIik7XG5jb25zdCBtb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpO1xuY29uc3QgbWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIik7XG5jb25zdCByZWFkeUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVhZHlcIik7XG5cbmxldCByZWFkeSA9IGZhbHNlO1xuXG4vLyBQYXJ0eSBpZCB2YXJpYWJsZVxuY29uc3QgcGFydHlJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIikuZmlsdGVyKEJvb2xlYW4pLnBvcCgpO1xuLy8gVXNlcm5hbWUgdmFyaWFibGVcbmxldCB1c2VybmFtZSA9IGdldENvb2tpZShcIm5hbWVcIik7XG5cbmlmICh1c2VybmFtZSkge1xuICAvLyBFbWl0cyB1c2VyLWpvaW5lZCB0byBvdGhlciBwbGF5ZXJzXG4gIHNvY2tldC5lbWl0KFwidXNlci1qb2luZWRcIiwgeyBuYW1lOiB1c2VybmFtZSwgcGFydHlJZCB9KTtcbiAgcHR5ZGJnKFwiZW1pdCB1c2VyLWpvaW5lZFwiLCB7IHVzZXJuYW1lLCBwYXJ0eUlkIH0pO1xufSBlbHNlIHtcbiAgLy8gSWYgdGhlIHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0LCBwbGF5ZXIgaXMgcmVkaXJlY3RlZCB0byB3ZWxjb21lIHNjcmVlblxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3dlbGNvbWVcIjtcbn1cblxuLy8gU2V0cyB1c2VybmFtZSB0ZXh0IHRvIHRoZSB1c2VybmFtZVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZS10ZXh0XCIpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XG5cbi8vIEhlbHBlciB0byBzZXQgbG9iYnkgYmFja2dyb3VuZCBiYXNlZCBvbiBtYXAgdmFsdWVcbmZ1bmN0aW9uIHNldExvYmJ5QmFja2dyb3VuZChtYXBWYWx1ZSkge1xuICBjb25zdCB2ID0gU3RyaW5nKG1hcFZhbHVlKTtcbiAgaWYgKHYgPT09IFwiMlwiKSB7XG4gICAgLy8gTWFuZ3JvdmUgTWVhZG93XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiL2Fzc2V0cy9iZzMuanBnXCIpJztcbiAgfSBlbHNlIHtcbiAgICAvLyBEZWZhdWx0IG1hcFxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIi9hc3NldHMvYmcyLmpwZ1wiKSc7XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSB0aGUgbG9iYnkgd2l0aCBpbml0aWFsIHBsYXRmb3JtIHNldHVwXG5jaGVja01vZGVWYWx1ZSgpO1xuXG4vLyBTZXQgaW5pdGlhbCBiYWNrZ3JvdW5kIGJhc2VkIG9uIGN1cnJlbnQgc2VsZWN0IHZhbHVlXG5zZXRMb2JieUJhY2tncm91bmQobWFwLnZhbHVlKTtcblxuLy8gU2V0IHVwIGRyYWcgYW5kIGRyb3AgZm9yIGluaXRpYWwgc2xvdHNcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hhcmFjdGVyLXNsb3RcIikuZm9yRWFjaCgoc2xvdCkgPT4ge1xuICBjb25zdCBwbGF0Zm9ybSA9IHNsb3QucGFyZW50RWxlbWVudDtcbiAgY29uc3QgdGVhbSA9IHBsYXRmb3JtLmdldEF0dHJpYnV0ZShcImRhdGEtdGVhbVwiKTtcbiAgc2V0dXBEcmFnQW5kRHJvcChzbG90LCB0ZWFtKTtcbn0pO1xuXG5jb25zdCBwYXJ0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFydHlcIik7XG5cbi8vIFBvcHVwIHRvIGNvcHkgaWQgdG8gY2xpcGJvYXJkXG5sZXQgcG9wdXA7XG4vLyBNb3VzZSBob3ZlclxucGFydHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAvLyBDcmVhdGVzIHBvcHVwXG4gIHBvcHVwLmNsYXNzTmFtZSA9IFwicGFydHktcG9wdXBcIjtcblxuICBwb3B1cC50ZXh0Q29udGVudCA9IGAke3dpbmRvdy5sb2NhdGlvbi5ocmVmfWA7IC8vIFNldHMgdGV4dCB0byB0aGUgdXJsIG9mIHRoZSB3aW5kb3dcblxuICBjb25zdCBwYXJ0eUNlbnRlclggPSBwYXJ0eS5vZmZzZXRMZWZ0ICsgcGFydHkub2Zmc2V0V2lkdGggLyAyIC0gMTUwO1xuICBjb25zdCBwYXJ0eVkgPSBwYXJ0eS5vZmZzZXRUb3A7XG5cbiAgcG9wdXAuc3R5bGUubGVmdCA9IHBhcnR5Q2VudGVyWCArIFwicHhcIjtcbiAgcG9wdXAuc3R5bGUudG9wID0gcGFydHlZICsgNTUgKyBcInB4XCI7IC8vIExvd2VyIHBvc2l0aW9uXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cCk7XG59KTtcblxucGFydHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIChldmVudCkgPT4ge1xuICBpZiAocG9wdXApIHtcbiAgICBwb3B1cC5yZW1vdmUoKTtcbiAgfVxufSk7XG5cbnBhcnR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgaWYgKHBvcHVwKSB7XG4gICAgY29weUludml0ZShwb3B1cCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBSZW1vdmVzIGNsaWNrZWQgdGV4dCBhZnRlciAyIHNlY29uZHNcbiAgICAgIGlmIChwb3B1cCkge1xuICAgICAgICBwb3B1cC50ZXh0Q29udGVudCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBwb3B1cC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyRjJGMkZcIjtcbiAgICAgIH1cbiAgICB9LCAyMDAwKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNvcHlJbnZpdGUocG9wdXApIHtcbiAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQgJiYgcG9wdXApIHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkXG4gICAgICAud3JpdGVUZXh0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSAvLyBXcml0ZXMgd2luZG93IFVSTCB0byBjbGlwYm9hcmRcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcG9wdXAudGV4dENvbnRlbnQgPSBcIkNvcGllZCFcIjtcbiAgICAgICAgcG9wdXAuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBjb3B5IHRleHQ6IFwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5SW52aXRlU2ltcGxlKCkge1xuICBpZiAobmF2aWdhdG9yLmNsaXBib2FyZCkge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmRcbiAgICAgIC53cml0ZVRleHQod2luZG93LmxvY2F0aW9uLmhyZWYpIC8vIFdyaXRlcyB3aW5kb3cgVVJMIHRvIGNsaXBib2FyZFxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkludml0ZSBsaW5rIGNvcGllZCB0byBjbGlwYm9hcmRcIik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNvcHkgdGV4dDogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vIFRha2VzIHVzZXIgdG8gZGlmZmVyZW50IHBhcnR5IGlmIHRoZXkgbGVhdmVcbmNvbnN0IGxlYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWF2ZVwiKTtcbmxlYXZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbn0pO1xuXG5jb25zdCBzaWduT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduLW91dFwiKTtcbnNpZ25PdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAvLyBTZXRzIGNvb2tpZSBleHBpcmF0aW9uIHRvIHRoZSBwYXN0IHRvIGRlbGV0ZSBpdFxuICBkb2N1bWVudC5jb29raWUgPVxuICAgIFwibmFtZVwiICsgXCI9OyBleHBpcmVzPU1vbiwgMDUgTWF5IDIwMTkgMDA6MDA6MDAgVVRDOyBwYXRoPS87XCI7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvd2VsY29tZVwiOyAvLyBSZWRpcmVjdHMgdXNlciB0byB3ZWxjb21lIHNjcmVlblxufSk7XG5cbmNvbnN0IHlvdXJUZWFtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2JieS1hcmVhXCIpO1xuY29uc3Qgb3BUZWFtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2JieS1hcmVhXCIpO1xuXG5mdW5jdGlvbiBjaGVja01vZGVWYWx1ZSgpIHtcbiAgY29uc3QgbG9iYnlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2JieS1hcmVhXCIpO1xuXG4gIC8vIEdldCBhbGwgZXhpc3RpbmcgcGxhdGZvcm1zXG4gIGNvbnN0IHlvdXJQbGF0Zm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcucGxhdGZvcm1bZGF0YS10ZWFtPVwieW91ci10ZWFtXCJdJ1xuICApO1xuICBjb25zdCBvcFBsYXRmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJy5wbGF0Zm9ybVtkYXRhLXRlYW09XCJvcC10ZWFtXCJdJ1xuICApO1xuXG4gIGxldCB0YXJnZXRDb3VudDtcbiAgc3dpdGNoIChtb2RlLnZhbHVlKSB7XG4gICAgY2FzZSBcIjFcIjpcbiAgICAgIHRhcmdldENvdW50ID0gMTtcbiAgICAgIGxvYmJ5QXJlYS5jbGFzc05hbWUgPSBcIm1vZGUtMVwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIjJcIjpcbiAgICAgIHRhcmdldENvdW50ID0gMjtcbiAgICAgIGxvYmJ5QXJlYS5jbGFzc05hbWUgPSBcIm1vZGUtMlwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIjNcIjpcbiAgICAgIHRhcmdldENvdW50ID0gMztcbiAgICAgIGxvYmJ5QXJlYS5jbGFzc05hbWUgPSBcIm1vZGUtM1wiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRhcmdldENvdW50ID0gMTtcbiAgICAgIGxvYmJ5QXJlYS5jbGFzc05hbWUgPSBcIm1vZGUtMVwiO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGV4dHJhIHBsYXRmb3JtcyBpZiBuZWVkZWRcbiAgaWYgKHlvdXJQbGF0Zm9ybXMubGVuZ3RoID4gdGFyZ2V0Q291bnQpIHtcbiAgICBmb3IgKGxldCBpID0geW91clBsYXRmb3Jtcy5sZW5ndGggLSAxOyBpID49IHRhcmdldENvdW50OyBpLS0pIHtcbiAgICAgIHlvdXJQbGF0Zm9ybXNbaV0ucmVtb3ZlKCk7XG4gICAgICBvcFBsYXRmb3Jtc1tpXS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgcGxhdGZvcm1zIGlmIG5lZWRlZFxuICBpZiAoeW91clBsYXRmb3Jtcy5sZW5ndGggPCB0YXJnZXRDb3VudCkge1xuICAgIGZvciAobGV0IGkgPSB5b3VyUGxhdGZvcm1zLmxlbmd0aCArIDE7IGkgPD0gdGFyZ2V0Q291bnQ7IGkrKykge1xuICAgICAgY3JlYXRlUGxhdGZvcm0oXCJ5b3VyLXRlYW1cIiwgaSk7XG4gICAgICBjcmVhdGVQbGF0Zm9ybShcIm9wLXRlYW1cIiwgaSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtKHRlYW0sIHNsb3ROdW1iZXIpIHtcbiAgY29uc3QgbG9iYnlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2JieS1hcmVhXCIpO1xuXG4gIC8vIENyZWF0ZSBwbGF0Zm9ybVxuICBjb25zdCBwbGF0Zm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBsYXRmb3JtLmNsYXNzTmFtZSA9IGBwbGF0Zm9ybSAke3RlYW19LSR7c2xvdE51bWJlcn1gO1xuICBwbGF0Zm9ybS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRlYW1cIiwgdGVhbSk7XG4gIHBsYXRmb3JtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xvdFwiLCBzbG90TnVtYmVyKTtcblxuICAvLyBDcmVhdGUgY2hhcmFjdGVyIHNsb3RcbiAgY29uc3QgY2hhcmFjdGVyU2xvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNoYXJhY3RlclNsb3QuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc2xvdCBlbXB0eVwiO1xuICBjaGFyYWN0ZXJTbG90LmlkID0gYCR7XG4gICAgdGVhbSA9PT0gXCJ5b3VyLXRlYW1cIiA/IFwieW91clwiIDogXCJvcFwiXG4gIH0tc2xvdC0ke3Nsb3ROdW1iZXJ9YDtcblxuICAvLyBDcmVhdGUgdXNlcm5hbWUgZWxlbWVudFxuICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHVzZXJuYW1lLmNsYXNzTmFtZSA9IHRlYW0gPT09IFwib3AtdGVhbVwiID8gXCJ1c2VybmFtZSBvcC1wbGF5ZXJcIiA6IFwidXNlcm5hbWVcIjtcbiAgdXNlcm5hbWUudGV4dENvbnRlbnQgPSBcIlJhbmRvbVwiO1xuXG4gIC8vIENyZWF0ZSBjaGFyYWN0ZXIgc3ByaXRlXG4gIGNvbnN0IHNwcml0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIHNwcml0ZS5jbGFzc05hbWUgPSBcImNoYXJhY3Rlci1zcHJpdGUgcmFuZG9tXCI7XG4gIHNwcml0ZS5zcmMgPSBcIi9hc3NldHMvcmFuZG9tLnBuZ1wiO1xuICBzcHJpdGUuYWx0ID0gXCJSYW5kb21cIjtcblxuICAvLyBDcmVhdGUgc3RhdHVzIGVsZW1lbnRcbiAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3RhdHVzLmNsYXNzTmFtZSA9IFwic3RhdHVzIGludml0ZVwiO1xuICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIkludml0ZVwiO1xuICBzdGF0dXMuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG5cbiAgLy8gQWRkIGludml0ZSBjbGljayBmdW5jdGlvbmFsaXR5XG4gIHN0YXR1cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKHN0YXR1cy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnZpdGVcIikpIHtcbiAgICAgIGNvcHlJbnZpdGVTaW1wbGUoKTtcbiAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IFwiQ29waWVkIVwiO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IFwiSW52aXRlXCI7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEFzc2VtYmxlIHRoZSBzdHJ1Y3R1cmVcbiAgY2hhcmFjdGVyU2xvdC5hcHBlbmRDaGlsZCh1c2VybmFtZSk7XG4gIGNoYXJhY3RlclNsb3QuYXBwZW5kQ2hpbGQoc3ByaXRlKTtcbiAgY2hhcmFjdGVyU2xvdC5hcHBlbmRDaGlsZChzdGF0dXMpO1xuICBwbGF0Zm9ybS5hcHBlbmRDaGlsZChjaGFyYWN0ZXJTbG90KTtcbiAgLy8gQWRkIHBsYXRmb3JtIGltYWdlIHVuZGVyIHRoZSBjaGFyYWN0ZXIgc2xvdCBzbyBpdCBzdGFja3MgdmVydGljYWxseVxuICBjb25zdCBwbGF0Zm9ybUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGxhdGZvcm1JbWFnZS5jbGFzc05hbWUgPSBcInBsYXRmb3JtLWltYWdlXCI7XG4gIHBsYXRmb3JtLmFwcGVuZENoaWxkKHBsYXRmb3JtSW1hZ2UpO1xuXG4gIC8vIEFkZCBkcmFnIGFuZCBkcm9wIGZ1bmN0aW9uYWxpdHlcbiAgc2V0dXBEcmFnQW5kRHJvcChjaGFyYWN0ZXJTbG90LCB0ZWFtKTtcblxuICBsb2JieUFyZWEuYXBwZW5kQ2hpbGQocGxhdGZvcm0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cERyYWdBbmREcm9wKGNoYXJhY3RlclNsb3QsIHRlYW0pIHtcbiAgLy8gTWFrZSBkcmFnZ2FibGVcbiAgY2hhcmFjdGVyU2xvdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNoYXJhY3RlclNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB1c2VybmFtZSA9IGNoYXJhY3RlclNsb3QucXVlcnlTZWxlY3RvcihcIi51c2VybmFtZVwiKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSBcIk5pbmphXCI7IC8vIERlZmF1bHQgZm9yIG5vd1xuICAgIGNvbnN0IHN0YXR1cyA9IGNoYXJhY3RlclNsb3QucXVlcnlTZWxlY3RvcihcIi5zdGF0dXNcIikudGV4dENvbnRlbnQ7XG5cbiAgICBpZiAodXNlcm5hbWUgIT09IFwiUmFuZG9tXCIpIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFxuICAgICAgICBcInRleHQvcGxhaW5cIixcbiAgICAgICAgYCR7dXNlcm5hbWUucmVwbGFjZShcIiAoWW91KVwiLCBcIlwiKX0sJHtjaGFyYWN0ZXJ9LCR7c3RhdHVzfWBcbiAgICAgICk7XG4gICAgICBjaGFyYWN0ZXJTbG90LmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcblxuICAgICAgLy8gQ3JlYXRlIGEgY3VzdG9tIGRyYWcgaW1hZ2UgdGhhdCdzIHNtYWxsZXJcbiAgICAgIGNvbnN0IGRyYWdJbWFnZSA9IGNoYXJhY3RlclNsb3QuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgZHJhZ0ltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoMC44KVwiO1xuICAgICAgZHJhZ0ltYWdlLnN0eWxlLm9wYWNpdHkgPSBcIjAuOFwiO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkcmFnSW1hZ2UpO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShkcmFnSW1hZ2UsIDMwLCAzMCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZHJhZ0ltYWdlKSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICBjaGFyYWN0ZXJTbG90LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsICgpID0+IHtcbiAgICBjaGFyYWN0ZXJTbG90LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbiAgfSk7XG5cbiAgLy8gRHJvcCB6b25lIGZ1bmN0aW9uYWxpdHlcbiAgY2hhcmFjdGVyU2xvdC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIGNoYXJhY3RlclNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2hhcmFjdGVyU2xvdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcmFnLW92ZXJcIik7XG4gIH0pO1xuXG4gIGNoYXJhY3RlclNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIE9ubHkgcmVtb3ZlIGlmIHdlJ3JlIGFjdHVhbGx5IGxlYXZpbmcgdGhlIGVsZW1lbnRcbiAgICBpZiAoIWNoYXJhY3RlclNsb3QuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgIGNoYXJhY3RlclNsb3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZy1vdmVyXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2hhcmFjdGVyU2xvdC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNoYXJhY3RlclNsb3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZy1vdmVyXCIpO1xuXG4gICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcbiAgICBpZiAoIWRhdGEpIHJldHVybjtcblxuICAgIGNvbnN0IFtuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5XSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuXG4gICAgLy8gRmluZCB0aGUgc291cmNlIHNsb3RcbiAgICBjb25zdCBzb3VyY2VTbG90ID1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpIHx8XG4gICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hhcmFjdGVyLXNsb3RcIikpLmZpbmQoKHNsb3QpID0+XG4gICAgICAgIHNsb3QucXVlcnlTZWxlY3RvcihcIi51c2VybmFtZVwiKS50ZXh0Q29udGVudC5pbmNsdWRlcyhuYW1lKVxuICAgICAgKTtcblxuICAgIGlmIChzb3VyY2VTbG90ICYmIHNvdXJjZVNsb3QgIT09IGNoYXJhY3RlclNsb3QpIHtcbiAgICAgIC8vIFN3YXAgY29udGVudFxuICAgICAgc3dhcENoYXJhY3RlclNsb3RzKHNvdXJjZVNsb3QsIGNoYXJhY3RlclNsb3QsIG5hbWUsIGNoYXJhY3RlciwgcmVhZHkpO1xuXG4gICAgICAvLyBFbWl0IHRlYW0gdXBkYXRlXG4gICAgICBjb25zdCBwbGF0Zm9ybSA9IGNoYXJhY3RlclNsb3QucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHRlYW1OYW1lID0gcGxhdGZvcm0uZ2V0QXR0cmlidXRlKFwiZGF0YS10ZWFtXCIpO1xuICAgICAgc29ja2V0LmVtaXQoXCJ0ZWFtLXVwZGF0ZVwiLCB7XG4gICAgICAgIHRlbXBOYW1lOiBuYW1lLFxuICAgICAgICBwYXJ0eUlkLFxuICAgICAgICB0ZWFtOiB0ZWFtTmFtZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFbWl0IGRyb3AgZXZlbnRcbiAgICAgIGNvbnN0IGFsbFNsb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGFyYWN0ZXItc2xvdFwiKTtcbiAgICAgIGxldCBzbG90SW5kZXggPSBBcnJheS5mcm9tKGFsbFNsb3RzKS5pbmRleE9mKGNoYXJhY3RlclNsb3QpICsgMTtcbiAgICAgIHNvY2tldC5lbWl0KFwiZHJvcFwiLCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGNoYXJhY3RlcixcbiAgICAgICAgcmVhZHksXG4gICAgICAgIGNvdW50OiBzbG90SW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzd2FwQ2hhcmFjdGVyU2xvdHMoXG4gIHNvdXJjZVNsb3QsXG4gIHRhcmdldFNsb3QsXG4gIGRyYWdnZWROYW1lLFxuICBkcmFnZ2VkQ2hhcmFjdGVyLFxuICBkcmFnZ2VkUmVhZHlcbikge1xuICAvLyBHZXQgY3VycmVudCB0YXJnZXQgc2xvdCBjb250ZW50XG4gIGNvbnN0IHRhcmdldFVzZXJuYW1lID0gdGFyZ2V0U2xvdC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lXCIpLnRleHRDb250ZW50O1xuICBjb25zdCB0YXJnZXRTcHJpdGUgPSB0YXJnZXRTbG90LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhcmFjdGVyLXNwcml0ZVwiKS5zcmM7XG4gIGNvbnN0IHRhcmdldFN0YXR1cyA9IHRhcmdldFNsb3QucXVlcnlTZWxlY3RvcihcIi5zdGF0dXNcIikudGV4dENvbnRlbnQ7XG5cbiAgLy8gVXBkYXRlIHRhcmdldCBzbG90IHdpdGggZHJhZ2dlZCBjb250ZW50XG4gIHVwZGF0ZUNoYXJhY3RlclNsb3QoXG4gICAgdGFyZ2V0U2xvdCxcbiAgICBgJHtkcmFnZ2VkTmFtZX0gKFlvdSlgLFxuICAgIGRyYWdnZWRDaGFyYWN0ZXIsXG4gICAgZHJhZ2dlZFJlYWR5XG4gICk7XG5cbiAgLy8gVXBkYXRlIHNvdXJjZSBzbG90IHdpdGggdGFyZ2V0IGNvbnRlbnQgKG9yIG1ha2UgaXQgcmFuZG9tIGlmIHRhcmdldCB3YXMgcmFuZG9tKVxuICBpZiAodGFyZ2V0VXNlcm5hbWUgPT09IFwiUmFuZG9tXCIpIHtcbiAgICB1cGRhdGVDaGFyYWN0ZXJTbG90KHNvdXJjZVNsb3QsIFwiUmFuZG9tXCIsIFwiUmFuZG9tXCIsIFwiSW52aXRlXCIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUNoYXJhY3RlclNsb3Qoc291cmNlU2xvdCwgdGFyZ2V0VXNlcm5hbWUsIFwiTmluamFcIiwgdGFyZ2V0U3RhdHVzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGFyYWN0ZXJTbG90KHNsb3QsIG5hbWUsIGNoYXJhY3Rlciwgc3RhdHVzLCBpc1JhbmRvbSA9IGZhbHNlKSB7XG4gIGNvbnN0IHVzZXJuYW1lID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lXCIpO1xuICBjb25zdCBzcHJpdGUgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhcmFjdGVyLXNwcml0ZVwiKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHVzXCIpO1xuXG4gIHVzZXJuYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgc2xvdC5pZCA9IG5hbWUgPT09IFwiUmFuZG9tXCIgPyBcIlwiIDogbmFtZS5yZXBsYWNlKFwiIChZb3UpXCIsIFwiXCIpO1xuXG4gIGlmIChpc1JhbmRvbSB8fCBuYW1lID09PSBcIlJhbmRvbVwiKSB7XG4gICAgc3ByaXRlLnNyYyA9IFwiL2Fzc2V0cy9yYW5kb20ucG5nXCI7XG4gICAgc3ByaXRlLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyLXNwcml0ZSByYW5kb21cIjtcbiAgICBzdGF0dXNFbC5jbGFzc05hbWUgPSBcInN0YXR1cyBpbnZpdGVcIjtcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiSW52aXRlXCI7XG4gICAgc3RhdHVzRWwuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgc2xvdC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlci1zbG90IGVtcHR5XCI7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGNoYXJhY3RlciA9PT0gXCJOaW5qYVwiKSB7XG4gICAgICBzcHJpdGUuc3JjID0gXCIvYXNzZXRzL25pbmphSWNvbi5wbmdcIjtcbiAgICB9XG4gICAgc3ByaXRlLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyLXNwcml0ZVwiO1xuXG4gICAgLy8gVXBkYXRlIHN0YXR1cyBzdHlsaW5nXG4gICAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBzdGF0dXM7XG4gICAgaWYgKHN0YXR1cyA9PT0gXCJSZWFkeVwiKSB7XG4gICAgICBzdGF0dXNFbC5jbGFzc05hbWUgPSBcInN0YXR1cyByZWFkeVwiO1xuICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIk5vdCBSZWFkeVwiIHx8IHN0YXR1cyA9PT0gXCJOb3QgcmVhZHlcIikge1xuICAgICAgc3RhdHVzRWwuY2xhc3NOYW1lID0gXCJzdGF0dXMgbm90LXJlYWR5XCI7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHNsb3Qgc3R5bGluZyBiYXNlZCBvbiB0ZWFtXG4gICAgY29uc3QgcGxhdGZvcm0gPSBzbG90LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBsYXRmb3JtLmdldEF0dHJpYnV0ZShcImRhdGEtdGVhbVwiKSA9PT0gXCJ5b3VyLXRlYW1cIikge1xuICAgICAgc2xvdC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlci1zbG90IHBsYXllci1kaXNwbGF5XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsb3QuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc2xvdCBvcC1kaXNwbGF5XCI7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBlb3BsZShuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5KSB7XG4gIGNvbnN0IGFsbENoYXJhY3RlclNsb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGFyYWN0ZXItc2xvdFwiKTtcbiAgbGV0IGNvbmRpdGlvbk1ldCA9IGZhbHNlO1xuICBsZXQgdGVtcE5hbWUgPSBuYW1lO1xuICBpZiAobmFtZS5pbmNsdWRlcyhcIiAoWW91KVwiKSkge1xuICAgIHRlbXBOYW1lID0gbmFtZS5yZXBsYWNlKFwiIChZb3UpXCIsIFwiXCIpLnRyaW0oKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ2hhcmFjdGVyU2xvdHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzbG90ID0gYWxsQ2hhcmFjdGVyU2xvdHNbaV07XG4gICAgY29uc3QgcGxhdGZvcm0gPSBzbG90LnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3QgdGVhbU5hbWUgPSBwbGF0Zm9ybS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRlYW1cIik7XG5cbiAgICBpZiAoc2xvdC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGF5ZXItZGlzcGxheVwiKSB8fCB0ZWFtTmFtZSA9PT0gXCJ5b3VyLXRlYW1cIikge1xuICAgICAgc29ja2V0LmVtaXQoXCJ0ZWFtLXVwZGF0ZVwiLCB7IHRlbXBOYW1lLCBwYXJ0eUlkLCB0ZWFtOiBcInlvdXItdGVhbVwiIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzb2NrZXQuZW1pdChcInRlYW0tdXBkYXRlXCIsIHsgdGVtcE5hbWUsIHBhcnR5SWQsIHRlYW06IFwib3AtdGVhbVwiIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJuYW1lRWxlbWVudCA9IHNsb3QucXVlcnlTZWxlY3RvcihcIi51c2VybmFtZVwiKTtcbiAgICBpZiAodXNlcm5hbWVFbGVtZW50ICYmIHVzZXJuYW1lRWxlbWVudC50ZXh0Q29udGVudCA9PT0gXCJSYW5kb21cIikge1xuICAgICAgdXBkYXRlQ2hhcmFjdGVyU2xvdChzbG90LCBuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5KTtcblxuICAgICAgLy8gU2V0IHVwIGRyYWcgZnVuY3Rpb25hbGl0eVxuICAgICAgc2xvdC5pZCA9IHRlbXBOYW1lO1xuICAgICAgc2xvdC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgc2xvdC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcbiAgICAgICAgICBcInRleHQvcGxhaW5cIixcbiAgICAgICAgICBgJHt0ZW1wTmFtZX0sJHtjaGFyYWN0ZXJ9LCR7cmVhZHl9YFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbmRpdGlvbk1ldCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuY2hhcmFjdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gIHNvY2tldC5lbWl0KFwiY2hhcmFjdGVyLWNoYW5nZVwiLCB7IHNlbGVjdGVkVmFsdWUsIHVzZXJuYW1lLCBwYXJ0eUlkIH0pOyAvLyBFbWl0cyBjaGFyYWN0ZXIgY2hhbmdlXG4gIHB0eWRiZyhcImVtaXQgY2hhcmFjdGVyLWNoYW5nZVwiLCB7IHNlbGVjdGVkVmFsdWUgfSk7XG59KTtcblxubGV0IHByZXZpb3VzTW9kZVZhbHVlID0gbW9kZS52YWx1ZTtcbm1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICBwdHlkYmcoXCJtb2RlIGNsaWNrXCIsIHsgc2VsZWN0ZWRWYWx1ZSB9KTtcbiAgZmV0Y2goXCIvcGFydHktbWVtYmVyc1wiLCB7XG4gICAgLy8gRmV0Y2hlcyBwYXJ0eSBtZW1iZXJzIG9uIG1vZGUgY2hhbmdlXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGFydHlJZCB9KSxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgaWYgKE51bWJlcihzZWxlY3RlZFZhbHVlKSAqIDIgPCBkYXRhLm1lbWJlcnNDb3VudCkge1xuICAgICAgICAvLyBDaGVja3MgaWYgdGhlIG51bWJlciBvZiBwbGF5ZXJzIGFyZSB0b28gbWFueSBmb3IgdGhlIG1vZGVcbiAgICAgICAgLy8gQ3JlYXRlIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgY29uc3QgZXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgZXJyb3Iuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIGVycm9yLnN0eWxlLnRvcCA9IFwiODAlXCI7XG4gICAgICAgIGVycm9yLnN0eWxlLmxlZnQgPSBcIjUwJVwiO1xuICAgICAgICBlcnJvci5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiO1xuICAgICAgICBlcnJvci5zdHlsZS5jb2xvciA9IFwiI2ZmNTI1MlwiO1xuICAgICAgICBlcnJvci5zdHlsZS5wYWRkaW5nID0gXCI1cHggMTBweFwiO1xuICAgICAgICBlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgIGVycm9yLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIGVycm9yLnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIHdoaXRlXCI7XG4gICAgICAgIGVycm9yLnRleHRDb250ZW50ID1cbiAgICAgICAgICBcIlRvbyBtYW55IHBsYXllcnMgZm9yIHRoaXMgbW9kZSEgUGxlYXNlIHJlbW92ZSAxIG9yIG1vcmUgcGxheWVyc1wiO1xuXG4gICAgICAgIGVycm9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBlcnJvci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvci5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMDApOyAvLyBBdXRvbWF0aWNhbGx5IHJlbW92ZXMgZXJyb3IgbWVzc2FnZSBhZnRlciAyIHNlY29uZHNcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlcnJvcik7XG5cbiAgICAgICAgbW9kZS52YWx1ZSA9IHByZXZpb3VzTW9kZVZhbHVlOyAvLyBTZXRzIG1vZGUgdmFsdWUgdG8gcHJldmlvdXMgbW9kZSB2YWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29ja2V0LmVtaXQoXCJtb2RlLWNoYW5nZVwiLCB7XG4gICAgICAgICAgLy8gSWYgcGxheWVycyBhcmUgZmV3IGVub3VnaCwgZW1pdCBjaGFuZ2UgdG8gb3RoZXJzXG4gICAgICAgICAgc2VsZWN0ZWRWYWx1ZSxcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXJ0eUlkLFxuICAgICAgICAgIG1lbWJlcnM6IGRhdGEubWVtYmVycyxcbiAgICAgICAgfSk7XG4gICAgICAgIHB0eWRiZyhcImVtaXQgbW9kZS1jaGFuZ2VcIiwgeyBzZWxlY3RlZFZhbHVlIH0pO1xuICAgICAgICBwcmV2aW91c01vZGVWYWx1ZSA9IG1vZGUudmFsdWU7IC8vIFNldHMgcHJldmlvdXMgbW9kZSB2YWx1ZSB0byBjdXJyZW50IHZhbHVlXG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHB0eWRiZyhcIm1vZGUgY2hhbmdlIGVycm9yXCIsIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgfSk7XG59KTtcblxubWFwLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gIHNvY2tldC5lbWl0KFwibWFwLWNoYW5nZVwiLCB7IHNlbGVjdGVkVmFsdWUsIHVzZXJuYW1lLCBwYXJ0eUlkIH0pOyAvLyBFbWl0cyBtYXAgY2hhbmdlXG4gIHB0eWRiZyhcImVtaXQgbWFwLWNoYW5nZVwiLCB7IHNlbGVjdGVkVmFsdWUgfSk7XG4gIC8vIFVwZGF0ZSBsb2JieSBiYWNrZ3JvdW5kIG9uIGxvY2FsIGNoYW5nZVxuICBzZXRMb2JieUJhY2tncm91bmQoc2VsZWN0ZWRWYWx1ZSk7XG59KTtcblxucmVhZHlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICBpZiAocmVhZHkgPT09IGZhbHNlKSB7XG4gICAgcmVhZHkgPSB0cnVlO1xuICAgIHJlYWR5QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICByZWFkeUJ0bi52YWx1ZSA9IFwiQ2FuY2VsXCI7XG4gIH0gZWxzZSBpZiAocmVhZHkgPT09IHRydWUpIHtcbiAgICByZWFkeSA9IGZhbHNlO1xuICAgIHJlYWR5QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgcmVhZHlCdG4udmFsdWUgPSBcIlJlYWR5XCI7XG4gIH1cbiAgc29ja2V0LmVtaXQoXCJyZWFkeVwiLCB7IHVzZXJuYW1lLCByZWFkeSwgcGFydHlJZCwgbW9kZTogbW9kZS52YWx1ZSB9KTsgLy8gRW1pdHMgcmVhZHkgZXZlbnRcbiAgcHR5ZGJnKFwiZW1pdCByZWFkeVwiLCB7IHVzZXJuYW1lLCByZWFkeSwgcGFydHlJZCwgbW9kZTogbW9kZS52YWx1ZSB9KTtcbn0pO1xuXG5zb2NrZXQub24oXCJjb25uZWN0aW9uXCIsIChkYXRhKSA9PiB7XG4gIHB0eWRiZyhcInJlY3YgY29ubmVjdGlvblwiLCB7IG1lbWJlcnM6IGRhdGEucGFydHlNZW1iZXJzLmxlbmd0aCAtIDEgfSk7XG4gIC8vIFBsYXllciBjb25uZWN0aW9uIG9ubHlcbiAgZGF0YS5wYXJ0eU1lbWJlcnMuZm9yRWFjaCgobWVtYmVyKSA9PiB7XG4gICAgLy8gR3JhYnMgZXhpc3RpbmcgcGxheWVycyBmcm9tIHRoZSBwYXJ0eVxuICAgIGlmIChtZW1iZXIubW9kZSAmJiBtZW1iZXIubWFwKSB7XG4gICAgICBtb2RlLnZhbHVlID0gbWVtYmVyLm1vZGU7XG4gICAgICBtYXAudmFsdWUgPSBtZW1iZXIubWFwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGVtcE5hbWUgPSBtZW1iZXIubmFtZTsgLy8gVGVtcG5hbWUgaW5jbHVkZXMgKFlvdSlcbiAgICAgIGxldCBjaGFyYWN0ZXIgPSBtZW1iZXIuY2hhcmFjdGVyO1xuICAgICAgaWYgKG1lbWJlci5uYW1lID09PSB1c2VybmFtZSkge1xuICAgICAgICB0ZW1wTmFtZSArPSBcIiAoWW91KVwiO1xuICAgICAgfVxuICAgICAgbGV0IHJlYWR5VGV4dDtcbiAgICAgIGlmIChtZW1iZXIucmVhZHkgPT09IHRydWUpIHtcbiAgICAgICAgcmVhZHlUZXh0ID0gXCJSZWFkeVwiO1xuICAgICAgfSBlbHNlIGlmIChtZW1iZXIucmVhZHkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlYWR5VGV4dCA9IFwiTm90IHJlYWR5XCI7XG4gICAgICB9XG4gICAgICBjaGVja01vZGVWYWx1ZSgpOyAvLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBtb2RlIGFuZCBzZXRzIHVwIHRoZSB0ZCdzXG4gICAgICB1cGRhdGVQZW9wbGUodGVtcE5hbWUsIGNoYXJhY3RlciwgcmVhZHlUZXh0KTsgLy8gVXBkYXRlcyB0aGUgcGxheWVyc1xuICAgIH1cbiAgfSk7XG59KTtcblxuc29ja2V0Lm9uKFwidXNlci1qb2luZWRcIiwgKGRhdGEpID0+IHtcbiAgaWYgKHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xuICAgIHVwZGF0ZVBlb3BsZShkYXRhLm5hbWUsIFwiTmluamFcIiwgXCJOb3QgUmVhZHlcIik7XG4gICAgcHR5ZGJnKFwicmVjdiB1c2VyLWpvaW5lZFwiLCBkYXRhKTtcbiAgfVxufSk7XG5cbi8vIE9uIGNoYXJhY3RlciBjaGFuZ2VcbnNvY2tldC5vbihcImNoYXJhY3Rlci1jaGFuZ2VcIiwgKGRhdGEpID0+IHtcbiAgaWYgKHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xuICAgIHB0eWRiZyhcInJlY3YgY2hhcmFjdGVyLWNoYW5nZVwiLCBkYXRhKTtcbiAgICAvLyBDaGVjayBpZiBwYXJ0eSBpcyB0aGUgc2FtZVxuICAgIGNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLnVzZXJuYW1lKTtcbiAgICBpZiAodXNlcikge1xuICAgICAgY29uc3QgaW1nID0gdXNlci5xdWVyeVNlbGVjdG9yKFwiLmNoYXJhY3Rlci1zcHJpdGVcIik7XG4gICAgICBpZiAoZGF0YS5jaGFyYWN0ZXIgPT09IFwiTmluamFcIikge1xuICAgICAgICBpbWcuc3JjID0gXCIvYXNzZXRzL25pbmphSWNvbi5wbmdcIjtcbiAgICAgICAgaW1nLmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyLXNwcml0ZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vIE9uIG1vZGUgY2hhbmdlXG5zb2NrZXQub24oXCJtb2RlLWNoYW5nZVwiLCAoZGF0YSkgPT4ge1xuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eUlkKSB7XG4gICAgcHR5ZGJnKFwicmVjdiBtb2RlLWNoYW5nZVwiLCB7IG1vZGU6IGRhdGEubW9kZSB9KTtcbiAgICAvLyBDaGVjayBpZiBwYXJ0eSBpcyB0aGUgc2FtZVxuICAgIG1vZGUudmFsdWUgPSBkYXRhLm1vZGU7XG4gICAgY2hlY2tNb2RlVmFsdWUoKTsgLy8gQ2hlY2tzIG1vZGUgdmFsdWUgYW5kIHNldHMgdXAgdGQnc1xuXG4gICAgY29uc3QgbWVtYmVycyA9IGRhdGEubWVtYmVyczsgLy8gR3JhYnMgbWVtYmVyIGRhdGEgZnJvbSBzZXJ2ZXJcbiAgICBmb3IgKGNvbnN0IHVzZXJLZXkgaW4gbWVtYmVycykge1xuICAgICAgaWYgKG1lbWJlcnNbdXNlcktleV1bXCJuYW1lXCJdKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBtZW1iZXJzW3VzZXJLZXldO1xuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVzZXJbXCJuYW1lXCJdKSkge1xuICAgICAgICAgIGxldCBuYW1lID0gdXNlcltcIm5hbWVcIl07XG4gICAgICAgICAgaWYgKG5hbWUgPT09IHVzZXJuYW1lKSB7XG4gICAgICAgICAgICBuYW1lID0gYCR7dXNlcltcIm5hbWVcIl19IChZb3UpYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHJlYWR5VGV4dDtcbiAgICAgICAgICBpZiAodXNlcltcInJlYWR5XCJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZWFkeVRleHQgPSBcIlJlYWR5XCI7XG4gICAgICAgICAgfSBlbHNlIGlmICh1c2VyW1wicmVhZHlcIl0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZWFkeVRleHQgPSBcIk5vdCBSZWFkeVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVQZW9wbGUobmFtZSwgdXNlcltcImNoYXJhY3RlclwiXSwgcmVhZHlUZXh0KTsgLy8gVXBkYXRlcyB0ZCdzIHdpdGggbWVtYmVyIGRhdGFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vIE9uIG1hcCBjaGFuZ2VcbnNvY2tldC5vbihcIm1hcC1jaGFuZ2VcIiwgKGRhdGEpID0+IHtcbiAgaWYgKHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xuICAgIG1hcC52YWx1ZSA9IGRhdGEubWFwO1xuICAgIHB0eWRiZyhcInJlY3YgbWFwLWNoYW5nZVwiLCB7IG1hcDogZGF0YS5tYXAgfSk7XG4gICAgLy8gU3luYyBiYWNrZ3JvdW5kIG9uIHJlbW90ZSB1cGRhdGVzIGFzIHdlbGxcbiAgICBzZXRMb2JieUJhY2tncm91bmQoZGF0YS5tYXApO1xuICB9XG59KTtcblxuLy8gT24gZHJvcFxuc29ja2V0Lm9uKFwiZHJvcFwiLCAoZGF0YSkgPT4ge1xuICBwdHlkYmcoXCJyZWN2IGRyb3BcIiwgZGF0YSk7XG4gIGNvbnN0IGFsbFNsb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGFyYWN0ZXItc2xvdFwiKTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgYWxsU2xvdHMuZm9yRWFjaCgoc2xvdCkgPT4ge1xuICAgIC8vIEZpbmRzIGluZGV4IG9mIHNsb3RcbiAgICBjb3VudCsrO1xuICAgIGlmIChjb3VudCA9PT0gZGF0YS5jb3VudCkge1xuICAgICAgLy8gSWYgdGhlIGluZGV4IG1hdGNoZXNcbiAgICAgIC8vIEdldHMgdGhlIGluZm9ybWF0aW9uIGZyb20gdGhlIG5ldyBzbG90XG4gICAgICBjb25zdCB1c2VybmFtZUVsZW1lbnQgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoXCIudXNlcm5hbWVcIik7XG4gICAgICBjb25zdCBpbWdFbGVtZW50ID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLmNoYXJhY3Rlci1zcHJpdGVcIik7XG4gICAgICBjb25zdCBzdGF0dXNFbGVtZW50ID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLnN0YXR1c1wiKTtcblxuICAgICAgY29uc3QgcHJldmlvdXNTbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5uYW1lKTsgLy8gRmluZHMgcHJldmlvdXMgc2xvdCBmcm9tIGlkXG4gICAgICBpZiAocHJldmlvdXNTbG90KSB7XG4gICAgICAgIC8vIEdldHMgaW5mb3JtYXRpb24gZnJvbSBvbGQgc2xvdFxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHByZXZpb3VzU2xvdC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lXCIpO1xuICAgICAgICBjb25zdCBpbWcgPSBwcmV2aW91c1Nsb3QucXVlcnlTZWxlY3RvcihcIi5jaGFyYWN0ZXItc3ByaXRlXCIpO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBwcmV2aW91c1Nsb3QucXVlcnlTZWxlY3RvcihcIi5zdGF0dXNcIik7XG5cbiAgICAgICAgLy8gSWYgbmV3IHNsb3QgaXMgbm90IGEgcmFuZG9tLCBpdCBzZXRzIHRoZSBpbmZvcm1hdGlvbiBvZiB0aGUgb2xkIHNsb3QgdG8gdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBuZXcgc2xvdFxuICAgICAgICBpZiAodXNlcm5hbWVFbGVtZW50LnRleHRDb250ZW50ICE9PSBcIlJhbmRvbVwiKSB7XG4gICAgICAgICAgdXNlcm5hbWUudGV4dENvbnRlbnQgPSB1c2VybmFtZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgaW1nLnNyYyA9IGltZ0VsZW1lbnQuc3JjO1xuICAgICAgICAgIGltZy5jbGFzc05hbWUgPSBpbWdFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSBzdGF0dXNFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICBwcmV2aW91c1Nsb3QuaWQgPSB1c2VybmFtZUVsZW1lbnQudGV4dENvbnRlbnQucmVwbGFjZShcIiAoWW91KVwiLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB0aGUgbmV3IHNsb3QgaXMgYSByYW5kb20sIHNldHMgb2xkIHNsb3QgdG8gYSByYW5kb21cbiAgICAgICAgICB1cGRhdGVDaGFyYWN0ZXJTbG90KHByZXZpb3VzU2xvdCwgXCJSYW5kb21cIiwgXCJSYW5kb21cIiwgXCJJbnZpdGVcIiwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXRzIHRoZSBpbmZvcm1hdGlvbiBvZiB0aGUgbmV3IHNsb3RcbiAgICAgICAgdXBkYXRlQ2hhcmFjdGVyU2xvdChzbG90LCBkYXRhLm5hbWUsIGRhdGEuY2hhcmFjdGVyLCBkYXRhLnJlYWR5KTtcbiAgICAgICAgc2xvdC5pZCA9IGRhdGEubmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIE9uIHJlYWR5XG5zb2NrZXQub24oXCJyZWFkeVwiLCAoZGF0YSkgPT4ge1xuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eSkge1xuICAgIHB0eWRiZyhcInJlY3YgcmVhZHlcIiwgZGF0YSk7XG4gICAgY29uc3QgcGxheWVyU2xvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEubmFtZSk7XG4gICAgaWYgKHBsYXllclNsb3QpIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IHBsYXllclNsb3QucXVlcnlTZWxlY3RvcihcIi5zdGF0dXNcIik7XG4gICAgICBpZiAoZGF0YS5yZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIlJlYWR5XCI7XG4gICAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSBcInN0YXR1cyByZWFkeVwiO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLnJlYWR5ID09PSBmYWxzZSkge1xuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIk5vdCBSZWFkeVwiO1xuICAgICAgICBzdGF0dXMuY2xhc3NOYW1lID0gXCJzdGF0dXMgbm90LXJlYWR5XCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuLy8gSWYgdGQgaXMgbm90IGZvdW5kLCByZWRpcmVjdHMgdG8gYW5vdGhlciBwYXJ0eVxuc29ja2V0Lm9uKFwicm9vbS1kZWxldGVkXCIsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uID0gXCIvXCI7XG59KTtcblxuLy8gT24gbWF0Y2htYWtpbmdcbnNvY2tldC5vbihcIm1hdGNobWFraW5nXCIsIChkYXRhKSA9PiB7XG4gIGlmIChwYXJ0eUlkID09PSBkYXRhLnBhcnR5SWQpIHtcbiAgICBwdHlkYmcoXCJyZWN2IG1hdGNobWFraW5nXCIsIGRhdGEpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJtYXRjaG1ha2luZ01lbWJlcnNcIiwgZGF0YS5tZW1iZXJzKTsgLy8gU2V0cyBzZXNzaW9uIHN0b3JhZ2Ugb2YgbWVtYmVycyBzbyB0aGF0IHRoZSBtYXRjaG1ha2luZyBzY3JlZW4gY2FuIGRpc3BsYXkgaXRcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibWVtYmVyc1RvRmluZFwiLCBkYXRhLm1lbWJlcnNUb0ZpbmQpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9tYXRjaG1ha2luZy8ke2RhdGEucGFydHlJZH1gOyAvLyBSZWRpcmVjdHMgdG8gbWF0Y2htYWtpbmcgZm9yIHBhcnR5XG4gIH1cbn0pO1xuXG4vLyBPbiBnYW1lIHN0YXJ0XG5zb2NrZXQub24oXCJnYW1lLXN0YXJ0ZWRcIiwgKGRhdGEpID0+IHtcbiAgaWYgKHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xuICAgIHB0eWRiZyhcInJlY3YgZ2FtZS1zdGFydGVkXCIsIHtcbiAgICAgIGdhbWVJZDogZGF0YS5nYW1lSWQsXG4gICAgICBwYXJ0eU1lbWJlcnM6IGRhdGEucGFydHlNZW1iZXJzLFxuICAgICAgbWFwOiBkYXRhLm1hcCxcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IHRlYW0gaW4gZGF0YS5nYW1lRGF0YSkge1xuICAgICAgLy8gRm9yIGVhY2ggdGVhbSBpbiB0aGUgZ2FtZVxuICAgICAgZm9yIChjb25zdCBwbGF5ZXJLZXkgaW4gZGF0YS5nYW1lRGF0YVt0ZWFtXSkge1xuICAgICAgICAvLyBGb3IgZWFjaCBwbGF5ZXIgaW4gdGhlIHRlYW1cbiAgICAgICAgY29uc3QgcGxheWVyID0gZGF0YS5nYW1lRGF0YVt0ZWFtXVtwbGF5ZXJLZXldO1xuICAgICAgICBpZiAocGxheWVyW1wibmFtZVwiXSA9PT0gZ2V0Q29va2llKFwibmFtZVwiKSkge1xuICAgICAgICAgIC8vIFNldCBzZXNzaW9uIHN0b3JhZ2UgZGF0YVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjaGFyYWN0ZXJcIiwgcGxheWVyW1wiY2hhcmFjdGVyXCJdKTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwic3Bhd25QbGF0Zm9ybVwiLCBwbGF5ZXJbXCJzcGF3blBsYXRmb3JtXCJdKTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwic3Bhd25cIiwgcGxheWVyW1wic3Bhd25cIl0pO1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJwYXJ0eVwiLCBkYXRhLnBhcnR5SWQpO1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJwYXJ0eU1lbWJlcnNcIiwgZGF0YS5wYXJ0eU1lbWJlcnMpO1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJtYXBcIiwgZGF0YS5tYXApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGAvZ2FtZS8ke2RhdGEuZ2FtZUlkfWA7XG4gICAgcHR5ZGJnKFwibmF2aWdhdGUgZ2FtZVwiLCB7IGdhbWVJZDogZGF0YS5nYW1lSWQgfSk7XG4gIH1cbn0pO1xuXG4vLyBPbiB1c2VyIGRpc2Nvbm5lY3RcbnNvY2tldC5vbihcInVzZXItZGlzY29ubmVjdGVkXCIsIChkYXRhKSA9PiB7XG4gIGlmIChkYXRhLnBhcnR5SWQgPT09IHBhcnR5SWQpIHtcbiAgICBwdHlkYmcoXCJyZWN2IHVzZXItZGlzY29ubmVjdGVkXCIsIGRhdGEpO1xuICAgIGNvbnN0IHVzZXJTbG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hhcmFjdGVyLXNsb3RcIik7IC8vIEZpbmQgYWxsIHNsb3RzXG4gICAgbGV0IHVzZXJTbG90O1xuXG4gICAgdXNlclNsb3RzLmZvckVhY2goKHNsb3QpID0+IHtcbiAgICAgIC8vIEZvciBlYWNoIHNsb3RcbiAgICAgIGNvbnN0IHVzZXJuYW1lRWxlbWVudCA9IHNsb3QucXVlcnlTZWxlY3RvcihcIi51c2VybmFtZVwiKTtcbiAgICAgIC8vIElmIHRoZSBuYW1lIG9mIHRoZSBzbG90IG1hdGNoZXMgdGhlIG5hbWUgb2YgdGhlIHVzZXIgd2hvIGRpc2Nvbm5lY3RlZCBpdCBzZXRzIGl0IHRvIGEgcmFuZG9tXG4gICAgICBpZiAodXNlcm5hbWVFbGVtZW50LnRleHRDb250ZW50ID09PSBkYXRhLm5hbWUpIHtcbiAgICAgICAgdXNlclNsb3QgPSBzbG90OyAvLyBTZXRzIHRoZSB2YXJpYWJsZSB1c2VyU2xvdCB0byB0aGUgYWN0dWFsIHNsb3RcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgYSBzbG90IGV4aXN0cywgcmVzZXQgaXQgYmFjayB0byByYW5kb21cbiAgICBpZiAodXNlclNsb3QpIHtcbiAgICAgIHVwZGF0ZUNoYXJhY3RlclNsb3QodXNlclNsb3QsIFwiUmFuZG9tXCIsIFwiUmFuZG9tXCIsIFwiSW52aXRlXCIsIHRydWUpO1xuXG4gICAgICBjb25zdCByZWFkeSA9IHVzZXJTbG90LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHVzXCIpO1xuICAgICAgcmVhZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAocmVhZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW52aXRlXCIpKSB7XG4gICAgICAgICAgY29weUludml0ZVNpbXBsZSgpO1xuICAgICAgICAgIHJlYWR5LnRleHRDb250ZW50ID0gXCJDb3BpZWQhXCI7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZWFkeS50ZXh0Q29udGVudCA9IFwiSW52aXRlXCI7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB1c2VyU2xvdC5pZCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgcmVtb3ZlIHVzZXJcIik7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0Q29va2llKGNvb2tpZU5hbWUpIHtcbiAgY29uc3QgbmFtZSA9IGNvb2tpZU5hbWUgKyBcIj1cIjtcbiAgY29uc3QgZGVjb2RlZENvb2tpZSA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO1xuICBjb25zdCBhcnJheSA9IGRlY29kZWRDb29raWUuc3BsaXQoXCI7XCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNvb2tpZSA9IGFycmF5W2ldLnRyaW0oKTtcbiAgICBpZiAoY29va2llLmluZGV4T2YobmFtZSkgPT09IDApIHtcbiAgICAgIHJldHVybiBjb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG4iXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJwdHlkYmciLCJsYWJlbCIsImRhdGEiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiY29uY2F0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZSIsInBhcnR5SWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiY2hhcmFjdGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm1vZGUiLCJtYXAiLCJyZWFkeUJ0biIsInJlYWR5Iiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwicG9wIiwidXNlcm5hbWUiLCJnZXRDb29raWUiLCJlbWl0IiwibmFtZSIsImhyZWYiLCJ0ZXh0Q29udGVudCIsInNldExvYmJ5QmFja2dyb3VuZCIsIm1hcFZhbHVlIiwidiIsIlN0cmluZyIsImJvZHkiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImNoZWNrTW9kZVZhbHVlIiwidmFsdWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsb3QiLCJwbGF0Zm9ybSIsInBhcmVudEVsZW1lbnQiLCJ0ZWFtIiwiZ2V0QXR0cmlidXRlIiwic2V0dXBEcmFnQW5kRHJvcCIsInBhcnR5IiwicG9wdXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwicGFydHlDZW50ZXJYIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwicGFydHlZIiwib2Zmc2V0VG9wIiwibGVmdCIsInRvcCIsImFwcGVuZENoaWxkIiwicmVtb3ZlIiwiY29weUludml0ZSIsInNldFRpbWVvdXQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0b3IiLCJjbGlwYm9hcmQiLCJ3cml0ZVRleHQiLCJ0aGVuIiwiZXJyb3IiLCJjb3B5SW52aXRlU2ltcGxlIiwibGVhdmUiLCJzaWduT3V0IiwiY29va2llIiwieW91clRlYW0iLCJvcFRlYW0iLCJsb2JieUFyZWEiLCJ5b3VyUGxhdGZvcm1zIiwib3BQbGF0Zm9ybXMiLCJ0YXJnZXRDb3VudCIsImkiLCJjcmVhdGVQbGF0Zm9ybSIsInNsb3ROdW1iZXIiLCJzZXRBdHRyaWJ1dGUiLCJjaGFyYWN0ZXJTbG90IiwiaWQiLCJzcHJpdGUiLCJzcmMiLCJhbHQiLCJzdGF0dXMiLCJjdXJzb3IiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBsYXRmb3JtSW1hZ2UiLCJkcmFnZ2FibGUiLCJxdWVyeVNlbGVjdG9yIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInJlcGxhY2UiLCJhZGQiLCJkcmFnSW1hZ2UiLCJjbG9uZU5vZGUiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwic2V0RHJhZ0ltYWdlIiwicmVtb3ZlQ2hpbGQiLCJwcmV2ZW50RGVmYXVsdCIsInJlbGF0ZWRUYXJnZXQiLCJnZXREYXRhIiwiX2RhdGEkc3BsaXQiLCJfZGF0YSRzcGxpdDIiLCJfc2xpY2VkVG9BcnJheSIsInNvdXJjZVNsb3QiLCJBcnJheSIsImZyb20iLCJmaW5kIiwiaW5jbHVkZXMiLCJzd2FwQ2hhcmFjdGVyU2xvdHMiLCJ0ZWFtTmFtZSIsInRlbXBOYW1lIiwiYWxsU2xvdHMiLCJzbG90SW5kZXgiLCJpbmRleE9mIiwiY291bnQiLCJ0YXJnZXRTbG90IiwiZHJhZ2dlZE5hbWUiLCJkcmFnZ2VkQ2hhcmFjdGVyIiwiZHJhZ2dlZFJlYWR5IiwidGFyZ2V0VXNlcm5hbWUiLCJ0YXJnZXRTcHJpdGUiLCJ0YXJnZXRTdGF0dXMiLCJ1cGRhdGVDaGFyYWN0ZXJTbG90IiwiaXNSYW5kb20iLCJzdGF0dXNFbCIsInVwZGF0ZVBlb3BsZSIsImFsbENoYXJhY3RlclNsb3RzIiwiY29uZGl0aW9uTWV0IiwidHJpbSIsInVzZXJuYW1lRWxlbWVudCIsInNlbGVjdGVkVmFsdWUiLCJ0YXJnZXQiLCJwcmV2aW91c01vZGVWYWx1ZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsImpzb24iLCJOdW1iZXIiLCJtZW1iZXJzQ291bnQiLCJwb3NpdGlvbiIsImNvbG9yIiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsIm1lbWJlcnMiLCJtZXNzYWdlIiwib24iLCJwYXJ0eU1lbWJlcnMiLCJtZW1iZXIiLCJyZWFkeVRleHQiLCJ1c2VyIiwiaW1nIiwidXNlcktleSIsImltZ0VsZW1lbnQiLCJzdGF0dXNFbGVtZW50IiwicHJldmlvdXNTbG90IiwicGxheWVyU2xvdCIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIm1lbWJlcnNUb0ZpbmQiLCJnYW1lSWQiLCJnYW1lRGF0YSIsInBsYXllcktleSIsInBsYXllciIsInVzZXJTbG90cyIsInVzZXJTbG90IiwiY29va2llTmFtZSIsImRlY29kZWRDb29raWUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJhcnJheSIsInN1YnN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=