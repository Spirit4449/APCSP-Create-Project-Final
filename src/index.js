// Runs every time the user visits the root domain
import { createCookie, getCookie } from "./lib/cookies";
import { setLobbyBackground } from "./lib/utils.js";
import { checkIfInParty } from "./party.js";
import { getCharacterStats, getAllCharacters } from "./lib/characterStats.js";
import "./styles/characterSelect.css";

let userData = null; // store globally
let guest = false;

// kick off status fetch right away
const statusPromise = fetch("/status", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((data) => {
    if (data?.userData) {
      console.log("Fetched user data:", data.userData);
      userData = data.userData;
      guest = data.guest;

      // Redirect to party URL
      if (data.party_id) {
        window.location.href = `/party/${data.party_id}`; // redirect to party page
      }

      // New guest user created
      if (data.newlyCreated) {
        // Add newly created functionality here
      }
    }
  })
  .catch((err) => console.error("Error fetching /status:", err));

// everything else waits until DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  // wait for statusPromise to finish if it hasn't yet
  await statusPromise;

  if (!userData) {
    console.warn("No user data available");
    return;
  }

  signUpOut(guest);

  // Document Variables
  const characterBodyElement = document.getElementById("sprite");
  const characterSelect = document.getElementById("your-slot-1");

  // Party logic
  const partyId = checkIfInParty();
  if (partyId) {
    socket.emit("user-joined", {
      name: userData.name,
      partyId,
      character: userData.char_class,
    });
  }

  // Set username text
  document.getElementById("username-text").textContent = userData.name;
  // Set background based on map
  setLobbyBackground("1");
  // Set character sprite image
  characterBodyElement.src = `/assets/${userData.char_class}/body.png`;

  // Add click handler for character sprite
  characterSelect.addEventListener("click", openCharacterSelect);

  // Initialize character select popup
  initializeCharacterSelect();
});

function initializeCharacterSelect() {
  // Create and append character select overlay
  const overlay = document.createElement("div");
  overlay.className = "character-select-overlay";

  const popup = document.createElement("div");
  popup.className = "character-select-popup";

  const title = document.createElement("h2");
  title.textContent = "Choose Your Fighter";

  const closeButton = document.createElement("button");
  closeButton.className = "close-popup";
  closeButton.innerHTML = "×";
  closeButton.onclick = () => (overlay.style.display = "none");

  const charactersGrid = document.createElement("div");
  charactersGrid.className = "characters-grid";

  // Available characters
  const characters = getAllCharacters();

  characters.forEach((char) => {
    const card = createCharacterCard(char);
    charactersGrid.appendChild(card);
  });

  popup.appendChild(title);
  popup.appendChild(closeButton);
  popup.appendChild(charactersGrid);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

function createCharacterCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";
  if (userData.char_class === character) {
    card.classList.add("selected");
  }

  const stats = getCharacterStats(character);

  // Character header with emphasized image and basic info
  const header = document.createElement("div");
  header.className = "character-header";

  const img = document.createElement("img");
  img.className = "character-image";
  img.src = `/assets/${character}/body.png`;
  img.alt = character;

  const info = document.createElement("div");
  info.className = "character-info";

  const name = document.createElement("h3");
  name.className = "character-name";
  name.textContent = character;

  const description = document.createElement("p");
  description.className = "character-description";
  description.textContent = stats.description;

  info.appendChild(name);
  info.appendChild(description);
  header.appendChild(img);
  header.appendChild(info);

  // Stats container with 3-column grid
  const statsDiv = document.createElement("div");
  statsDiv.className = "character-stats";

  // Calculate percentages for bars (normalized to make comparison easier)
  const maxHealthValue = Math.max(stats.maxHealth, 12000);
  const maxDamageValue = Math.max(stats.damage, 1600);
  const maxSpecialValue = Math.max(stats.specialDamage, 2800);

  const healthPercent = (stats.maxHealth / maxHealthValue) * 100;
  const damagePercent = (stats.damage / maxDamageValue) * 100;
  const specialPercent = (stats.specialDamage / maxSpecialValue) * 100;

  // Health section
  const healthSection = document.createElement("div");
  healthSection.className = "stat-section";
  healthSection.innerHTML = `
    <img src="/assets/heart.png" alt="Health" class="stat-icon" onerror="this.style.display='none'">
    <div class="stat-section-title">Health</div>
    <div class="stat-main-value">${stats.maxHealth}</div>
    <div class="stat-bar health-bar">
      <div class="stat-fill" style="width: ${healthPercent}%"></div>
    </div>
  `;

  // Attack section
  const attackSection = document.createElement("div");
  attackSection.className = "stat-section";
  attackSection.innerHTML = `
    <img src="/assets/attack.png" alt="Attack" class="stat-icon" onerror="this.style.display='none'">
    <div class="stat-section-title">Attack</div>
    <div class="stat-main-value">${stats.damage}</div>
    <div class="stat-bar attack-bar">
      <div class="stat-fill" style="width: ${damagePercent}%"></div>
    </div>
    <div class="stat-details">
      ${stats.ammoCapacity} ammo<br>
      ${(stats.ammoReloadMs / 1000).toFixed(1)}s reload
    </div>
  `;

  // Special section
  const specialSection = document.createElement("div");
  specialSection.className = "stat-section";
  specialSection.innerHTML = `
    <img src="/assets/special.png" alt="Special" class="stat-icon" onerror="this.style.display='none'">
    <div class="stat-section-title">Special</div>
    <div class="stat-main-value">${stats.specialDamage}</div>
    <div class="stat-bar special-bar">
      <div class="stat-fill" style="width: ${specialPercent}%"></div>
    </div>
    <div class="stat-details">
      ${stats.specialChargeHits} hits to charge
    </div>
  `;

  // Select button
  const selectButton = document.createElement("button");
  selectButton.className = "select-button";
  selectButton.textContent =
    userData.char_class === character ? "Selected" : "Select";
  selectButton.disabled = userData.char_class === character;
  selectButton.onclick = () => selectCharacter(character);

  // Assemble the card
  statsDiv.appendChild(healthSection);
  statsDiv.appendChild(attackSection);
  statsDiv.appendChild(specialSection);

  card.appendChild(header);
  card.appendChild(statsDiv);
  card.appendChild(selectButton);

  return card;
}

function openCharacterSelect() {
  const overlay = document.querySelector(".character-select-overlay");
  overlay.style.display = "flex";
}

function selectCharacter(character) {
  console.log(`Character selected: ${character}`);
  // Here you would typically make an API call to update the user's character
  // For now, we'll just close the popup
  document.querySelector(".character-select-overlay").style.display = "none";
}

function signUpOut(guest) {
  const signOut = document.getElementById("sign-out");
  const login = document.getElementById("login");
  if (guest) {
    signOut.textContent = "Sign Up";
    signOut.addEventListener("click", (event) => {
      window.location.href = "/signup";
    });
    login.addEventListener("click", (event) => {
      window.location.href = "/login";
    });
  } else {
    signOut.addEventListener("click", (event) => {
      // Sets cookie expiration to the past to delete it
      document.cookie =
        "name" + "=; expires=Mon, 05 May 2019 00:00:00 UTC; path=/;";
      window.location.href = "/signed-out";
    });
    login.style.display = "none";
  }
}
