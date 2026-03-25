const qrService = require('../services/qrService');
const logger = require('../utils/logger');


function getHealth(req, res) {
  res.json({ ok: true, service: 'backend' });
}


async function createQrCode(req, res) {
  const { username, dateOfBirth } = req.body || {};

  if (
    username == null ||
    typeof username !== 'string' ||
    !String(username).trim()
  ) {
    return res.status(400).json({ error: 'username is required' });
  }

  if (dateOfBirth == null || typeof dateOfBirth !== 'string') {
    return res.status(400).json({ error: 'dateOfBirth is required (YYYY-MM-DD)' });
  }

  const name = String(username).trim();
  const dob = String(dateOfBirth).trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return res.status(400).json({ error: 'dateOfBirth must be YYYY-MM-DD' });
  }

  try {
    
    const row = await qrService.createQrCode(name, dob);
    return res.status(201).json(row);

  } catch (err) {
    if (err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Token collision; retry the request' });
    }
    logger.error(err);
    return res.status(500).json({ error: 'Failed to store QR record' });
  }
}

module.exports = {
  getHealth,
  createQrCode,
};
