const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

// Ruta: /api/admin/dashboard
router.get('/dashboard', verifyToken(['admin']), async (req, res) => {
  try {
    const totalUsuarios = await User.countDocuments();
    const totalProductos = await Product.countDocuments();
    const totalOrdenes = await Order.countDocuments();
    const totalVentas = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const productosPopulares = await Order.aggregate([
      { $unwind: "$productos" },
      {
        $group: {
          _id: "$productos.nombre",
          cantidad: { $sum: "$productos.cantidad" }
        }
      },
      { $sort: { cantidad: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalUsuarios,
      totalProductos,
      totalOrdenes,
      totalVentas: totalVentas[0]?.total || 0,
      productosPopulares
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener métricas', error: error.message });
  }
});


// NUEVO: Ruta para obtener las ventas
router.get('/ventas', verifyToken(['admin']), async (req, res) => {
  try {
    const ventas = await Order.find().sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener ventas', error: error.message });
  }
});

// NUEVO: Ruta para obtener logs de pagos
router.get('/logs', verifyToken(['admin']), async (req, res) => {
  try {
    const logs = await Pago.find().sort({ fecha: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener logs de pago', error: error.message });
  }
});

module.exports = router;
