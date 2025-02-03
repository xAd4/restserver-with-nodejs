const { response } = require("express");
const productService = require("../services/product.service");

// GET
// Controlador para conseguir todas los productos
const getProduct = async (req, res = response) => {
  try {
    const { totalProduct, products } = await productService.getProduct(req);
    res.status(200).json({ totalProduct, products });
  } catch (error) {
    res.status(400).json({ message: `Has error ${error.message}` });
  }
};

// POST
// Controlador para creación de nuevo product
const createProduct = async (req, res = response) => {
  try {
    const product = productService.createProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: `Has error ${error.message}` });
  }
};

// PUT
// Controlador para actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = productService.updateProduct(id, req.body);

    if (!updateProduct) return res.status(401).json("Product not found.");

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(400).json({ message: `Has error ${error.message}` });
  }
};

// DELETE
// Controlador para "borrar" un producto
const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = productService.deleteProduct(id);

    if (!deleteProduct) return res.status(401).json("Product not found.");

    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(400).json({ message: `Has error ${error.message}` });
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
