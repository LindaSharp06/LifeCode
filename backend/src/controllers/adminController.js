const qrService = require('../services/qrService');
const logger = require('../utils/logger');
const QRCode = require("qrcode");
const archiver = require("archiver");

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

async function getQrCodeList(req,res){

  try {
    const list = await qrService.getCodeList();

    if (!list) {
      return res.json([]);
    }
    else {
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch QR codes' });
  }
}

async function fileDownload(req,res){
  
  try {
    const  {qrCodes}  = req.body;
    // return res.json(qrCodes);
    // qrCodes = [{ token, partner_name }]
    
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=qr_codes.zip"
    );

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    // for (const qr of qrCodes) {
      
      const url = `https://yourdomain.com/start?code=${qrCodes.token}`;
      console.log(url);
      const qrBuffer = await QRCode.toBuffer(url);

      const fileName = `${qrCodes.partner_name}_${qrCodes.token}.png`;

      archive.append(qrBuffer, { name: fileName });
    // }

    await archive.finalize();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating ZIP");
  }
}

module.exports = {
  getHealth,
  createQrCode,
  getQrCodeList,
  fileDownload
};
