const { response } = require("express");
const path = require("path");

const uploads = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
    res.status(400).json({ msg: "Not there's archives" });
    return;
  }

  const { archive } = req.files;
  const nameCut = archive.name.split(".");
  const extension = nameCut[nameCut.length - 1];

  // Validar la extensión
  const extensionAllowed = ["png", "jpg", "jpeg", "gif", "pdf"];
  if (!extensionAllowed.includes(extension))
    return res
      .status(400)
      .json({ msg: `The archive extension must be ${extensionAllowed}` });

  const uploadPath = path.join(__dirname, "../uploads", archive.name);
  archive.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ err });
    res.json({ msg: "File uploaded to" + uploadPath });
  });
};

module.exports = {
  uploads,
};
