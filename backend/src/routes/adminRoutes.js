const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();
// console.log('asdfasdf');
router.get('/health', adminAuth, adminController.getHealth);
router.post('/qr-codes', adminController.createQrCode);
module.exports = router;
