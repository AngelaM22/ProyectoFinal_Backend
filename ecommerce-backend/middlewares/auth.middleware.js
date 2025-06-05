const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, 'secreto'); // Usa tu secreto JWT
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ msg: 'Token inválido' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.rol !== 'admin') {
      return res.status(403).json({ msg: 'Acceso denegado: solo administradores' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Error al verificar rol', error: error.message });
  }
};

module.exports = { verifyToken, isAdmin };
