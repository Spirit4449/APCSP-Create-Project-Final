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



module.exports = {
    pool,
    runQuery,
    deleteEmptyParties
};
