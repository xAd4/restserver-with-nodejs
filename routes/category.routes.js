const express = require("express");
const {
  getCategories,
  postCategories,
  getCategoriesByID,
  putCategories,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoriesByID);
router.post("/", postCategories);
router.put("/:id", putCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
