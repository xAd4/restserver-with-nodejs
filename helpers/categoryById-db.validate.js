const Category = require("../models/Category");

const categoryByIdValidator = async (id) => {
  const categoryById = await Category.findOne({ _id: id });
  if (!categoryById) {
    throw new Error(`Category with id: ${id} does not exist`);
  }
};

module.exports = categoryByIdValidator;
