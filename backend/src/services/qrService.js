const crypto = require('crypto');
const qrCodeModel = require('../models/qrCodeModel');

function generateQrToken(username, dateOfBirth, currentDateIso) {
  const secret =
    process.env.QR_TOKEN_SECRET ||
    'dev-only-set-QR_TOKEN_SECRET-for-production';
  const payload = `${String(username).trim()}\n${dateOfBirth}\n${currentDateIso}`;
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Builds token from username + current server time + DOB, persists to qr_codes.
 */
function createQrCode(username, dateOfBirth) {
  const createdAt = new Date().toISOString();
  const token = generateQrToken(username, dateOfBirth, createdAt);
  // console.log(username,dateOfBirth,token,createdAt);
  return qrCodeModel.insertQrCode({
    username,
    dateOfBirth,
    token,
    createdAt,
  });
}

async function getCodeList() {
  return await qrCodeModel.getAllQrCodes();
}

module.exports = {
  generateQrToken,
  createQrCode,
  getCodeList
};
