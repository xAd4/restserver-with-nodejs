const { response } = require("express");
const Category = require("../models/Category");

// GET
// Lógica para obtener todas las categorías
const getCategories = async (req, res = response) => {
  const { limit = 100, since = 0 } = req.query || {};
  const query = { state: true };
  const [totalCategory, category] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).skip(Number(since)).limit(Number(limit)),
  ]);
  return { category, totalCategory };
};

// GET by ID
// Lógica para obtener una categoría por su ID
const getCategoryById = async (id, data) => {
  return await Category.findById(id, data);
};

// POST
// Lógica para crear una categoría
const postCategory = async (data) => {
  const category = new Category(data);

  await category.save();
  return category;
};

// PUT
// Lógica para actualizar una categoría
const putCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidatos: true,
  });
};

// DELETE
// Lógica para "borrar" una categoría
const deleteCategory = async (id) => {
  return await Category.findByIdAndUpdate(id, { state: false });
};

module.exports = {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};
