const { response } = require("express");
const Category = require("../models/Category");
const categoryService = require("../services/category.service");

// GET
const getCategories = async (req, res) => {
  try {
    const { category, totalCategory } =
      await categoryService.getServiceCategories(req);
    res.status(200).json({ totalCategory, category });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// GET by ID
const getCategoriesByID = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoriesByID(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// POST
const postCategories = async (req, res = response) => {
  try {
    const category = await categoryService.postServiceCategories(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// PUT
const putCategories = async (req, res = response) => {
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
  postCategories,
  getCategoriesByID,
  putCategories,
  deleteCategory,
};
