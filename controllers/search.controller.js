const { response } = require("express");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { ObjectId } = require("mongoose").Types;

// Colecciones de busqueda permitidas
const collectionAllowed = ["users", "category", "product"];

// Busqueda de usuarios
const searchUser = async (term, res = response) => {
  const isMongoId = ObjectId.isValid(term);

  // Si el usuario coloca un ID como término, devuelve el usuario por su ID
  if (isMongoId) {
    const user = await User.findById(term);
    return res.status(200).json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i"); // Expresión regular para mejorar el search

  // Busca el usuario tanto como por su nombre y su email

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.status(200).json({
    results: users,
  });
};

// Busqueda de categorias
const searchCategory = async (term, res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.status(200).json({ results: category ? [category] : [] });
  }

  const regex = new RegExp(term, "i"); // Expresión regular para mejorar el search

  const categories = await Category.find({ name: regex, state: true });

  res.status(200).json({
    results: categories,
  });
};

// Busqueda de productos
const searchProduct = async (term, res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term).populate("category", "name");
    return res.status(200).json({ results: product ? [product] : [] });
  }

  const regex = new RegExp(term, "i"); // Expresión regular para mejorar el search

  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ state: true }],
  }).populate("category", "name");

  res.status(200).json({
    results: products,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Collection allowed are: ${collectionAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(term, res);
      break;

    case "category":
      searchCategory(term, res);
      break;

    case "product":
      searchProduct(term, res);
      break;

    default:
      res.status(500).json("Not defined.");
  }
};

module.exports = search;
