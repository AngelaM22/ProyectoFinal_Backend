const Order = require('../models/order');
const Product = require('../models/product');
const Orden = require('../models/order');
const Noti = require('./notification.controller');
const notiController = require('./notification.controller');

exports.crearOrden = async (req, res) => {
  try {
    const { productos } = req.body;
    const userId = req.user.id;

    let total = 0;

    for (const item of productos) {
      const producto = await Product.findById(item.producto);
      if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ msg: `Stock insuficiente para ${producto.nombre}` });
      }
      total += producto.precio * item.cantidad;
      producto.stock -= item.cantidad;
      await producto.save();
    }

    const nuevaOrden = new Order({ usuario: userId, productos, total });
    await nuevaOrden.save();

    await Noti.crear(`Nueva orden creada por el usuario ${req.user.id}`);

    res.status(201).json({ msg: 'Orden creada con éxito', orden: nuevaOrden });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la orden', error: error.message });
  }
};

exports.obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Order.find()
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre precio imagen');
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener órdenes', error: error.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const orden = await Orden.findById(id);
    if (!orden) return res.status(404).json({ msg: 'Orden no encontrada' });

    orden.estado = estado;
    await orden.save();

    res.json({ msg: 'Estado actualizado', orden });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar estado', error: error.message });
  }
};

exports.confirmarPedido = async (req, res) => {
  try {
    const usuario = req.usuario;

    await notiController.crear(`📦 Pedido confirmado por ${usuario.nombre}. Revisa WhatsApp o el panel de órdenes.`);

    res.json({ msg: 'Pedido confirmado y enviado por WhatsApp' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al confirmar pedido', error: err.message });
  }
};
