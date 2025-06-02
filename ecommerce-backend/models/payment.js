const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orden: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  metodo: { type: String, default: 'Simulado' }, // Tunki, tarjeta, etc.
});

module.exports = mongoose.model('payment', paymentSchema);
