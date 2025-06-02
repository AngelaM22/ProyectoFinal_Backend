const Notification = require('../models/notification');

// Crear nueva notificación
exports.crear = async (mensaje) => {
  const noti = new Notification({ mensaje });
  await noti.save();
};

// Obtener todas las notificaciones
exports.obtener = async (req, res) => {
  try {
    const notificaciones = await Notification.find().sort({ fecha: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener notificaciones', error: error.message });
  }
};

// Marcar como leídas
exports.marcarLeidas = async (req, res) => {
  try {
    await Notification.updateMany({ leido: false }, { leido: true });
    res.json({ msg: 'Notificaciones actualizadas' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar', error: error.message });
  }
};
