const User = require('../models/user');

// GET: Ver todos los usuarios (sin contraseña)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener usuarios', error: error.message });
  }
};

// PUT: Cambiar rol
exports.changeRole = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  if (!['admin', 'cliente'].includes(rol)) {
    return res.status(400).json({ msg: 'Rol inválido' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { rol }, { new: true });
    res.json({ msg: 'Rol actualizado', user });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar rol', error: error.message });
  }
};

// DELETE: Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar usuario', error: error.message });
  }
};
