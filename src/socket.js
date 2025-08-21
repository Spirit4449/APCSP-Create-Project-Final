// socket.js
// Centralized Socket.IO client to avoid circular dependencies between game, player, and opPlayer modules.
const socket = io("/");

export default socket;
