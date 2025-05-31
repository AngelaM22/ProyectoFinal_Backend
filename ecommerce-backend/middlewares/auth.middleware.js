const jwt = require('jsonwebtoken');

const verifyToken = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ msg: 'Token no proporcionado' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Verificar si el rol es permitido
      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(decoded.rol)) {
        return res.status(403).json({ msg: 'No tienes permiso para esta acción' });
      }

      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token inválido' });
    }
  };
};

module.exports = verifyToken;
