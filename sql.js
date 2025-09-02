// Database
const mysql = require('mysql2/promise'); // Just mysql doesn't work
const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',            
  password: 'Akshardhamsql',
  database: 'game',
  connectionLimit: 10,
  queueLimit: 0
});


// Reusable MySQL query function
async function runQuery(sql, params = []) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error("MySQL query error:", error);
    throw error;
  }
}

async function getUserById(userId) {
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [userId]);
  return rows[0] || null;
}

async function getPartyIdByName(name) {
  const rows = await runQuery("SELECT party_id FROM party_members WHERE name = ? LIMIT 1", [name]);
  return rows[0]?.party_id ?? null;
}

async function fetchPartyMembersDetailed(partyId) {
  return runQuery(
    `SELECT pm.name, pm.team, u.char_class, u.status
       FROM party_members pm
       LEFT JOIN users u ON u.name = pm.name
      WHERE pm.party_id = ?
      ORDER BY pm.joined_at, pm.name`,
    [partyId]
  );
}

async function setUserStatus(name, status) {
  return runQuery("UPDATE users SET status = ? WHERE name = ?", [status, name]);
}

async function setUserSocketId(userId, socketId) {
  return runQuery("UPDATE users SET socket_id = ?, status = 'online' WHERE user_id = ?", [socketId, userId]);
}

async function clearUserSocketIfMatch(userId, socketId) {
  const rows = await runQuery("SELECT socket_id FROM users WHERE user_id = ? LIMIT 1", [userId]);
  if (rows[0]?.socket_id === socketId) {
    await runQuery("UPDATE users SET socket_id = NULL WHERE user_id = ?", [userId]);
  }
}

async function deleteEmptyParties() {
  // MySQL needs a subselect wrapper when deleting from the same table you select
  const sql = `
    DELETE FROM parties
    WHERE id IN (
      SELECT id FROM (
        SELECT p.id
        FROM parties p
        LEFT JOIN party_members m ON m.party_id = p.id
        GROUP BY p.id
        HAVING COUNT(m.name) = 0
      ) as t
    )
  `;
  try {
    const result = await runQuery(sql);
    return result.affectedRows || 0;
  } catch (err) {
    console.error("deleteEmptyParties failed:", err && err.message);
    throw err;
  }
}

async function updateLastSeen(partyId, username) {
  await runQuery(
    "UPDATE party_members SET last_seen = NOW() WHERE party_id = ? AND name = ?",
    [partyId, username]
  );
}


module.exports = {
  pool,
  runQuery,
  updateLastSeen,
  deleteEmptyParties,
  getUserById,
  getPartyIdByName,
  fetchPartyMembersDetailed,
  setUserStatus,
  setUserSocketId,
  clearUserSocketIfMatch,
};
