const { response } = require("express");
const Category = require("../models/Category");

// GET
const getServiceCategories = async (req, res = response) => {
  const { limit = 100, since = 0 } = req.query || {};
  const query = { state: true };
  const [totalCategory, category] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).skip(Number(since)).limit(Number(limit)),
  ]);
  return { category, totalCategory };
};

// GET by ID
const getCategoriesByID = async (id, data) => {
  return await Category.findById(id, data);
};

// POST
const postServiceCategories = async (data) => {
  const category = new Category(data);
  await category.save();
  return category;
};

// PUT
const putCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidatos: true,
  });
};

// DELETE
const deleteCategory = async (id) => {
  return await Category.findByIdAndUpdate(id, { state: false });
};

module.exports = {
  getServiceCategories,
  postServiceCategories,
  getCategoriesByID,
  putCategory,
  deleteCategory,
};
