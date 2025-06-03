const mongoose = require('mongoose');

const paymentLogSchema = new mongoose.Schema({
  ordenId: String,
  tarjeta: String, // Se puede guardar enmascarado tipo "****1234"
  estado: String,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pago', paymentLogSchema);
