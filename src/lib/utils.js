  export function setLobbyBackground(mapValue) {
    const map = String(mapValue);
    if (map === "2") {
      // Mangrove Meadow
      document.body.style.backgroundImage =
        'url("/assets/Mangrove/lobbyBg.jpg")';
    } else {
      // Default map
      document.body.style.backgroundImage = 'url("/assets/Lushy/lobbyBg.jpg")';
    }
  }