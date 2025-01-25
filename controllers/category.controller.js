const { response } = require("express");
const categoryService = require("../services/category.service");

// GET
const getCategories = async (req, res = response) => {
  try {
    const { category, totalCategory } = await categoryService.getCategories(
      req
    );
    res.status(200).json({ totalCategory, category });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// GET by ID
const getCategoryByID = async (req, res = response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// POST
const postCategory = async (req, res = response) => {
  try {
    const category = await categoryService.postCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// PUT
const putCategory = async (req, res = response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.putCategory(id, req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// DELETE
const deleteCategory = async (req, res = response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.deleteCategory(id);
    res
      .status(200)
      .json({ "Category deleted": `Category ${category.name} deleted` });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  getCategories,
  postCategory,
  getCategoryByID,
  putCategory,
  deleteCategory,
};
