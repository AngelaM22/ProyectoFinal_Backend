
const Order = require('../models/order');

exports.getPagos = async (req, res) => {
  try {
    const pagos = await Payment.find()
      .populate('usuario', 'nombre email')
      .populate('orden', 'estado');
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener pagos', error: error.message });
  }
};

exports.simularPago = async (req, res) => {
  try {
    const { ordenId } = req.body;

    const orden = await Order.findById(ordenId);
    if (!orden) return res.status(404).json({ msg: 'Orden no encontrada' });

    const pago = new Payment({
      usuario: req.user.id,
      orden: orden._id,
      total: orden.total,
      metodo: 'Simulado'
    });

    await pago.save();
    
    //Notificación automática
    await Noti.crear(`💳 Nuevo pago simulado para la orden ${orden._id}`);

    res.status(201).json({ msg: 'Pago simulado exitosamente', pago });
  } catch (error) {
    res.status(500).json({ msg: 'Error al simular pago', error: error.message });
  }
};
