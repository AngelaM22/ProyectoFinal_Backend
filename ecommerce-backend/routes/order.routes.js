const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controllers');

// Crear orden (cliente autenticado)
router.post('/', verifyToken(['cliente', 'admin']), orderController.crearOrden);

// Ver todas las órdenes (solo admin)
router.get('/', verifyToken(['admin']), orderController.obtenerOrdenes);

// Cambiar estado de una orden
router.put('/:id', verifyToken(['admin']), orderController.actualizarEstado);

module.exports = router;
