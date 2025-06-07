const notiController = require('../controllers/notification.controller');

exports.confirmarPedido = async (req, res) => {
  try {
    const usuario = req.usuario;

    // Notificación
    await notiController.crear(`📦 Pedido confirmado por ${usuario.nombre}. Revisa WhatsApp o el panel de órdenes.`);

    res.json({ msg: 'Pedido confirmado y enviado por WhatsApp' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al confirmar pedido', error: err.message });
  }
};
