const { response } = require("express");

const validateArchive = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
    return res
      .status(400)
      .json({ msg: "Not there's archives - validateArchive" });
  }
  next();
};

module.exports = validateArchive;
