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


module.exports = {
    pool,
    runQuery
};