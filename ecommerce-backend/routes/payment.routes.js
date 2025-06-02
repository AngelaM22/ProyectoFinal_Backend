const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/payment.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', verifyToken(['admin']), pagoController.getPagos);

module.exports = router;
