const { response } = require("express");
const uploadArchive = require("../helpers/upload-archive");
const { User, Product } = require("../models/index");

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

  const name = await uploadArchive(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

module.exports = {
  uploads,
  updateImage,
};
