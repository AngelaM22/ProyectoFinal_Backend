const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch((error) => console.error('Error de conexión:', error.message));

// Rutas principales
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const orderRoutes = require('./routes/order.routes');
const validateRoutes = require('./routes/validate.routes');
const notiRoutes = require('./routes/notification.routes');

app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ordenes', orderRoutes);
app.use('/api', validateRoutes);
app.use('/api/admin/notificaciones', notiRoutes);

// Ruta de pagos directa (no necesitas importar payment.routes si no existe)
const pago = require('./controllers/payment.controller');

app.post('/api/payments/checkout', pago.procesarPago);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
