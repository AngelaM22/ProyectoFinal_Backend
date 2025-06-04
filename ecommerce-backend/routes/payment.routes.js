const express = require('express');
const router = express.Router();
const culqiController = require('../controllers/payment.controller');

router.post('/pagar', culqiController.realizarPago);

module.exports = router;
