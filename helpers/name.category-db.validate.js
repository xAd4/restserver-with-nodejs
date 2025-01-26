const Category = require("../models/Category");

// Valida si el nombre de una categoría ya existe en la base de datos de categories
const categoryValidator = async (name) => {
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error(`Category: ${name} exists already.`);
  }
};

module.exports = categoryValidator;
