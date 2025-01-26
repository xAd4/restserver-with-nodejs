const express = require("express");
const {
  getCategories,
  getCategoryByID,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { validateCategoryPost } = require("../helpers/general-validators");

const router = express.Router();

// Endpoints de categorías
router.get("/", getCategories);
router.get("/:id", getCategoryByID);
router.post("/", validateCategoryPost, postCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
