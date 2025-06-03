const jwt = require('jsonwebtoken');

const verifyToken = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ msg: 'Acceso denegado. Token requerido.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(decoded.rol)) {
        return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción.' });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token inválido.' });
    }
  };
};

module.exports = verifyToken;
