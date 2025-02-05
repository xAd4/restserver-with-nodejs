const { response } = require("express");
const uploadArchive = require("../helpers/upload-archive");

const uploads = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
    res.status(400).json({ msg: "Not there's archives" });
    return;
  }

  const completePath = await uploadArchive(req.files);
  res.json({ path: completePath });
};

module.exports = {
  uploads,
};
