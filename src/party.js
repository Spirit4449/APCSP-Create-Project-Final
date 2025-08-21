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

const party = document.getElementById("party");

// Popup to copy id to clipboard
let popup;
// Mouse hover
party.addEventListener("mouseover", (event) => {
  popup = document.createElement("div"); // Creates popup

  popup.textContent = `${window.location.href}`; // Sets text to the url of the window
  popup.style.padding = "3px 10px";
  popup.style.color = "white";
  popup.style.position = "absolute";
  popup.style.borderRadius = "5px";
  popup.style.backgroundColor = "#2F2F2F";

  const partyCenterX = party.offsetLeft + party.offsetWidth / 2 - 250;
  const partyY = party.offsetTop;

  popup.style.left = partyCenterX + "px";
  popup.style.top = partyY + 40 + "px";

  document.body.appendChild(popup);
});

party.addEventListener("mouseout", (event) => {
  popup.remove();
});

party.addEventListener("click", (event) => {
  copyInvite(popup);
  setTimeout(() => {
    // Removes clicked text after 2 seconds
    popup.textContent = window.location.href;
    popup.style.backgroundColor = "#2F2F2F";
  }, 2000);
});

function copyInvite(popup) {
  if (navigator.clipboard) {
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

const yourTeam = document.getElementById("your-team");
const opTeam = document.getElementById("op-team");

function checkModeValue() {
  // Finds the amount of people
  const peopleCount = yourTeam.children.length;
  let targetCount;
  // Uses switch statement to find the value of mode
  switch (mode.value) {
    case "1":
      targetCount = 1;
      break;
    case "2":
      targetCount = 2;
      break;
    case "3":
      targetCount = 3;
      break;
    default:
      targetCount = 1;
  }

  // If the current count matches the target count, return
  if (peopleCount === targetCount) {
    return;
  }

  // If the current count is greater than the target count, remove extra cells
  if (peopleCount > targetCount) {
    for (let i = peopleCount - 1; i >= targetCount; i--) {
      yourTeam.removeChild(yourTeam.lastChild);
      opTeam.removeChild(opTeam.lastChild);
    }
  }

  // If more cells need to be created, they are created by "count"
  count = targetCount - peopleCount;
  for (let i = 0; i < count; i++) {
    createRandom(yourTeam);
    createRandom(opTeam);
  }
}

function updatePeople(name, character, ready) {
  const allTdElements = document.querySelectorAll("td");
  let conditionMet = false;
  let tempName = name;
  if (name.includes(" (You)")) {
    tempName = name.replace(" (You)", "").trim();
  }

  for (let i = 0; i < allTdElements.length; i++) {
    const td = allTdElements[i];
    if (td.classList.contains("player-display")) {
      socket.emit("team-update", { tempName, partyId, team: "your-team" });
    } else {
      socket.emit("team-update", { tempName, partyId, team: "op-team" });
    }
    Array.from(td.children).forEach((element) => {
      if (element.tagName === "P" && element.textContent === "Random") {
        td.id = tempName;
        td.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData(
            "text/plain",
            `${tempName},${character},${ready}`
          );
        });
        element.textContent = name;
        const img = td.querySelector("img");
        if (character === "Ninja") {
          img.src = "/assets/ninjasmallicon.png";
        }
        const readyElement = td.querySelector(".status");
        readyElement.textContent = ready;
        readyElement.style.color = "";
        readyElement.style.cursor = "";
        conditionMet = true;
      }
    });
    if (conditionMet) {
      return;
    }
  }
}

function createRandom(team) {
  // Creates html for a random user
  var td = document.createElement("td");
  var username = document.createElement("p");
  username.classList.add("username");
  username.textContent = "Random";

  var iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");

  var iconImg = document.createElement("img");
  iconImg.src = "/assets/random.png";
  iconImg.alt = "";

  iconDiv.appendChild(iconImg);

  var statusDiv = document.createElement("div");
  statusDiv.classList.add("status");
  statusDiv.style.color = "yellow";
  statusDiv.textContent = "Invite";
  statusDiv.style.cursor = "pointer";
  statusDiv.addEventListener("click", (event) => {
    if (statusDiv.style.cursor === "pointer") {
      copyInvite();
      statusDiv.textContent = "Copied!";
      setTimeout(() => {
        statusDiv.textContent = "Invite";
      }, 1000);
    }
  });

  td.appendChild(username);
  td.appendChild(iconDiv);
  td.appendChild(statusDiv);

  // Allows the td to be dragged
  td.draggable = true;

  td.addEventListener("dragenter", (event) => {
    event.preventDefault(); // Prevents default functions of dragenter
  });

  td.addEventListener("dragover", (event) => {
    event.preventDefault();
    td.style.border = "7px solid yellow"; // Creates a yellow highlight on drag
  });

  td.addEventListener("dragleave", (event) => {
    event.preventDefault();
    td.style.border = ""; // Removes the yellow highlight on drag leave
  });

  td.addEventListener("drop", (event) => {
    event.preventDefault(); // Prevents default action

    td.style.border = ""; // Removes border
    statusDiv.style.color = ""; // Makes the color of status to red
    var data = event.dataTransfer.getData("text/plain");
    data = data.split(","); // Gets data and puts it in the list data

    const owner = document.getElementById(data[0]); // Finds where the drag came from by using the id of the name
    const usernameElement = owner.querySelector(".username");
    const img = owner.querySelector("img");
    const status = owner.querySelector(".status");
    // If the owner element was a random it sets the dragged element to a random
    if (username.textContent !== "Random") {
      usernameElement.textContent = username.textContent;
      img.src = iconImg.src;
      status.textContent = statusDiv.textContent;
      status.style.color = "";

      owner.id = username;
      // If the owner element was not a random, it sets it to the details
    } else {
      usernameElement.textContent = "Random";
      img.src = "/assets/random.png";
      status.textContent = "Invite";
      status.style.color = "yellow";
      owner.id = "";
    }

    username.textContent = `${data[0]} (You)`; // Adds name + (you)
    if (data[1] === "Ninja") {
      iconImg.src = "/assets/ninjasmallicon.png";
    }
    statusDiv.textContent = data[2];
    td.id = data[0];

    // Sets dragstart
    td.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData(
        "text/plain",
        `${data[0]},${data[1]},${data[2]}`
      );
    });

    // Emits team update
    if (team === yourTeam) {
      socket.emit("team-update", {
        tempName: data[0],
        partyId,
        team: "your-team",
      });
    } else if (team === opTeam) {
      socket.emit("team-update", {
        tempName: data[0],
        partyId,
        team: "op-team",
      });
    }

    // Emits drop to everyone else
    const allTDS = document.querySelectorAll("td");
    let count = 0;
    allTDS.forEach((checkTd) => {
      count++;
      if (td === checkTd) {
        socket.emit("drop", {
          // Figures out where the td is and sends the index to the other users
          name: data[0],
          character: data[1],
          ready: data[2],
          count,
        });
      }
    });
  });

  if (team === yourTeam) {
    td.classList.add("player-display"); // Adds player styling
    document.getElementById("your-team").appendChild(td); // Appends to user side
  } else if (team === opTeam) {
    td.classList.add("op-display"); // Adds op styling
    username.style.color = "#ffb496";
    document.getElementById("op-team").appendChild(td); // Appends to op side
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
      let readyText;
      if (member.ready === true) {
        readyText = "Ready";
      } else if (member.ready === false) {
        readyText = "Not ready";
      }
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

// On character change
socket.on("character-change", (data) => {
  if (partyId === data.partyId) {
    ptydbg("recv character-change", data);
    // Check if party is the same
    const user = document.getElementById(data.username);
    const img = user.querySelector("img");
    if (data.character === "Ninja") {
      img.src = "/assets/ninjasmallicon.png";
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
  }
});

// On drop
socket.on("drop", (data) => {
  ptydbg("recv drop", data);
  const allTDS = document.querySelectorAll("td");
  let count = 0;
  allTDS.forEach((checkTd) => {
    // Finds index of td
    count++;
    if (count === data.count) {
      // If the index matches
      // Gets the information from the new td
      const usernameElement = checkTd.querySelector("p");
      const imgElement = checkTd.querySelector("img");
      const statusElement = checkTd.querySelector(".status");

      const previousTd = document.getElementById(data.name); // Finds previous td from id
      // Gets information from old td
      const username = previousTd.querySelector("p");
      const img = previousTd.querySelector("img");
      const status = previousTd.querySelector(".status");
      // If new td is not a random, it sets the information of the old td to the information of the new td
      if (usernameElement.textContent !== "Random") {
        username.textContent = usernameElement.textContent;
        img.src = imgElement.src;
        status.textContent = statusElement.textContent;
        status.style.color = "";
        previousTd.id = usernameElement.textContent;
      } else {
        // If the new td is a random, sets old td to a random
        username.textContent = "Random";
        img.src = "/assets/random.png";
        status.textContent = "Invite";
        status.style.color = "yellow";
        previousTd.id = "";
      }

      // Sets the information of the new td
      usernameElement.textContent = data.name;
      if (data.character === "Ninja") {
        imgElement.src = "/assets/ninjasmallicon.png";
      }
      statusElement.textContent = data.ready;
      statusElement.style.color = "";
      checkTd.id = data.name;
    }
  });
});

// On ready
socket.on("ready", (data) => {
  if (partyId === data.party) {
    ptydbg("recv ready", data);
    const playerDiv = document.getElementById(data.name);
    if (playerDiv) {
      const status = playerDiv.querySelector(".status");
      if (data.ready === true) {
        status.textContent = "Ready";
        status.style.color = "#23EC63"; // Color green
      } else if (data.ready === false) {
        status.textContent = "Not Ready";
        status.style.color = ""; // Color red
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
    const userDivs = document.querySelectorAll(".icon"); // Find all td by using icon query selector
    let userTd;

    userDivs.forEach((div) => {
      // For each td
      const usernameElement = div.parentNode.querySelector(".username");
      // If the name of the td matches the name of the user who disconnected it sets it to a random
      if (usernameElement.textContent === data.name) {
        usernameElement.textContent = "Random";
        userTd = div.parentNode; // Sets the variable userTd to the parent of username (the actual td)
        return;
      }
    });

    // If a td exists, reset it back to random
    if (userTd) {
      const ready = userTd.querySelector(".status");
      ready.textContent = "Invite";
      ready.style.color = "yellow";
      ready.style.cursor = "pointer";
      ready.addEventListener("click", (event) => {
        copyInvite();
        ready.textContent = "Copied!";
        setTimeout(() => {
          ready.textContent = "Invite";
        }, 1000);
      });

      const img = userTd.querySelector("img");
      img.src = "/assets/random.png";

      userTd.id = "";
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
