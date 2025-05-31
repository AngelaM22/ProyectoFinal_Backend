const Product = require('../models/product');

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ msg: 'Producto creado', product });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear producto', error: error.message });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener productos', error: error.message });
  }
};

// Obtener productos por categoría
exports.getByCategoria = async (req, res) => {
  try {
    const productos = await Product.find({ categoria: req.params.categoria });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al buscar por categoría', error: error.message });
  }
};

// Editar producto
exports.updateProduct = async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Producto actualizado', producto });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar producto', error: error.message });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar producto', error: error.message });
  }
};

// Obtener categorías distintas
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Product.distinct('categoria');
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener categorías', error: error.message });
  }
};

