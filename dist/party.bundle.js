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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxDQUFDLEVBQUU7TUFDOUIsT0FBTzhDLE1BQU0sQ0FBQzZHLFNBQVMsQ0FBQzNKLElBQUksQ0FBQzFCLE1BQU0sQ0FBQztJQUN0QztFQUNGO0VBQ0EsT0FBTyxFQUFFO0FBQ1gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvcGFydHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFydHkuanNcclxuXHJcbmNvbnN0IHNvY2tldCA9IGlvKFwiL1wiKTtcclxuZnVuY3Rpb24gcHR5ZGJnKGxhYmVsLCBkYXRhID0ge30pIHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coYFtQQVJUWV1bJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9XSAke2xhYmVsfWAsIGRhdGEpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGBbUEFSVFldICR7bGFiZWx9YCk7XHJcbiAgfVxyXG59XHJcbnB0eWRiZyhcInBhcnR5IHBhZ2UgbG9hZFwiLCB7IHBhcnR5SWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSB9KTtcclxuXHJcbi8vIERvY3VtZW50IFZhcmlhYmxlc1xyXG5jb25zdCBjaGFyYWN0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3RlclwiKTtcclxuY29uc3QgbW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKTtcclxuY29uc3QgbWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIik7XHJcbmNvbnN0IHJlYWR5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWFkeVwiKTtcclxuXHJcbmxldCByZWFkeSA9IGZhbHNlO1xyXG5cclxuLy8gUGFydHkgaWQgdmFyaWFibGVcclxuY29uc3QgcGFydHlJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIikuZmlsdGVyKEJvb2xlYW4pLnBvcCgpO1xyXG4vLyBVc2VybmFtZSB2YXJpYWJsZVxyXG5sZXQgdXNlcm5hbWUgPSBnZXRDb29raWUoXCJuYW1lXCIpO1xyXG5cclxuaWYgKHVzZXJuYW1lKSB7XHJcbiAgLy8gRW1pdHMgdXNlci1qb2luZWQgdG8gb3RoZXIgcGxheWVyc1xyXG4gIHNvY2tldC5lbWl0KFwidXNlci1qb2luZWRcIiwgeyBuYW1lOiB1c2VybmFtZSwgcGFydHlJZCB9KTtcclxuICBwdHlkYmcoXCJlbWl0IHVzZXItam9pbmVkXCIsIHsgdXNlcm5hbWUsIHBhcnR5SWQgfSk7XHJcbn0gZWxzZSB7XHJcbiAgLy8gSWYgdGhlIHVzZXJuYW1lIGRvZXMgbm90IGV4aXN0LCBwbGF5ZXIgaXMgcmVkaXJlY3RlZCB0byB3ZWxjb21lIHNjcmVlblxyXG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvd2VsY29tZVwiO1xyXG59XHJcblxyXG4vLyBTZXRzIHVzZXJuYW1lIHRleHQgdG8gdGhlIHVzZXJuYW1lXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWUtdGV4dFwiKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lO1xyXG5cclxuLy8gSGVscGVyIHRvIHNldCBsb2JieSBiYWNrZ3JvdW5kIGJhc2VkIG9uIG1hcCB2YWx1ZVxyXG5mdW5jdGlvbiBzZXRMb2JieUJhY2tncm91bmQobWFwVmFsdWUpIHtcclxuICBjb25zdCB2ID0gU3RyaW5nKG1hcFZhbHVlKTtcclxuICBpZiAodiA9PT0gXCIyXCIpIHtcclxuICAgIC8vIE1hbmdyb3ZlIE1lYWRvd1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiL2Fzc2V0cy9iZzMuanBnXCIpJztcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gRGVmYXVsdCBtYXBcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIi9hc3NldHMvYmcyLmpwZ1wiKSc7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXplIHRoZSBsb2JieSB3aXRoIGluaXRpYWwgcGxhdGZvcm0gc2V0dXBcclxuY2hlY2tNb2RlVmFsdWUoKTtcclxuXHJcbi8vIFNldCBpbml0aWFsIGJhY2tncm91bmQgYmFzZWQgb24gY3VycmVudCBzZWxlY3QgdmFsdWVcclxuc2V0TG9iYnlCYWNrZ3JvdW5kKG1hcC52YWx1ZSk7XHJcblxyXG4vLyBTZXQgdXAgZHJhZyBhbmQgZHJvcCBmb3IgaW5pdGlhbCBzbG90c1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoYXJhY3Rlci1zbG90XCIpLmZvckVhY2goKHNsb3QpID0+IHtcclxuICBjb25zdCBwbGF0Zm9ybSA9IHNsb3QucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZWFtID0gcGxhdGZvcm0uZ2V0QXR0cmlidXRlKFwiZGF0YS10ZWFtXCIpO1xyXG4gIHNldHVwRHJhZ0FuZERyb3Aoc2xvdCwgdGVhbSk7XHJcbn0pO1xyXG5cclxuY29uc3QgcGFydHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcnR5XCIpO1xyXG5cclxuLy8gUG9wdXAgdG8gY29weSBpZCB0byBjbGlwYm9hcmRcclxubGV0IHBvcHVwO1xyXG4vLyBNb3VzZSBob3ZlclxyXG5wYXJ0eS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudCkgPT4ge1xyXG4gIHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgLy8gQ3JlYXRlcyBwb3B1cFxyXG4gIHBvcHVwLmNsYXNzTmFtZSA9IFwicGFydHktcG9wdXBcIjtcclxuXHJcbiAgcG9wdXAudGV4dENvbnRlbnQgPSBgJHt3aW5kb3cubG9jYXRpb24uaHJlZn1gOyAvLyBTZXRzIHRleHQgdG8gdGhlIHVybCBvZiB0aGUgd2luZG93XHJcblxyXG4gIGNvbnN0IHBhcnR5Q2VudGVyWCA9IHBhcnR5Lm9mZnNldExlZnQgKyBwYXJ0eS5vZmZzZXRXaWR0aCAvIDIgLSAxNTA7XHJcbiAgY29uc3QgcGFydHlZID0gcGFydHkub2Zmc2V0VG9wO1xyXG5cclxuICBwb3B1cC5zdHlsZS5sZWZ0ID0gcGFydHlDZW50ZXJYICsgXCJweFwiO1xyXG4gIHBvcHVwLnN0eWxlLnRvcCA9IHBhcnR5WSArIDU1ICsgXCJweFwiOyAvLyBMb3dlciBwb3NpdGlvblxyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwKTtcclxufSk7XHJcblxyXG5wYXJ0eS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgaWYgKHBvcHVwKSB7XHJcbiAgICBwb3B1cC5yZW1vdmUoKTtcclxuICB9XHJcbn0pO1xyXG5cclxucGFydHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gIGlmIChwb3B1cCkge1xyXG4gICAgY29weUludml0ZShwb3B1cCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgLy8gUmVtb3ZlcyBjbGlja2VkIHRleHQgYWZ0ZXIgMiBzZWNvbmRzXHJcbiAgICAgIGlmIChwb3B1cCkge1xyXG4gICAgICAgIHBvcHVwLnRleHRDb250ZW50ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMkYyRjJGXCI7XHJcbiAgICAgIH1cclxuICAgIH0sIDIwMDApO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBjb3B5SW52aXRlKHBvcHVwKSB7XHJcbiAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQgJiYgcG9wdXApIHtcclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmRcclxuICAgICAgLndyaXRlVGV4dCh3aW5kb3cubG9jYXRpb24uaHJlZikgLy8gV3JpdGVzIHdpbmRvdyBVUkwgdG8gY2xpcGJvYXJkXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBwb3B1cC50ZXh0Q29udGVudCA9IFwiQ29waWVkIVwiO1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY29weSB0ZXh0OiBcIiwgZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvcHlJbnZpdGVTaW1wbGUoKSB7XHJcbiAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmRcclxuICAgICAgLndyaXRlVGV4dCh3aW5kb3cubG9jYXRpb24uaHJlZikgLy8gV3JpdGVzIHdpbmRvdyBVUkwgdG8gY2xpcGJvYXJkXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkludml0ZSBsaW5rIGNvcGllZCB0byBjbGlwYm9hcmRcIik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNvcHkgdGV4dDogXCIsIGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUYWtlcyB1c2VyIHRvIGRpZmZlcmVudCBwYXJ0eSBpZiB0aGV5IGxlYXZlXHJcbmNvbnN0IGxlYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWF2ZVwiKTtcclxubGVhdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XHJcbn0pO1xyXG5cclxuY29uc3Qgc2lnbk91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbi1vdXRcIik7XHJcbnNpZ25PdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gIC8vIFNldHMgY29va2llIGV4cGlyYXRpb24gdG8gdGhlIHBhc3QgdG8gZGVsZXRlIGl0XHJcbiAgZG9jdW1lbnQuY29va2llID1cclxuICAgIFwibmFtZVwiICsgXCI9OyBleHBpcmVzPU1vbiwgMDUgTWF5IDIwMTkgMDA6MDA6MDAgVVRDOyBwYXRoPS87XCI7XHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi93ZWxjb21lXCI7IC8vIFJlZGlyZWN0cyB1c2VyIHRvIHdlbGNvbWUgc2NyZWVuXHJcbn0pO1xyXG5cclxuY29uc3QgeW91clRlYW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYmJ5LWFyZWFcIik7XHJcbmNvbnN0IG9wVGVhbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9iYnktYXJlYVwiKTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrTW9kZVZhbHVlKCkge1xyXG4gIGNvbnN0IGxvYmJ5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9iYnktYXJlYVwiKTtcclxuXHJcbiAgLy8gR2V0IGFsbCBleGlzdGluZyBwbGF0Zm9ybXNcclxuICBjb25zdCB5b3VyUGxhdGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICcucGxhdGZvcm1bZGF0YS10ZWFtPVwieW91ci10ZWFtXCJdJ1xyXG4gICk7XHJcbiAgY29uc3Qgb3BQbGF0Zm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgJy5wbGF0Zm9ybVtkYXRhLXRlYW09XCJvcC10ZWFtXCJdJ1xyXG4gICk7XHJcblxyXG4gIGxldCB0YXJnZXRDb3VudDtcclxuICBzd2l0Y2ggKG1vZGUudmFsdWUpIHtcclxuICAgIGNhc2UgXCIxXCI6XHJcbiAgICAgIHRhcmdldENvdW50ID0gMTtcclxuICAgICAgbG9iYnlBcmVhLmNsYXNzTmFtZSA9IFwibW9kZS0xXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIjJcIjpcclxuICAgICAgdGFyZ2V0Q291bnQgPSAyO1xyXG4gICAgICBsb2JieUFyZWEuY2xhc3NOYW1lID0gXCJtb2RlLTJcIjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiM1wiOlxyXG4gICAgICB0YXJnZXRDb3VudCA9IDM7XHJcbiAgICAgIGxvYmJ5QXJlYS5jbGFzc05hbWUgPSBcIm1vZGUtM1wiO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRhcmdldENvdW50ID0gMTtcclxuICAgICAgbG9iYnlBcmVhLmNsYXNzTmFtZSA9IFwibW9kZS0xXCI7XHJcbiAgfVxyXG5cclxuICAvLyBSZW1vdmUgZXh0cmEgcGxhdGZvcm1zIGlmIG5lZWRlZFxyXG4gIGlmICh5b3VyUGxhdGZvcm1zLmxlbmd0aCA+IHRhcmdldENvdW50KSB7XHJcbiAgICBmb3IgKGxldCBpID0geW91clBsYXRmb3Jtcy5sZW5ndGggLSAxOyBpID49IHRhcmdldENvdW50OyBpLS0pIHtcclxuICAgICAgeW91clBsYXRmb3Jtc1tpXS5yZW1vdmUoKTtcclxuICAgICAgb3BQbGF0Zm9ybXNbaV0ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgcGxhdGZvcm1zIGlmIG5lZWRlZFxyXG4gIGlmICh5b3VyUGxhdGZvcm1zLmxlbmd0aCA8IHRhcmdldENvdW50KSB7XHJcbiAgICBmb3IgKGxldCBpID0geW91clBsYXRmb3Jtcy5sZW5ndGggKyAxOyBpIDw9IHRhcmdldENvdW50OyBpKyspIHtcclxuICAgICAgY3JlYXRlUGxhdGZvcm0oXCJ5b3VyLXRlYW1cIiwgaSk7XHJcbiAgICAgIGNyZWF0ZVBsYXRmb3JtKFwib3AtdGVhbVwiLCBpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtKHRlYW0sIHNsb3ROdW1iZXIpIHtcclxuICBjb25zdCBsb2JieUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYmJ5LWFyZWFcIik7XHJcblxyXG4gIC8vIENyZWF0ZSBwbGF0Zm9ybVxyXG4gIGNvbnN0IHBsYXRmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwbGF0Zm9ybS5jbGFzc05hbWUgPSBgcGxhdGZvcm0gJHt0ZWFtfS0ke3Nsb3ROdW1iZXJ9YDtcclxuICBwbGF0Zm9ybS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRlYW1cIiwgdGVhbSk7XHJcbiAgcGxhdGZvcm0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbG90XCIsIHNsb3ROdW1iZXIpO1xyXG5cclxuICAvLyBDcmVhdGUgY2hhcmFjdGVyIHNsb3RcclxuICBjb25zdCBjaGFyYWN0ZXJTbG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjaGFyYWN0ZXJTbG90LmNsYXNzTmFtZSA9IFwiY2hhcmFjdGVyLXNsb3QgZW1wdHlcIjtcclxuICBjaGFyYWN0ZXJTbG90LmlkID0gYCR7XHJcbiAgICB0ZWFtID09PSBcInlvdXItdGVhbVwiID8gXCJ5b3VyXCIgOiBcIm9wXCJcclxuICB9LXNsb3QtJHtzbG90TnVtYmVyfWA7XHJcblxyXG4gIC8vIENyZWF0ZSB1c2VybmFtZSBlbGVtZW50XHJcbiAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHVzZXJuYW1lLmNsYXNzTmFtZSA9IHRlYW0gPT09IFwib3AtdGVhbVwiID8gXCJ1c2VybmFtZSBvcC1wbGF5ZXJcIiA6IFwidXNlcm5hbWVcIjtcclxuICB1c2VybmFtZS50ZXh0Q29udGVudCA9IFwiUmFuZG9tXCI7XHJcblxyXG4gIC8vIENyZWF0ZSBjaGFyYWN0ZXIgc3ByaXRlXHJcbiAgY29uc3Qgc3ByaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICBzcHJpdGUuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc3ByaXRlIHJhbmRvbVwiO1xyXG4gIHNwcml0ZS5zcmMgPSBcIi9hc3NldHMvcmFuZG9tLnBuZ1wiO1xyXG4gIHNwcml0ZS5hbHQgPSBcIlJhbmRvbVwiO1xyXG5cclxuICAvLyBDcmVhdGUgc3RhdHVzIGVsZW1lbnRcclxuICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHN0YXR1cy5jbGFzc05hbWUgPSBcInN0YXR1cyBpbnZpdGVcIjtcclxuICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIkludml0ZVwiO1xyXG4gIHN0YXR1cy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuXHJcbiAgLy8gQWRkIGludml0ZSBjbGljayBmdW5jdGlvbmFsaXR5XHJcbiAgc3RhdHVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChzdGF0dXMuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW52aXRlXCIpKSB7XHJcbiAgICAgIGNvcHlJbnZpdGVTaW1wbGUoKTtcclxuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gXCJDb3BpZWQhXCI7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IFwiSW52aXRlXCI7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBBc3NlbWJsZSB0aGUgc3RydWN0dXJlXHJcbiAgY2hhcmFjdGVyU2xvdC5hcHBlbmRDaGlsZCh1c2VybmFtZSk7XHJcbiAgY2hhcmFjdGVyU2xvdC5hcHBlbmRDaGlsZChzcHJpdGUpO1xyXG4gIGNoYXJhY3RlclNsb3QuYXBwZW5kQ2hpbGQoc3RhdHVzKTtcclxuICBwbGF0Zm9ybS5hcHBlbmRDaGlsZChjaGFyYWN0ZXJTbG90KTtcclxuICAvLyBBZGQgcGxhdGZvcm0gaW1hZ2UgdW5kZXIgdGhlIGNoYXJhY3RlciBzbG90IHNvIGl0IHN0YWNrcyB2ZXJ0aWNhbGx5XHJcbiAgY29uc3QgcGxhdGZvcm1JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcGxhdGZvcm1JbWFnZS5jbGFzc05hbWUgPSBcInBsYXRmb3JtLWltYWdlXCI7XHJcbiAgcGxhdGZvcm0uYXBwZW5kQ2hpbGQocGxhdGZvcm1JbWFnZSk7XHJcblxyXG4gIC8vIEFkZCBkcmFnIGFuZCBkcm9wIGZ1bmN0aW9uYWxpdHlcclxuICBzZXR1cERyYWdBbmREcm9wKGNoYXJhY3RlclNsb3QsIHRlYW0pO1xyXG5cclxuICBsb2JieUFyZWEuYXBwZW5kQ2hpbGQocGxhdGZvcm0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cERyYWdBbmREcm9wKGNoYXJhY3RlclNsb3QsIHRlYW0pIHtcclxuICAvLyBNYWtlIGRyYWdnYWJsZVxyXG4gIGNoYXJhY3RlclNsb3QuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuXHJcbiAgY2hhcmFjdGVyU2xvdC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBjaGFyYWN0ZXJTbG90LnF1ZXJ5U2VsZWN0b3IoXCIudXNlcm5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSBcIk5pbmphXCI7IC8vIERlZmF1bHQgZm9yIG5vd1xyXG4gICAgY29uc3Qgc3RhdHVzID0gY2hhcmFjdGVyU2xvdC5xdWVyeVNlbGVjdG9yKFwiLnN0YXR1c1wiKS50ZXh0Q29udGVudDtcclxuXHJcbiAgICBpZiAodXNlcm5hbWUgIT09IFwiUmFuZG9tXCIpIHtcclxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXHJcbiAgICAgICAgXCJ0ZXh0L3BsYWluXCIsXHJcbiAgICAgICAgYCR7dXNlcm5hbWUucmVwbGFjZShcIiAoWW91KVwiLCBcIlwiKX0sJHtjaGFyYWN0ZXJ9LCR7c3RhdHVzfWBcclxuICAgICAgKTtcclxuICAgICAgY2hhcmFjdGVyU2xvdC5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XHJcblxyXG4gICAgICAvLyBDcmVhdGUgYSBjdXN0b20gZHJhZyBpbWFnZSB0aGF0J3Mgc21hbGxlclxyXG4gICAgICBjb25zdCBkcmFnSW1hZ2UgPSBjaGFyYWN0ZXJTbG90LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgZHJhZ0ltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoMC44KVwiO1xyXG4gICAgICBkcmFnSW1hZ2Uuc3R5bGUub3BhY2l0eSA9IFwiMC44XCI7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ0ltYWdlKTtcclxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShkcmFnSW1hZ2UsIDMwLCAzMCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkcmFnSW1hZ2UpLCAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNoYXJhY3RlclNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgKCkgPT4ge1xyXG4gICAgY2hhcmFjdGVyU2xvdC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XHJcbiAgfSk7XHJcblxyXG4gIC8vIERyb3Agem9uZSBmdW5jdGlvbmFsaXR5XHJcbiAgY2hhcmFjdGVyU2xvdC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9KTtcclxuXHJcbiAgY2hhcmFjdGVyU2xvdC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY2hhcmFjdGVyU2xvdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkcmFnLW92ZXJcIik7XHJcbiAgfSk7XHJcblxyXG4gIGNoYXJhY3RlclNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyBPbmx5IHJlbW92ZSBpZiB3ZSdyZSBhY3R1YWxseSBsZWF2aW5nIHRoZSBlbGVtZW50XHJcbiAgICBpZiAoIWNoYXJhY3RlclNsb3QuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcclxuICAgICAgY2hhcmFjdGVyU2xvdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnLW92ZXJcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNoYXJhY3RlclNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY2hhcmFjdGVyU2xvdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnLW92ZXJcIik7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcclxuICAgIGlmICghZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IFtuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5XSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIHNvdXJjZSBzbG90XHJcbiAgICBjb25zdCBzb3VyY2VTbG90ID1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSkgfHxcclxuICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoYXJhY3Rlci1zbG90XCIpKS5maW5kKChzbG90KSA9PlxyXG4gICAgICAgIHNsb3QucXVlcnlTZWxlY3RvcihcIi51c2VybmFtZVwiKS50ZXh0Q29udGVudC5pbmNsdWRlcyhuYW1lKVxyXG4gICAgICApO1xyXG5cclxuICAgIGlmIChzb3VyY2VTbG90ICYmIHNvdXJjZVNsb3QgIT09IGNoYXJhY3RlclNsb3QpIHtcclxuICAgICAgLy8gU3dhcCBjb250ZW50XHJcbiAgICAgIHN3YXBDaGFyYWN0ZXJTbG90cyhzb3VyY2VTbG90LCBjaGFyYWN0ZXJTbG90LCBuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5KTtcclxuXHJcbiAgICAgIC8vIEVtaXQgdGVhbSB1cGRhdGVcclxuICAgICAgY29uc3QgcGxhdGZvcm0gPSBjaGFyYWN0ZXJTbG90LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IHRlYW1OYW1lID0gcGxhdGZvcm0uZ2V0QXR0cmlidXRlKFwiZGF0YS10ZWFtXCIpO1xyXG4gICAgICBzb2NrZXQuZW1pdChcInRlYW0tdXBkYXRlXCIsIHtcclxuICAgICAgICB0ZW1wTmFtZTogbmFtZSxcclxuICAgICAgICBwYXJ0eUlkLFxyXG4gICAgICAgIHRlYW06IHRlYW1OYW1lLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEVtaXQgZHJvcCBldmVudFxyXG4gICAgICBjb25zdCBhbGxTbG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hhcmFjdGVyLXNsb3RcIik7XHJcbiAgICAgIGxldCBzbG90SW5kZXggPSBBcnJheS5mcm9tKGFsbFNsb3RzKS5pbmRleE9mKGNoYXJhY3RlclNsb3QpICsgMTtcclxuICAgICAgc29ja2V0LmVtaXQoXCJkcm9wXCIsIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGNoYXJhY3RlcixcclxuICAgICAgICByZWFkeSxcclxuICAgICAgICBjb3VudDogc2xvdEluZGV4LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3dhcENoYXJhY3RlclNsb3RzKFxyXG4gIHNvdXJjZVNsb3QsXHJcbiAgdGFyZ2V0U2xvdCxcclxuICBkcmFnZ2VkTmFtZSxcclxuICBkcmFnZ2VkQ2hhcmFjdGVyLFxyXG4gIGRyYWdnZWRSZWFkeVxyXG4pIHtcclxuICAvLyBHZXQgY3VycmVudCB0YXJnZXQgc2xvdCBjb250ZW50XHJcbiAgY29uc3QgdGFyZ2V0VXNlcm5hbWUgPSB0YXJnZXRTbG90LnF1ZXJ5U2VsZWN0b3IoXCIudXNlcm5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3ByaXRlID0gdGFyZ2V0U2xvdC5xdWVyeVNlbGVjdG9yKFwiLmNoYXJhY3Rlci1zcHJpdGVcIikuc3JjO1xyXG4gIGNvbnN0IHRhcmdldFN0YXR1cyA9IHRhcmdldFNsb3QucXVlcnlTZWxlY3RvcihcIi5zdGF0dXNcIikudGV4dENvbnRlbnQ7XHJcblxyXG4gIC8vIFVwZGF0ZSB0YXJnZXQgc2xvdCB3aXRoIGRyYWdnZWQgY29udGVudFxyXG4gIHVwZGF0ZUNoYXJhY3RlclNsb3QoXHJcbiAgICB0YXJnZXRTbG90LFxyXG4gICAgYCR7ZHJhZ2dlZE5hbWV9IChZb3UpYCxcclxuICAgIGRyYWdnZWRDaGFyYWN0ZXIsXHJcbiAgICBkcmFnZ2VkUmVhZHlcclxuICApO1xyXG5cclxuICAvLyBVcGRhdGUgc291cmNlIHNsb3Qgd2l0aCB0YXJnZXQgY29udGVudCAob3IgbWFrZSBpdCByYW5kb20gaWYgdGFyZ2V0IHdhcyByYW5kb20pXHJcbiAgaWYgKHRhcmdldFVzZXJuYW1lID09PSBcIlJhbmRvbVwiKSB7XHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJTbG90KHNvdXJjZVNsb3QsIFwiUmFuZG9tXCIsIFwiUmFuZG9tXCIsIFwiSW52aXRlXCIsIHRydWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJTbG90KHNvdXJjZVNsb3QsIHRhcmdldFVzZXJuYW1lLCBcIk5pbmphXCIsIHRhcmdldFN0YXR1cyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDaGFyYWN0ZXJTbG90KHNsb3QsIG5hbWUsIGNoYXJhY3Rlciwgc3RhdHVzLCBpc1JhbmRvbSA9IGZhbHNlKSB7XHJcbiAgY29uc3QgdXNlcm5hbWUgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoXCIudXNlcm5hbWVcIik7XHJcbiAgY29uc3Qgc3ByaXRlID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLmNoYXJhY3Rlci1zcHJpdGVcIik7XHJcbiAgY29uc3Qgc3RhdHVzRWwgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHVzXCIpO1xyXG5cclxuICB1c2VybmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgc2xvdC5pZCA9IG5hbWUgPT09IFwiUmFuZG9tXCIgPyBcIlwiIDogbmFtZS5yZXBsYWNlKFwiIChZb3UpXCIsIFwiXCIpO1xyXG5cclxuICBpZiAoaXNSYW5kb20gfHwgbmFtZSA9PT0gXCJSYW5kb21cIikge1xyXG4gICAgc3ByaXRlLnNyYyA9IFwiL2Fzc2V0cy9yYW5kb20ucG5nXCI7XHJcbiAgICBzcHJpdGUuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc3ByaXRlIHJhbmRvbVwiO1xyXG4gICAgc3RhdHVzRWwuY2xhc3NOYW1lID0gXCJzdGF0dXMgaW52aXRlXCI7XHJcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiSW52aXRlXCI7XHJcbiAgICBzdGF0dXNFbC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIHNsb3QuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc2xvdCBlbXB0eVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyID09PSBcIk5pbmphXCIpIHtcclxuICAgICAgc3ByaXRlLnNyYyA9IFwiL2Fzc2V0cy9uaW5qYUljb24ucG5nXCI7XHJcbiAgICB9XHJcbiAgICBzcHJpdGUuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc3ByaXRlXCI7XHJcblxyXG4gICAgLy8gVXBkYXRlIHN0YXR1cyBzdHlsaW5nXHJcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IHN0YXR1cztcclxuICAgIGlmIChzdGF0dXMgPT09IFwiUmVhZHlcIikge1xyXG4gICAgICBzdGF0dXNFbC5jbGFzc05hbWUgPSBcInN0YXR1cyByZWFkeVwiO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwiTm90IFJlYWR5XCIgfHwgc3RhdHVzID09PSBcIk5vdCByZWFkeVwiKSB7XHJcbiAgICAgIHN0YXR1c0VsLmNsYXNzTmFtZSA9IFwic3RhdHVzIG5vdC1yZWFkeVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBzbG90IHN0eWxpbmcgYmFzZWQgb24gdGVhbVxyXG4gICAgY29uc3QgcGxhdGZvcm0gPSBzbG90LnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAocGxhdGZvcm0uZ2V0QXR0cmlidXRlKFwiZGF0YS10ZWFtXCIpID09PSBcInlvdXItdGVhbVwiKSB7XHJcbiAgICAgIHNsb3QuY2xhc3NOYW1lID0gXCJjaGFyYWN0ZXItc2xvdCBwbGF5ZXItZGlzcGxheVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2xvdC5jbGFzc05hbWUgPSBcImNoYXJhY3Rlci1zbG90IG9wLWRpc3BsYXlcIjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVBlb3BsZShuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5KSB7XHJcbiAgY29uc3QgYWxsQ2hhcmFjdGVyU2xvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoYXJhY3Rlci1zbG90XCIpO1xyXG4gIGxldCBjb25kaXRpb25NZXQgPSBmYWxzZTtcclxuICBsZXQgdGVtcE5hbWUgPSBuYW1lO1xyXG4gIGlmIChuYW1lLmluY2x1ZGVzKFwiIChZb3UpXCIpKSB7XHJcbiAgICB0ZW1wTmFtZSA9IG5hbWUucmVwbGFjZShcIiAoWW91KVwiLCBcIlwiKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENoYXJhY3RlclNsb3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzbG90ID0gYWxsQ2hhcmFjdGVyU2xvdHNbaV07XHJcbiAgICBjb25zdCBwbGF0Zm9ybSA9IHNsb3QucGFyZW50RWxlbWVudDtcclxuICAgIGNvbnN0IHRlYW1OYW1lID0gcGxhdGZvcm0uZ2V0QXR0cmlidXRlKFwiZGF0YS10ZWFtXCIpO1xyXG5cclxuICAgIGlmIChzbG90LmNsYXNzTGlzdC5jb250YWlucyhcInBsYXllci1kaXNwbGF5XCIpIHx8IHRlYW1OYW1lID09PSBcInlvdXItdGVhbVwiKSB7XHJcbiAgICAgIHNvY2tldC5lbWl0KFwidGVhbS11cGRhdGVcIiwgeyB0ZW1wTmFtZSwgcGFydHlJZCwgdGVhbTogXCJ5b3VyLXRlYW1cIiB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNvY2tldC5lbWl0KFwidGVhbS11cGRhdGVcIiwgeyB0ZW1wTmFtZSwgcGFydHlJZCwgdGVhbTogXCJvcC10ZWFtXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlcm5hbWVFbGVtZW50ID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lXCIpO1xyXG4gICAgaWYgKHVzZXJuYW1lRWxlbWVudCAmJiB1c2VybmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPT09IFwiUmFuZG9tXCIpIHtcclxuICAgICAgdXBkYXRlQ2hhcmFjdGVyU2xvdChzbG90LCBuYW1lLCBjaGFyYWN0ZXIsIHJlYWR5KTtcclxuXHJcbiAgICAgIC8vIFNldCB1cCBkcmFnIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgc2xvdC5pZCA9IHRlbXBOYW1lO1xyXG4gICAgICBzbG90LmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAgIHNsb3QuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcclxuICAgICAgICAgIFwidGV4dC9wbGFpblwiLFxyXG4gICAgICAgICAgYCR7dGVtcE5hbWV9LCR7Y2hhcmFjdGVyfSwke3JlYWR5fWBcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbmRpdGlvbk1ldCA9IHRydWU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2hhcmFjdGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICBzb2NrZXQuZW1pdChcImNoYXJhY3Rlci1jaGFuZ2VcIiwgeyBzZWxlY3RlZFZhbHVlLCB1c2VybmFtZSwgcGFydHlJZCB9KTsgLy8gRW1pdHMgY2hhcmFjdGVyIGNoYW5nZVxyXG4gIHB0eWRiZyhcImVtaXQgY2hhcmFjdGVyLWNoYW5nZVwiLCB7IHNlbGVjdGVkVmFsdWUgfSk7XHJcbn0pO1xyXG5cclxubGV0IHByZXZpb3VzTW9kZVZhbHVlID0gbW9kZS52YWx1ZTtcclxubW9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICBwdHlkYmcoXCJtb2RlIGNsaWNrXCIsIHsgc2VsZWN0ZWRWYWx1ZSB9KTtcclxuICBmZXRjaChcIi9wYXJ0eS1tZW1iZXJzXCIsIHtcclxuICAgIC8vIEZldGNoZXMgcGFydHkgbWVtYmVycyBvbiBtb2RlIGNoYW5nZVxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBwYXJ0eUlkIH0pLFxyXG4gIH0pXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIGlmIChOdW1iZXIoc2VsZWN0ZWRWYWx1ZSkgKiAyIDwgZGF0YS5tZW1iZXJzQ291bnQpIHtcclxuICAgICAgICAvLyBDaGVja3MgaWYgdGhlIG51bWJlciBvZiBwbGF5ZXJzIGFyZSB0b28gbWFueSBmb3IgdGhlIG1vZGVcclxuICAgICAgICAvLyBDcmVhdGUgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgIGNvbnN0IGVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgZXJyb3Iuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgZXJyb3Iuc3R5bGUudG9wID0gXCI4MCVcIjtcclxuICAgICAgICBlcnJvci5zdHlsZS5sZWZ0ID0gXCI1MCVcIjtcclxuICAgICAgICBlcnJvci5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiO1xyXG4gICAgICAgIGVycm9yLnN0eWxlLmNvbG9yID0gXCIjZmY1MjUyXCI7XHJcbiAgICAgICAgZXJyb3Iuc3R5bGUucGFkZGluZyA9IFwiNXB4IDEwcHhcIjtcclxuICAgICAgICBlcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgZXJyb3Iuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcclxuICAgICAgICBlcnJvci5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCB3aGl0ZVwiO1xyXG4gICAgICAgIGVycm9yLnRleHRDb250ZW50ID1cclxuICAgICAgICAgIFwiVG9vIG1hbnkgcGxheWVycyBmb3IgdGhpcyBtb2RlISBQbGVhc2UgcmVtb3ZlIDEgb3IgbW9yZSBwbGF5ZXJzXCI7XHJcblxyXG4gICAgICAgIGVycm9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGVycm9yLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBlcnJvci5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDAwKTsgLy8gQXV0b21hdGljYWxseSByZW1vdmVzIGVycm9yIG1lc3NhZ2UgYWZ0ZXIgMiBzZWNvbmRzXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlcnJvcik7XHJcblxyXG4gICAgICAgIG1vZGUudmFsdWUgPSBwcmV2aW91c01vZGVWYWx1ZTsgLy8gU2V0cyBtb2RlIHZhbHVlIHRvIHByZXZpb3VzIG1vZGUgdmFsdWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzb2NrZXQuZW1pdChcIm1vZGUtY2hhbmdlXCIsIHtcclxuICAgICAgICAgIC8vIElmIHBsYXllcnMgYXJlIGZldyBlbm91Z2gsIGVtaXQgY2hhbmdlIHRvIG90aGVyc1xyXG4gICAgICAgICAgc2VsZWN0ZWRWYWx1ZSxcclxuICAgICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgICAgcGFydHlJZCxcclxuICAgICAgICAgIG1lbWJlcnM6IGRhdGEubWVtYmVycyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBwdHlkYmcoXCJlbWl0IG1vZGUtY2hhbmdlXCIsIHsgc2VsZWN0ZWRWYWx1ZSB9KTtcclxuICAgICAgICBwcmV2aW91c01vZGVWYWx1ZSA9IG1vZGUudmFsdWU7IC8vIFNldHMgcHJldmlvdXMgbW9kZSB2YWx1ZSB0byBjdXJyZW50IHZhbHVlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICBwdHlkYmcoXCJtb2RlIGNoYW5nZSBlcnJvclwiLCB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxubWFwLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICBzb2NrZXQuZW1pdChcIm1hcC1jaGFuZ2VcIiwgeyBzZWxlY3RlZFZhbHVlLCB1c2VybmFtZSwgcGFydHlJZCB9KTsgLy8gRW1pdHMgbWFwIGNoYW5nZVxyXG4gIHB0eWRiZyhcImVtaXQgbWFwLWNoYW5nZVwiLCB7IHNlbGVjdGVkVmFsdWUgfSk7XHJcbiAgLy8gVXBkYXRlIGxvYmJ5IGJhY2tncm91bmQgb24gbG9jYWwgY2hhbmdlXHJcbiAgc2V0TG9iYnlCYWNrZ3JvdW5kKHNlbGVjdGVkVmFsdWUpO1xyXG59KTtcclxuXHJcbnJlYWR5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICBpZiAocmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICByZWFkeSA9IHRydWU7XHJcbiAgICByZWFkeUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICByZWFkeUJ0bi52YWx1ZSA9IFwiQ2FuY2VsXCI7XHJcbiAgfSBlbHNlIGlmIChyZWFkeSA9PT0gdHJ1ZSkge1xyXG4gICAgcmVhZHkgPSBmYWxzZTtcclxuICAgIHJlYWR5QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XHJcbiAgICByZWFkeUJ0bi52YWx1ZSA9IFwiUmVhZHlcIjtcclxuICB9XHJcbiAgc29ja2V0LmVtaXQoXCJyZWFkeVwiLCB7IHVzZXJuYW1lLCByZWFkeSwgcGFydHlJZCwgbW9kZTogbW9kZS52YWx1ZSB9KTsgLy8gRW1pdHMgcmVhZHkgZXZlbnRcclxuICBwdHlkYmcoXCJlbWl0IHJlYWR5XCIsIHsgdXNlcm5hbWUsIHJlYWR5LCBwYXJ0eUlkLCBtb2RlOiBtb2RlLnZhbHVlIH0pO1xyXG59KTtcclxuXHJcbnNvY2tldC5vbihcImNvbm5lY3Rpb25cIiwgKGRhdGEpID0+IHtcclxuICBwdHlkYmcoXCJyZWN2IGNvbm5lY3Rpb25cIiwgeyBtZW1iZXJzOiBkYXRhLnBhcnR5TWVtYmVycy5sZW5ndGggLSAxIH0pO1xyXG4gIC8vIFBsYXllciBjb25uZWN0aW9uIG9ubHlcclxuICBkYXRhLnBhcnR5TWVtYmVycy5mb3JFYWNoKChtZW1iZXIpID0+IHtcclxuICAgIC8vIEdyYWJzIGV4aXN0aW5nIHBsYXllcnMgZnJvbSB0aGUgcGFydHlcclxuICAgIGlmIChtZW1iZXIubW9kZSAmJiBtZW1iZXIubWFwKSB7XHJcbiAgICAgIG1vZGUudmFsdWUgPSBtZW1iZXIubW9kZTtcclxuICAgICAgbWFwLnZhbHVlID0gbWVtYmVyLm1hcDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB0ZW1wTmFtZSA9IG1lbWJlci5uYW1lOyAvLyBUZW1wbmFtZSBpbmNsdWRlcyAoWW91KVxyXG4gICAgICBsZXQgY2hhcmFjdGVyID0gbWVtYmVyLmNoYXJhY3RlcjtcclxuICAgICAgaWYgKG1lbWJlci5uYW1lID09PSB1c2VybmFtZSkge1xyXG4gICAgICAgIHRlbXBOYW1lICs9IFwiIChZb3UpXCI7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHJlYWR5VGV4dDtcclxuICAgICAgaWYgKG1lbWJlci5yZWFkeSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJlYWR5VGV4dCA9IFwiUmVhZHlcIjtcclxuICAgICAgfSBlbHNlIGlmIChtZW1iZXIucmVhZHkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmVhZHlUZXh0ID0gXCJOb3QgcmVhZHlcIjtcclxuICAgICAgfVxyXG4gICAgICBjaGVja01vZGVWYWx1ZSgpOyAvLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBtb2RlIGFuZCBzZXRzIHVwIHRoZSB0ZCdzXHJcbiAgICAgIHVwZGF0ZVBlb3BsZSh0ZW1wTmFtZSwgY2hhcmFjdGVyLCByZWFkeVRleHQpOyAvLyBVcGRhdGVzIHRoZSBwbGF5ZXJzXHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuc29ja2V0Lm9uKFwidXNlci1qb2luZWRcIiwgKGRhdGEpID0+IHtcclxuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eUlkKSB7XHJcbiAgICB1cGRhdGVQZW9wbGUoZGF0YS5uYW1lLCBcIk5pbmphXCIsIFwiTm90IFJlYWR5XCIpO1xyXG4gICAgcHR5ZGJnKFwicmVjdiB1c2VyLWpvaW5lZFwiLCBkYXRhKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gT24gY2hhcmFjdGVyIGNoYW5nZVxyXG5zb2NrZXQub24oXCJjaGFyYWN0ZXItY2hhbmdlXCIsIChkYXRhKSA9PiB7XHJcbiAgaWYgKHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xyXG4gICAgcHR5ZGJnKFwicmVjdiBjaGFyYWN0ZXItY2hhbmdlXCIsIGRhdGEpO1xyXG4gICAgLy8gQ2hlY2sgaWYgcGFydHkgaXMgdGhlIHNhbWVcclxuICAgIGNvbnN0IHVzZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLnVzZXJuYW1lKTtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IHVzZXIucXVlcnlTZWxlY3RvcihcIi5jaGFyYWN0ZXItc3ByaXRlXCIpO1xyXG4gICAgICBpZiAoZGF0YS5jaGFyYWN0ZXIgPT09IFwiTmluamFcIikge1xyXG4gICAgICAgIGltZy5zcmMgPSBcIi9hc3NldHMvbmluamFJY29uLnBuZ1wiO1xyXG4gICAgICAgIGltZy5jbGFzc05hbWUgPSBcImNoYXJhY3Rlci1zcHJpdGVcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBPbiBtb2RlIGNoYW5nZVxyXG5zb2NrZXQub24oXCJtb2RlLWNoYW5nZVwiLCAoZGF0YSkgPT4ge1xyXG4gIGlmIChwYXJ0eUlkID09PSBkYXRhLnBhcnR5SWQpIHtcclxuICAgIHB0eWRiZyhcInJlY3YgbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBkYXRhLm1vZGUgfSk7XHJcbiAgICAvLyBDaGVjayBpZiBwYXJ0eSBpcyB0aGUgc2FtZVxyXG4gICAgbW9kZS52YWx1ZSA9IGRhdGEubW9kZTtcclxuICAgIGNoZWNrTW9kZVZhbHVlKCk7IC8vIENoZWNrcyBtb2RlIHZhbHVlIGFuZCBzZXRzIHVwIHRkJ3NcclxuXHJcbiAgICBjb25zdCBtZW1iZXJzID0gZGF0YS5tZW1iZXJzOyAvLyBHcmFicyBtZW1iZXIgZGF0YSBmcm9tIHNlcnZlclxyXG4gICAgZm9yIChjb25zdCB1c2VyS2V5IGluIG1lbWJlcnMpIHtcclxuICAgICAgaWYgKG1lbWJlcnNbdXNlcktleV1bXCJuYW1lXCJdKSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IG1lbWJlcnNbdXNlcktleV07XHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1c2VyW1wibmFtZVwiXSkpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gdXNlcltcIm5hbWVcIl07XHJcbiAgICAgICAgICBpZiAobmFtZSA9PT0gdXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgbmFtZSA9IGAke3VzZXJbXCJuYW1lXCJdfSAoWW91KWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsZXQgcmVhZHlUZXh0O1xyXG4gICAgICAgICAgaWYgKHVzZXJbXCJyZWFkeVwiXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZWFkeVRleHQgPSBcIlJlYWR5XCI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHVzZXJbXCJyZWFkeVwiXSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmVhZHlUZXh0ID0gXCJOb3QgUmVhZHlcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHVwZGF0ZVBlb3BsZShuYW1lLCB1c2VyW1wiY2hhcmFjdGVyXCJdLCByZWFkeVRleHQpOyAvLyBVcGRhdGVzIHRkJ3Mgd2l0aCBtZW1iZXIgZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBPbiBtYXAgY2hhbmdlXHJcbnNvY2tldC5vbihcIm1hcC1jaGFuZ2VcIiwgKGRhdGEpID0+IHtcclxuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eUlkKSB7XHJcbiAgICBtYXAudmFsdWUgPSBkYXRhLm1hcDtcclxuICAgIHB0eWRiZyhcInJlY3YgbWFwLWNoYW5nZVwiLCB7IG1hcDogZGF0YS5tYXAgfSk7XHJcbiAgICAvLyBTeW5jIGJhY2tncm91bmQgb24gcmVtb3RlIHVwZGF0ZXMgYXMgd2VsbFxyXG4gICAgc2V0TG9iYnlCYWNrZ3JvdW5kKGRhdGEubWFwKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gT24gZHJvcFxyXG5zb2NrZXQub24oXCJkcm9wXCIsIChkYXRhKSA9PiB7XHJcbiAgcHR5ZGJnKFwicmVjdiBkcm9wXCIsIGRhdGEpO1xyXG4gIGNvbnN0IGFsbFNsb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGFyYWN0ZXItc2xvdFwiKTtcclxuICBsZXQgY291bnQgPSAwO1xyXG4gIGFsbFNsb3RzLmZvckVhY2goKHNsb3QpID0+IHtcclxuICAgIC8vIEZpbmRzIGluZGV4IG9mIHNsb3RcclxuICAgIGNvdW50Kys7XHJcbiAgICBpZiAoY291bnQgPT09IGRhdGEuY291bnQpIHtcclxuICAgICAgLy8gSWYgdGhlIGluZGV4IG1hdGNoZXNcclxuICAgICAgLy8gR2V0cyB0aGUgaW5mb3JtYXRpb24gZnJvbSB0aGUgbmV3IHNsb3RcclxuICAgICAgY29uc3QgdXNlcm5hbWVFbGVtZW50ID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lXCIpO1xyXG4gICAgICBjb25zdCBpbWdFbGVtZW50ID0gc2xvdC5xdWVyeVNlbGVjdG9yKFwiLmNoYXJhY3Rlci1zcHJpdGVcIik7XHJcbiAgICAgIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBzbG90LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHVzXCIpO1xyXG5cclxuICAgICAgY29uc3QgcHJldmlvdXNTbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5uYW1lKTsgLy8gRmluZHMgcHJldmlvdXMgc2xvdCBmcm9tIGlkXHJcbiAgICAgIGlmIChwcmV2aW91c1Nsb3QpIHtcclxuICAgICAgICAvLyBHZXRzIGluZm9ybWF0aW9uIGZyb20gb2xkIHNsb3RcclxuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHByZXZpb3VzU2xvdC5xdWVyeVNlbGVjdG9yKFwiLnVzZXJuYW1lXCIpO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IHByZXZpb3VzU2xvdC5xdWVyeVNlbGVjdG9yKFwiLmNoYXJhY3Rlci1zcHJpdGVcIik7XHJcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcHJldmlvdXNTbG90LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHVzXCIpO1xyXG5cclxuICAgICAgICAvLyBJZiBuZXcgc2xvdCBpcyBub3QgYSByYW5kb20sIGl0IHNldHMgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBvbGQgc2xvdCB0byB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIG5ldyBzbG90XHJcbiAgICAgICAgaWYgKHVzZXJuYW1lRWxlbWVudC50ZXh0Q29udGVudCAhPT0gXCJSYW5kb21cIikge1xyXG4gICAgICAgICAgdXNlcm5hbWUudGV4dENvbnRlbnQgPSB1c2VybmFtZUVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICBpbWcuc3JjID0gaW1nRWxlbWVudC5zcmM7XHJcbiAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gaW1nRWxlbWVudC5jbGFzc05hbWU7XHJcbiAgICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9IHN0YXR1c0VsZW1lbnQuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgcHJldmlvdXNTbG90LmlkID0gdXNlcm5hbWVFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoXCIgKFlvdSlcIiwgXCJcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIHRoZSBuZXcgc2xvdCBpcyBhIHJhbmRvbSwgc2V0cyBvbGQgc2xvdCB0byBhIHJhbmRvbVxyXG4gICAgICAgICAgdXBkYXRlQ2hhcmFjdGVyU2xvdChwcmV2aW91c1Nsb3QsIFwiUmFuZG9tXCIsIFwiUmFuZG9tXCIsIFwiSW52aXRlXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIG5ldyBzbG90XHJcbiAgICAgICAgdXBkYXRlQ2hhcmFjdGVyU2xvdChzbG90LCBkYXRhLm5hbWUsIGRhdGEuY2hhcmFjdGVyLCBkYXRhLnJlYWR5KTtcclxuICAgICAgICBzbG90LmlkID0gZGF0YS5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuLy8gT24gcmVhZHlcclxuc29ja2V0Lm9uKFwicmVhZHlcIiwgKGRhdGEpID0+IHtcclxuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eSkge1xyXG4gICAgcHR5ZGJnKFwicmVjdiByZWFkeVwiLCBkYXRhKTtcclxuICAgIGNvbnN0IHBsYXllclNsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLm5hbWUpO1xyXG4gICAgaWYgKHBsYXllclNsb3QpIHtcclxuICAgICAgY29uc3Qgc3RhdHVzID0gcGxheWVyU2xvdC5xdWVyeVNlbGVjdG9yKFwiLnN0YXR1c1wiKTtcclxuICAgICAgaWYgKGRhdGEucmVhZHkgPT09IHRydWUpIHtcclxuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIlJlYWR5XCI7XHJcbiAgICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9IFwic3RhdHVzIHJlYWR5XCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZWFkeSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBcIk5vdCBSZWFkeVwiO1xyXG4gICAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSBcInN0YXR1cyBub3QtcmVhZHlcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBJZiB0ZCBpcyBub3QgZm91bmQsIHJlZGlyZWN0cyB0byBhbm90aGVyIHBhcnR5XHJcbnNvY2tldC5vbihcInJvb20tZGVsZXRlZFwiLCAoKSA9PiB7XHJcbiAgd2luZG93LmxvY2F0aW9uID0gXCIvXCI7XHJcbn0pO1xyXG5cclxuLy8gT24gbWF0Y2htYWtpbmdcclxuc29ja2V0Lm9uKFwibWF0Y2htYWtpbmdcIiwgKGRhdGEpID0+IHtcclxuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eUlkKSB7XHJcbiAgICBwdHlkYmcoXCJyZWN2IG1hdGNobWFraW5nXCIsIGRhdGEpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIm1hdGNobWFraW5nTWVtYmVyc1wiLCBkYXRhLm1lbWJlcnMpOyAvLyBTZXRzIHNlc3Npb24gc3RvcmFnZSBvZiBtZW1iZXJzIHNvIHRoYXQgdGhlIG1hdGNobWFraW5nIHNjcmVlbiBjYW4gZGlzcGxheSBpdFxyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIm1lbWJlcnNUb0ZpbmRcIiwgZGF0YS5tZW1iZXJzVG9GaW5kKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9tYXRjaG1ha2luZy8ke2RhdGEucGFydHlJZH1gOyAvLyBSZWRpcmVjdHMgdG8gbWF0Y2htYWtpbmcgZm9yIHBhcnR5XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIE9uIGdhbWUgc3RhcnRcclxuc29ja2V0Lm9uKFwiZ2FtZS1zdGFydGVkXCIsIChkYXRhKSA9PiB7XHJcbiAgaWYgKHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xyXG4gICAgcHR5ZGJnKFwicmVjdiBnYW1lLXN0YXJ0ZWRcIiwge1xyXG4gICAgICBnYW1lSWQ6IGRhdGEuZ2FtZUlkLFxyXG4gICAgICBwYXJ0eU1lbWJlcnM6IGRhdGEucGFydHlNZW1iZXJzLFxyXG4gICAgICBtYXA6IGRhdGEubWFwLFxyXG4gICAgfSk7XHJcbiAgICBmb3IgKGNvbnN0IHRlYW0gaW4gZGF0YS5nYW1lRGF0YSkge1xyXG4gICAgICAvLyBGb3IgZWFjaCB0ZWFtIGluIHRoZSBnYW1lXHJcbiAgICAgIGZvciAoY29uc3QgcGxheWVyS2V5IGluIGRhdGEuZ2FtZURhdGFbdGVhbV0pIHtcclxuICAgICAgICAvLyBGb3IgZWFjaCBwbGF5ZXIgaW4gdGhlIHRlYW1cclxuICAgICAgICBjb25zdCBwbGF5ZXIgPSBkYXRhLmdhbWVEYXRhW3RlYW1dW3BsYXllcktleV07XHJcbiAgICAgICAgaWYgKHBsYXllcltcIm5hbWVcIl0gPT09IGdldENvb2tpZShcIm5hbWVcIikpIHtcclxuICAgICAgICAgIC8vIFNldCBzZXNzaW9uIHN0b3JhZ2UgZGF0YVxyXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImNoYXJhY3RlclwiLCBwbGF5ZXJbXCJjaGFyYWN0ZXJcIl0pO1xyXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInNwYXduUGxhdGZvcm1cIiwgcGxheWVyW1wic3Bhd25QbGF0Zm9ybVwiXSk7XHJcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwic3Bhd25cIiwgcGxheWVyW1wic3Bhd25cIl0pO1xyXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInBhcnR5XCIsIGRhdGEucGFydHlJZCk7XHJcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwicGFydHlNZW1iZXJzXCIsIGRhdGEucGFydHlNZW1iZXJzKTtcclxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJtYXBcIiwgZGF0YS5tYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2luZG93LmxvY2F0aW9uID0gYC9nYW1lLyR7ZGF0YS5nYW1lSWR9YDtcclxuICAgIHB0eWRiZyhcIm5hdmlnYXRlIGdhbWVcIiwgeyBnYW1lSWQ6IGRhdGEuZ2FtZUlkIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBPbiB1c2VyIGRpc2Nvbm5lY3Rcclxuc29ja2V0Lm9uKFwidXNlci1kaXNjb25uZWN0ZWRcIiwgKGRhdGEpID0+IHtcclxuICBpZiAoZGF0YS5wYXJ0eUlkID09PSBwYXJ0eUlkKSB7XHJcbiAgICBwdHlkYmcoXCJyZWN2IHVzZXItZGlzY29ubmVjdGVkXCIsIGRhdGEpO1xyXG4gICAgY29uc3QgdXNlclNsb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGFyYWN0ZXItc2xvdFwiKTsgLy8gRmluZCBhbGwgc2xvdHNcclxuICAgIGxldCB1c2VyU2xvdDtcclxuXHJcbiAgICB1c2VyU2xvdHMuZm9yRWFjaCgoc2xvdCkgPT4ge1xyXG4gICAgICAvLyBGb3IgZWFjaCBzbG90XHJcbiAgICAgIGNvbnN0IHVzZXJuYW1lRWxlbWVudCA9IHNsb3QucXVlcnlTZWxlY3RvcihcIi51c2VybmFtZVwiKTtcclxuICAgICAgLy8gSWYgdGhlIG5hbWUgb2YgdGhlIHNsb3QgbWF0Y2hlcyB0aGUgbmFtZSBvZiB0aGUgdXNlciB3aG8gZGlzY29ubmVjdGVkIGl0IHNldHMgaXQgdG8gYSByYW5kb21cclxuICAgICAgaWYgKHVzZXJuYW1lRWxlbWVudC50ZXh0Q29udGVudCA9PT0gZGF0YS5uYW1lKSB7XHJcbiAgICAgICAgdXNlclNsb3QgPSBzbG90OyAvLyBTZXRzIHRoZSB2YXJpYWJsZSB1c2VyU2xvdCB0byB0aGUgYWN0dWFsIHNsb3RcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIElmIGEgc2xvdCBleGlzdHMsIHJlc2V0IGl0IGJhY2sgdG8gcmFuZG9tXHJcbiAgICBpZiAodXNlclNsb3QpIHtcclxuICAgICAgdXBkYXRlQ2hhcmFjdGVyU2xvdCh1c2VyU2xvdCwgXCJSYW5kb21cIiwgXCJSYW5kb21cIiwgXCJJbnZpdGVcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICBjb25zdCByZWFkeSA9IHVzZXJTbG90LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHVzXCIpO1xyXG4gICAgICByZWFkeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlYWR5LmNsYXNzTGlzdC5jb250YWlucyhcImludml0ZVwiKSkge1xyXG4gICAgICAgICAgY29weUludml0ZVNpbXBsZSgpO1xyXG4gICAgICAgICAgcmVhZHkudGV4dENvbnRlbnQgPSBcIkNvcGllZCFcIjtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZWFkeS50ZXh0Q29udGVudCA9IFwiSW52aXRlXCI7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdXNlclNsb3QuaWQgPSBcIlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCByZW1vdmUgdXNlclwiKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKGNvb2tpZU5hbWUpIHtcclxuICBjb25zdCBuYW1lID0gY29va2llTmFtZSArIFwiPVwiO1xyXG4gIGNvbnN0IGRlY29kZWRDb29raWUgPSBkZWNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llKTtcclxuICBjb25zdCBhcnJheSA9IGRlY29kZWRDb29raWUuc3BsaXQoXCI7XCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBjb29raWUgPSBhcnJheVtpXS50cmltKCk7XHJcbiAgICBpZiAoY29va2llLmluZGV4T2YobmFtZSkgPT09IDApIHtcclxuICAgICAgcmV0dXJuIGNvb2tpZS5zdWJzdHJpbmcobmFtZS5sZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gXCJcIjtcclxufVxyXG4iXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJwdHlkYmciLCJsYWJlbCIsImRhdGEiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiY29uY2F0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZSIsInBhcnR5SWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiY2hhcmFjdGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm1vZGUiLCJtYXAiLCJyZWFkeUJ0biIsInJlYWR5Iiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwicG9wIiwidXNlcm5hbWUiLCJnZXRDb29raWUiLCJlbWl0IiwibmFtZSIsImhyZWYiLCJ0ZXh0Q29udGVudCIsInNldExvYmJ5QmFja2dyb3VuZCIsIm1hcFZhbHVlIiwidiIsIlN0cmluZyIsImJvZHkiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImNoZWNrTW9kZVZhbHVlIiwidmFsdWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInNsb3QiLCJwbGF0Zm9ybSIsInBhcmVudEVsZW1lbnQiLCJ0ZWFtIiwiZ2V0QXR0cmlidXRlIiwic2V0dXBEcmFnQW5kRHJvcCIsInBhcnR5IiwicG9wdXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwicGFydHlDZW50ZXJYIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwicGFydHlZIiwib2Zmc2V0VG9wIiwibGVmdCIsInRvcCIsImFwcGVuZENoaWxkIiwicmVtb3ZlIiwiY29weUludml0ZSIsInNldFRpbWVvdXQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0b3IiLCJjbGlwYm9hcmQiLCJ3cml0ZVRleHQiLCJ0aGVuIiwiZXJyb3IiLCJjb3B5SW52aXRlU2ltcGxlIiwibGVhdmUiLCJzaWduT3V0IiwiY29va2llIiwieW91clRlYW0iLCJvcFRlYW0iLCJsb2JieUFyZWEiLCJ5b3VyUGxhdGZvcm1zIiwib3BQbGF0Zm9ybXMiLCJ0YXJnZXRDb3VudCIsImkiLCJjcmVhdGVQbGF0Zm9ybSIsInNsb3ROdW1iZXIiLCJzZXRBdHRyaWJ1dGUiLCJjaGFyYWN0ZXJTbG90IiwiaWQiLCJzcHJpdGUiLCJzcmMiLCJhbHQiLCJzdGF0dXMiLCJjdXJzb3IiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBsYXRmb3JtSW1hZ2UiLCJkcmFnZ2FibGUiLCJxdWVyeVNlbGVjdG9yIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInJlcGxhY2UiLCJhZGQiLCJkcmFnSW1hZ2UiLCJjbG9uZU5vZGUiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwic2V0RHJhZ0ltYWdlIiwicmVtb3ZlQ2hpbGQiLCJwcmV2ZW50RGVmYXVsdCIsInJlbGF0ZWRUYXJnZXQiLCJnZXREYXRhIiwiX2RhdGEkc3BsaXQiLCJfZGF0YSRzcGxpdDIiLCJfc2xpY2VkVG9BcnJheSIsInNvdXJjZVNsb3QiLCJBcnJheSIsImZyb20iLCJmaW5kIiwiaW5jbHVkZXMiLCJzd2FwQ2hhcmFjdGVyU2xvdHMiLCJ0ZWFtTmFtZSIsInRlbXBOYW1lIiwiYWxsU2xvdHMiLCJzbG90SW5kZXgiLCJpbmRleE9mIiwiY291bnQiLCJ0YXJnZXRTbG90IiwiZHJhZ2dlZE5hbWUiLCJkcmFnZ2VkQ2hhcmFjdGVyIiwiZHJhZ2dlZFJlYWR5IiwidGFyZ2V0VXNlcm5hbWUiLCJ0YXJnZXRTcHJpdGUiLCJ0YXJnZXRTdGF0dXMiLCJ1cGRhdGVDaGFyYWN0ZXJTbG90IiwiaXNSYW5kb20iLCJzdGF0dXNFbCIsInVwZGF0ZVBlb3BsZSIsImFsbENoYXJhY3RlclNsb3RzIiwiY29uZGl0aW9uTWV0IiwidHJpbSIsInVzZXJuYW1lRWxlbWVudCIsInNlbGVjdGVkVmFsdWUiLCJ0YXJnZXQiLCJwcmV2aW91c01vZGVWYWx1ZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsImpzb24iLCJOdW1iZXIiLCJtZW1iZXJzQ291bnQiLCJwb3NpdGlvbiIsImNvbG9yIiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsIm1lbWJlcnMiLCJtZXNzYWdlIiwib24iLCJwYXJ0eU1lbWJlcnMiLCJtZW1iZXIiLCJyZWFkeVRleHQiLCJ1c2VyIiwiaW1nIiwidXNlcktleSIsImltZ0VsZW1lbnQiLCJzdGF0dXNFbGVtZW50IiwicHJldmlvdXNTbG90IiwicGxheWVyU2xvdCIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIm1lbWJlcnNUb0ZpbmQiLCJnYW1lSWQiLCJnYW1lRGF0YSIsInBsYXllcktleSIsInBsYXllciIsInVzZXJTbG90cyIsInVzZXJTbG90IiwiY29va2llTmFtZSIsImRlY29kZWRDb29raWUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJhcnJheSIsInN1YnN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=