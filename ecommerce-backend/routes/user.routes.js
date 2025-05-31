const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Ver todos los usuarios
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

// Cambiar rol de usuario
router.put('/:id/rol', verifyToken, isAdmin, userController.changeRole);

// Eliminar usuario
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
