const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const WhatsAppNoti=require('../controllers/noti-what.controller');
const notiController = require('../controllers/notification.controller');

router.get('/', verifyToken(['admin']), notiController.obtener);
router.put('/leidas', verifyToken(['admin']), notiController.marcarLeidas);

module.exports = router;
