const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.post('/checkout', paymentController.procesarPago);

module.exports = router;
