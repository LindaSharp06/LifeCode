const db = require('../config/db');

async function insertQrCode({ username, dateOfBirth, token, createdAt }) {
  const sql = `
    INSERT INTO qr_codes (username, date_of_birth, token, created_at, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await db.execute(sql, [username, dateOfBirth, token, createdAt, 0]);
    return {
      result
    };
  } catch (err) {
    console.error('DB Insert Error:', err);
    throw err;
  }
}

async function getAllQrCodes() {
  const sql = `SELECT * FROM qr_codes ORDER BY created_at DESC`;
  try {
    const [rows] = await db.execute(sql);
    return rows; 
  } catch (err) {
    console.error('DB Fetch Error:', err);
    throw err;
  }
}

module.exports = {
  insertQrCode,
  getAllQrCodes
};
