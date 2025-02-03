const Product = require("../models/Product");

const productValidator = async (name) => {
  const productExists = await Product.findOne({ name });
  if (!productExists) throw new Error(`Category: ${name} exists already.`);
};

module.exports = productValidator;
