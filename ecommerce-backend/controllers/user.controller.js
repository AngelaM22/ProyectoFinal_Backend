const User = require('../models/user');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // sin contraseña
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener usuarios', error: error.message });
  }
};

// Cambiar rol del usuario
exports.changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    if (!['admin', 'cliente'].includes(rol)) {
      return res.status(400).json({ msg: 'Rol inválido' });
    }

    const user = await User.findByIdAndUpdate(id, { rol }, { new: true });
    res.json({ msg: 'Rol actualizado', user });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar rol', error: error.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ msg: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar usuario', error: error.message });
  }
};
