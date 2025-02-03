const express = require("express");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  validateProduct,
  validateIdProduct,
  validatePostProduct,
} = require("../helpers/general-validators");

const router = express.Router();

// Endpoints de productos
router.get("/", getProduct);
router.post("/", validatePostProduct, createProduct);
router.put("/:id", validateIdProduct, updateProduct);
router.delete("/:id", validateIdProduct, deleteProduct);

module.exports = router;
