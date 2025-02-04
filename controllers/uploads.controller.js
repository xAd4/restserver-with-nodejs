const { response } = require("express");
const path = require("path");

const uploads = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
    res.status(400).json({ msg: "Not there's archives" });
    return;
  }

  const { archive } = req.files;
  const uploadPath = path.join(__dirname, "../uploads", archive.name);
  archive.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ err });
    res.json({ msg: "File uploaded to" + uploadPath });
  });
};

module.exports = {
  uploads,
};
