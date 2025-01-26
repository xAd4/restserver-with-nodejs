const { response } = require("express");
const categoryService = require("../services/category.service");
const Category = require("../models/Category");

// GET
// Controlador para conseguir todas las categorías
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
// Controlador para conseguir una categoría por su ID
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
// Controlador para creación de nueva categoría
const postCategory = async (req, res = response) => {
  try {
    const category = await categoryService.postCategory(req.body);

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

// PUT
// Controlador para actualizar una categoría
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
// Controlador para "borrar" una categoría
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
