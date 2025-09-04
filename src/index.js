import { sonner } from "./lib/sonner.js";
import {
  checkIfInParty,
  createParty,
  leaveParty,
  socketInit,
  renderPartyMembers,
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
async function bootstrapPartyData(partyId) {
  console.log("In a party:", partyId);
  try {
    const resp = await fetch("/partydata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ partyId }),
    });

    if (!resp.ok) {
      if (resp.status === 409) {
        // Party might be full, try to get JSON response
        try {
          const errorData = await resp.json();
          if (errorData.redirect) {
            window.location.href = errorData.redirect;
            return;
          }
        } catch (e) {
          // If JSON parsing fails, fall back to generic error
        }
      }
      throw new Error("Failed to fetch party data");
    }

    const data = await resp.json();
    // Immediately render roster so UI isn't empty before socket pushes
    if (data?.members)
      renderPartyMembers({
        partyId,
        members: data.members,
        mode: data?.party?.mode,
        map: data?.party?.map,
      });
    sonner("Joined party", undefined, undefined, undefined, {
      duration: 1500,
    });
  } catch (error) {
    console.error("Error:", error);
  }
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
      if (data.party_id && !existingPartyId) {
        // If user is in a party but not at the url, send them to it
        console.log("User is in party:", data.party_id);
        window.location.href = `/party/${data.party_id}`;
      }
    }
  })
  .catch((err) => console.error("Error fetching /status:", err));

// Wait for status before trying to bootstrap party data
if (existingPartyId) {
  statusPromise.then(() => {
    if (userData) {
      bootstrapPartyData(existingPartyId);
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await statusPromise;
  if (!userData) return;

  signUpOut(guest);

  const characterBodyElement = document.getElementById("sprite");
  const characterSelect = document.getElementById("your-slot-1");
  const createPartyButton = document.getElementById("create-party");
  const inviteStatus = document.querySelectorAll(".invite");

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

    // Ensure current Invite badges are visible and clickable in party
    inviteStatus.forEach((status) => {
      if (status.textContent.trim() === "Invite") {
        status.style.display = "";
        status.style.cursor = "pointer";
        // Use current page URL as invite link
        status.dataset.inviteLink = window.location.href;
      }
    });

    // Delegated click handler so dynamically-updated Invite buttons work
    const lobby = document.getElementById("lobby-area");
    if (lobby) {
      lobby.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest && e.target.closest(".invite");
        if (!btn) return;
        // Only act when in a party
        if (!existingPartyId) return;
        const link = btn.dataset.inviteLink || window.location.href;
        navigator.clipboard.writeText(link);
        sonner(
          "Invite link copied to clipboard",
          "Share this with your friends to invite them to the party",
          undefined,
          undefined,
          { duration: 2000 }
        );
      });
    }
  } else {
    createPartyButton.addEventListener("click", createParty);

    // Not in a party: hide Invite badges entirely
    inviteStatus.forEach((status) => {
      status.style.display = "none";
      status.style.cursor = "default";
    });
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

export function setLobbyBackground(mapValue) {
  const map = String(mapValue);
  if (map === "2") {
    // Mangrove Meadow
    document.body.style.backgroundImage = 'url("/assets/Mangrove/lobbyBg.jpg")';
  } else {
    // Default map
    document.body.style.backgroundImage = 'url("/assets/Lushy/lobbyBg.jpg")';
  }
}
