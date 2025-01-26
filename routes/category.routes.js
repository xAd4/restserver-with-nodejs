const express = require("express");
const {
  getCategories,
  getCategoryByID,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const {
  validateCategory,
  validateIdCategory,
  validateGetByIdCategory,
} = require("../helpers/general-validators");

const router = express.Router();

// Endpoints de categorías
router.get("/", getCategories);
router.get("/:id", validateGetByIdCategory, getCategoryByID);
router.post("/", validateCategory, postCategory);
router.put("/:id", validateIdCategory, putCategory);
router.delete("/:id", validateIdCategory, deleteCategory);

module.exports = router;
