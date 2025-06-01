const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const verifyToken = require('../middlewares/auth.middleware');

// Obtener todos los pagos (admin)
router.get('/', verifyToken(['admin']), async (req, res) => {
  try {
    const pagos = await Payment.find()
      .populate('usuario', 'nombre email')
      .populate('orden', 'estado total')
      .sort({ fecha: -1 });

    res.json(pagos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener pagos', error: error.message });
  }
});

module.exports = router;
