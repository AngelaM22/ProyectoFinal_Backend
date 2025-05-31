const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth.middleware'); // lo creamos en el siguiente paso

// Crear producto (solo admin)
router.post('/', verifyToken(['admin']), productController.createProduct);

// Obtener todos los productos
router.get('/', productController.getProducts);

// Obtener productos por categoría
router.get('/categoria/:categoria', productController.getByCategoria);

// Editar producto (solo admin)
router.put('/:id', verifyToken(['admin']), productController.updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', verifyToken(['admin']), productController.deleteProduct);

//
router.get('/categorias', productController.getCategorias);

module.exports = router;
