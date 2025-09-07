// Match-related helper functions

/**
 * Check if a user has an active live match
 * @param {Object} db - Database instance
 * @param {number} userId - User ID to check
 * @returns {Promise<string|null>} - Match ID if live match exists, null otherwise
 */
async function getUserLiveMatch(db, userId) {
  if (!userId) return null;

  try {
    const rows = await db.runQuery(
      "SELECT m.match_id FROM matches m JOIN match_participants mp ON m.match_id = mp.match_id WHERE mp.user_id = ? AND m.status = 'live' LIMIT 1",
      [userId]
    );
    return rows.length > 0 ? rows[0].match_id : null;
  } catch (error) {
    console.error("Error checking user live match:", error);
    return null;
  }
}

module.exports = {
  getUserLiveMatch,
};
