import { createCookie, getCookie } from "./lib/cookies";
import { setLobbyBackground } from "./lib/utils.js";
import { checkIfInParty } from "./party.js";
import { initializeCharacterSelect, openCharacterSelect } from "./characterLogic.js";
import "./styles/characterSelect.css";

let userData = null;
let guest = false;

// Fetch user status upfront
const statusPromise = fetch("/status", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((data) => {
    if (data?.userData) {
      userData = data.userData; 
      guest = data.guest;
      if (data.party_id) {
        window.location.href = `/party/${data.party_id}`;
      }
    }
  })
  .catch((err) => console.error("Error fetching /status:", err));

document.addEventListener("DOMContentLoaded", async () => {
  await statusPromise;
  if (!userData) return;

  signUpOut(guest);

  const characterBodyElement = document.getElementById("sprite");
  const characterSelect = document.getElementById("your-slot-1");

  const partyId = checkIfInParty();
  if (partyId) {
    socket.emit("user-joined", {
      name: userData.name,
      partyId,
      character: userData.char_class,
    });
  }

  document.getElementById("username-text").textContent = userData.name;
  setLobbyBackground("1");
  characterBodyElement.src = `/assets/${userData.char_class}/body.png`;

  characterSelect.addEventListener("click", openCharacterSelect);
  initializeCharacterSelect(userData);
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
      document.cookie = "name=; expires=Mon, 05 May 2019 00:00:00 UTC; path=/;";
      window.location.href = "/signed-out";
    });
    login.style.display = "none";
  }
}
