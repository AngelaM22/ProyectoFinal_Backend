const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  leido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
