const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const culqiController = require('../controllers/culqi.controller');

// Ruta para procesar pago
router.post('/pago', verifyToken(['cliente', 'admin']), culqiController.procesarPago);

module.exports = router;
