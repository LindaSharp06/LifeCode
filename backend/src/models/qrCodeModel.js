const db = require('../config/db');

async function insertQrCode({ username, dateOfBirth, token, createdAt }) {
  const sql = `
    INSERT INTO qr_codes (username, date_of_birth, token, created_at, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await db.execute(sql, [username, dateOfBirth, token, createdAt, 0]);
    const list = await getAllQrCodes();
    return {
      list
    };
    
  } catch (err) {
    console.error('DB Insert Error:', err);
    throw err;
  }
}

async function updateQrCode({ id, username, dateOfBirth, status }) {
  const sql = `
   UPDATE qr_codes
    SET username = ?, date_of_birth = ?, status = ?
    WHERE id = ?
  `;
  try {
    const [result] = await db.execute(sql, [username, dateOfBirth, status, id]);
    
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

async function findByToken(token) {
 
  const sql = `SELECT * FROM qr_codes WHERE token = ?`;
  
  try {
    const [rows] = await db.execute(sql, [token]);
    return rows[0];
  } catch (err) {
    console.error('DB Fetch Error:', err);
    throw err;
  }

}

async function markAsUsed(token) {
  const sql = `UPDATE qr_codes SET status = '1' WHERE token = ?`;
  // await db.execute(sql, [token]);

  try {
    const [rows] = await db.execute(sql, [token]);
    return rows;
  } catch (err) {
    console.error('DB Fetch Error:', err);
    throw err;
  }

}

module.exports = {
  insertQrCode,
  getAllQrCodes,
  updateQrCode,
  findByToken,
  markAsUsed
};
