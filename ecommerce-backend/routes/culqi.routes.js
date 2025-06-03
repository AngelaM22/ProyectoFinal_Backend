const express = require('express');
const router = express.Router();
const culqiController = require('../controllers/culqi.controller');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/pago', verifyToken(['cliente', 'admin']), culqiController.procesarPago);

module.exports = router;
