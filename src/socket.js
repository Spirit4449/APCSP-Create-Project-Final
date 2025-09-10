// Minimal singleton Socket.IO client (bundled)
import { io } from "socket.io-client";

// Use normal autoConnect so matchmaking/game listeners work immediately.
// Party code can optionally await ensureSocketConnected() if it wants to
// guarantee the handshake finished after /status completed.
const socket = io({ withCredentials: true, autoConnect: true });

/**
 * Lightweight helper: resolves when socket is connected (or immediately if already).
 * Does NOT change autoConnect behavior; just a convenience for party.js to avoid races.
 * An optional timeout ensures the promise resolves even if connect is slow.
 */
export function ensureSocketConnected(timeoutMs = 4000) {
  if (socket.connected) return Promise.resolve(socket);
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      socket.off("connect", finish);
      resolve(socket);
    };
    socket.once("connect", finish);
    // Fallback: resolve anyway after timeout so callers proceed.
    setTimeout(finish, timeoutMs);
    // If autoConnect was somehow disabled elsewhere, trigger connect.
    try {
      if (!socket.active) socket.connect();
    } catch (_) {}
  });
}

export default socket;
