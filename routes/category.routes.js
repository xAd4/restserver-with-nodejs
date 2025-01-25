const express = require("express");
const {
  getCategories,
  getCategoryByID,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryByID);
router.post("/", postCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
