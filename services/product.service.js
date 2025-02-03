const { request, response } = require("express");
const Product = require("../models/Product");

// GET
// Lógica para obtener todos los productos
const getProduct = async (req = request, res = response) => {
  const { limit = 100, since = 0 } = req.query || {};
  const query = { state: true };

  const [totalProducts, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  return { totalProducts, products };
};

// POST
// Lógica para crear un usuario
const createProduct = async (data) => {
  const product = new Product(data);
  await product.save();
  return product;
};

// PUT
// Lógica para actualizar un usuario
const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// DELETE
// Lógica para "borrar" un usuario
const deleteProduct = async (id) => {
  return await Product.findByIdAndUpdate(id, { state: false });
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
