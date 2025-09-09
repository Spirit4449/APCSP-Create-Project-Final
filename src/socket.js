// Minimal singleton Socket.IO client (bundled)
import { io } from "socket.io-client";

// We defer connecting until ensureSocketConnected() is called so that
// any initial HTTP requests (/status, /partydata, etc.) have a chance
// to create/set the signed identity cookies first (avoids a race where
// the websocket handshake occurs before the guest/user cookies exist).
const socket = io({
  withCredentials: true,
  autoConnect: false,
});

let _connectingPromise = null;
let _connectAttempted = false;

/**
 * Ensure the singleton socket is connected exactly once.
 * Safe to call multiple times; subsequent calls return the same promise
 * (or an already-resolved promise if connected).
 */
export function ensureSocketConnected() {
  if (socket.connected) return Promise.resolve(socket);
  if (_connectingPromise) return _connectingPromise;

  _connectingPromise = new Promise((resolve, reject) => {
    const onConnect = () => {
      cleanup();
      resolve(socket);
    };
    const onError = (err) => {
      cleanup();
      // Allow retries on next call
      _connectingPromise = null;
      reject(err);
    };
    const cleanup = () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onError);
    };

    if (!_connectAttempted) {
      _connectAttempted = true;
      // Start the actual connection attempt
      socket.connect();
    }
    socket.once("connect", onConnect);
    socket.once("connect_error", onError);
  });

  return _connectingPromise;
}

export default socket;
