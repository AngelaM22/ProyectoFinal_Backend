const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      cantidad: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  estado: { type: String, enum: ['pendiente', 'enviado', 'entregado'], default: 'pendiente' }
}, {
  timestamps: true  // genera createdAt y updatedAt
});

module.exports = mongoose.model('Order', orderSchema);
