// matchmaking.js

const socket = io("/");

let partyId = window.location.pathname.split("/").filter(Boolean).pop();

socket.on("game-started", (data) => {
  // If either the found team or owner team
  if (partyId === data.foundId || partyId === data.partyId) {
    for (const team in data.gameData) {
      // For each team
      for (const playerKey in data.gameData[team]) {
        // For each player
        const player = data.gameData[team][playerKey];
        if (player["name"] === getCookie("name")) {
          // If name
          // Set session variables
          sessionStorage.setItem("character", player["character"]);
          sessionStorage.setItem("spawnPlatform", player["spawnPlatform"]);
          sessionStorage.setItem("spawn", player["spawn"]);
          sessionStorage.setItem("party", data.foundId);
          sessionStorage.setItem("partyMembers", data.partyMembers);
        }
      }
    }
    const membersToFind = sessionStorage.getItem("membersToFind");
    const playersFound = document.getElementById("players-found");
    // Set textcontent of matchmaking players
    playersFound.textContent = `Players Found: ${membersToFind}/${membersToFind}`;
    setTimeout(() => {
      window.location = `/game/${data.gameId}`;
    }, 500);
  }
});

// If a player leaves, redirects back to party
socket.on("matchmaking-disconnect", (data) => {
  console.log("Got the disconnect message");
  if (partyId === data.partyId) {
    window.location.href = `/party/${partyId}`;
  }
});

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

// Random color function to change color of background periodicaly
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    // Chooses a random 6 digit string
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to set a random color as background
function changeBackgroundColor() {
  const background = document.querySelector(".background"); // Gets background object
  const color = getRandomColor(); // Calls random color funciton
  background.style.backgroundColor = color; // Sets background color
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(changeBackgroundColor, 5000); // Every 5 seconds background color is changed
  changeBackgroundColor();

  const leave = document.getElementById("leave");
  leave.addEventListener("click", (event) => {
    window.history.back();
  });

  // Changes text of finding players header
  const findingPlayers = document.getElementById("finding-players");
  setInterval(() => {
    findingPlayers.textContent = changeText();
  }, 1000);

  function changeText() {
    dots = [".", "..", "..."];
    const randomIndex = Math.floor(Math.random() * dots.length); // Randomly selects a dot amount from the list
    const item = dots[randomIndex];
    const text = `Finding Players ${item}`;
    return text;
  }

  const playersFound = document.getElementById("players-found");
  const members = sessionStorage.getItem("matchmakingMembers");
  const membersToFind = sessionStorage.getItem("membersToFind");
  playersFound.textContent = `Players Found: ${members}/${membersToFind}`;
});
