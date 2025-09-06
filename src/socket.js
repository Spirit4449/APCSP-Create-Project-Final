// Minimal singleton Socket.IO client (bundled)
import { io } from "socket.io-client";

const socket = io({
  // same-origin; send cookies so the server can read signed cookie
  withCredentials: true,
  autoConnect: true,
});

export default socket;
