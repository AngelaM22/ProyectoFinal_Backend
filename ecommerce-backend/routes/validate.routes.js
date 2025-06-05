const express = require('express');
const router = express.Router();
const { validateIIN } = require('../controllers/validate.controller');

router.post('/validate-iins', validateIIN);

module.exports = router;
