import { setLobbyBackground, sonner } from "./lib/sonner.js";
import {
  checkIfInParty,
  createParty,
  leaveParty,
  socketInit,
} from "./party.js";
import {
  initializeCharacterSelect,
  openCharacterSelect,
} from "./characterLogic.js";
import "./styles/characterSelect.css";
import "./styles/index.css";
import "./styles/sonner.css";

let userData = null;
let guest = false;

const existingPartyId = checkIfInParty();
if (existingPartyId) {
  fetch("/partydata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ partyId: existingPartyId }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch party data");
      return response.json();
    })
    .then((data) => {
      console.log("Party data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fetch user status upfront
const statusPromise = fetch("/status", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "same-origin",
})
  .then((res) => res.json())
  .then((data) => {
    if (data?.userData) {
      userData = data.userData;
      guest = data.guest;
    }
  })
  .catch((err) => console.error("Error fetching /status:", err));

document.addEventListener("DOMContentLoaded", async () => {
  await statusPromise;
  if (!userData) return;

  signUpOut(guest);

  const characterBodyElement = document.getElementById("sprite");
  const characterSelect = document.getElementById("your-slot-1");
  const createPartyButton = document.getElementById("create-party");

  const coinCount = document.getElementById("coin-count");
  const gemCount = document.getElementById("gem-count");

  document.getElementById("username-text").textContent = userData.name;
  setLobbyBackground("1");
  characterBodyElement.src = `/assets/${userData.char_class}/body.png`;
  coinCount.textContent = userData.coins;
  gemCount.textContent = userData.gems;

  characterSelect.addEventListener("click", openCharacterSelect);
  initializeCharacterSelect(userData);

  if (existingPartyId) {
    createPartyButton.textContent = "Leave Party";
    createPartyButton.style.background =
      "linear-gradient(135deg, #d63939, #cf4545)";
    createPartyButton.addEventListener("click", leaveParty);

    socketInit(); // Initialize all socket events
  } else {
    createPartyButton.addEventListener("click", createParty);
  }
});

function signUpOut(guest) {
  const signOut = document.getElementById("sign-out");
  const login = document.getElementById("login");
  if (guest) {
    signOut.textContent = "Sign Up";
    signOut.addEventListener("click", () => (window.location.href = "/signup"));
    login.addEventListener("click", () => (window.location.href = "/login"));
  } else {
    signOut.addEventListener("click", () => {
      window.location.href = "/signed-out";
    });
    login.style.display = "none";
  }
}
