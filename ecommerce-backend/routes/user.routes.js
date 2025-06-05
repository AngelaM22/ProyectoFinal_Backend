const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth');

router.get('/', verifyToken, isAdmin, userController.getAllUsers);
router.put('/:id/rol', verifyToken, isAdmin, userController.changeRole);
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
