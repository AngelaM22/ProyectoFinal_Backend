const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors'); 

// Importación de rutas
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');
const validateRoutes = require('./routes/validate.routes');
const notiRoutes = require('./routes/notification.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración segura de CORS
const corsOptions = {
  origin: ['*'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch((error) => console.error('Error de conexión:', error.message));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ordenes', orderRoutes);
app.use('/api/payments/checkout', paymentRoutes);
app.use('/api', validateRoutes);  
app.use('/api/admin/notificaciones', notiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
