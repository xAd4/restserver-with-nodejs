const { response } = require("express");
const fs = require("fs");
const path = require("path");
const uploadArchive = require("../helpers/upload-archive");
const { User, Product } = require("../models/index");

// Carga de archivos
const uploads = async (req, res = response) => {
  try {
    const completePath = await uploadArchive(
      req.files,
      ["jpg", "png"],
      "textos"
    );
    res.json({ path: completePath });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Cambiar la imagen de un usuario o un producto y que se vea reflejado en la base de datos
const updateImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res.status(400).json({ msg: `Not exists user with id ${id}` });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `Not exists product with id ${id}` });
      break;

    default:
      return res.status(500).json({ msg: "Not allowed." });
  }

  // Limpiar imagenes previas
  if (model.img) {
    // Borrar la imagen del servidor
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const name = await uploadArchive(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

const showImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res.status(400).json({ msg: `Not exists user with id ${id}` });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `Not exists product with id ${id}` });
      break;

    default:
      return res.status(500).json({ msg: "Not allowed." });
  }

  // Limpiar imagenes previas
  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }
  const pathImageNotFound = path.join(__dirname, "../assets", "no-image.jpg");
  res.sendFile(pathImageNotFound);
};

module.exports = {
  uploads,
  updateImage,
  showImage,
};
