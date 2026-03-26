const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();
router.post('/download-qr-zip',adminController.fileDownload);
// console.log('asdfasdf');
router.get('/health', adminAuth, adminController.getHealth);
router.post('/create_qr_codes', adminController.createQrCode);
router.post('/update_qrcode', adminController.updateQrCode);
router.post('/get_qrcodes_list', adminController.getQrCodeList);

module.exports = router;
