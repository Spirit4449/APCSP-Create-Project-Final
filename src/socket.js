// Minimal singleton Socket.IO client
// <script src="/socket.io/socket.io.js"></script> is already included in index.html
const socket = window.io({
  // same-origin; send cookies so the server can read signed cookie
  withCredentials: true,
  autoConnect: true,
});
export default socket;
