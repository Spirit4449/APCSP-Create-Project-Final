const { updateOrDeleteParty } = require("../helpers/party");

function startCleanupJobs({ db, io }) {
  // Inactive member cleanup (every 30 minutes)
  let _cleanupRunning = false;
  async function cleanupInactiveMembers() {
    if (_cleanupRunning) return;
    _cleanupRunning = true;
    try {
      const removed = await db.findAndRemoveInactiveMembers(30);
      const byParty = new Map();
      for (const row of removed) {
        const list = byParty.get(row.party_id) || [];
        list.push(row.name);
        byParty.set(row.party_id, list);
      }
      for (const [partyId, names] of byParty.entries()) {
        console.log(
          `[inactive] Removed ${names.length} member(s) from party ${partyId}: ${names.join(", ")}`
        );
      }
      console.log(`[cleanup] Processing ${byParty.size} affected parties`);
      for (const [partyId] of byParty.entries()) {
        await updateOrDeleteParty(io, db, partyId);
      }
      try {
        const count = await db.deleteEmptyParties();
        if (count && count > 0) {
          console.log(`[inactive] Deleted ${count} empty parties`);
        }
      } catch {}
      try {
        const expired = await db.deleteExpiredGuestsAndMemberships();
        if (expired && expired.count > 0) {
          console.log(
            `[inactive] Deleted ${expired.count} expired guest account(s): ${expired.names.join(", ")}`
          );
          for (const partyId of expired.partyIds || []) {
            await updateOrDeleteParty(io, db, partyId);
          }
        }
      } catch (e) {
        console.warn("expired guest cleanup failed:", e?.message || e);
      }
    } catch (e) {
      console.warn("inactive cleanup failed:", e?.message || e);
    } finally {
      _cleanupRunning = false;
    }
  }

  setInterval(cleanupInactiveMembers, 1000 * 60 * 30);
  cleanupInactiveMembers();

  // Update status to offline (every minute)
  let _offlineMarkRunning = false;
  async function inactiveStatus() {
    if (_offlineMarkRunning) return;
    _offlineMarkRunning = true;
    try {
      const marked = await db.setOfflineIfLastSeenOlderThan(3);
      if (marked > 0) {
        console.log(
          `[inactive] Marked ${marked} user(s) offline due to last_seen > 3 minutes`
        );
      }
    } catch (e) {
      console.warn("offline status mark failed:", e?.message || e);
    } finally {
      _offlineMarkRunning = false;
    }
  }
  setInterval(inactiveStatus, 1000 * 60);
  inactiveStatus();

  return { cleanupInactiveMembers, inactiveStatus };
}

module.exports = { startCleanupJobs };
