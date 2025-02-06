const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadArchive = (
  files,
  extensionAllowed = ["png", "jpg", "jpeg", "gif", "pdf", "txt", "md"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { archive } = files;
    const nameCut = archive.name.split(".");
    const extension = nameCut[nameCut.length - 1];

    // Validar la extensión
    if (!extensionAllowed.includes(extension))
      return reject("Extension not valid.");

    // Name uuid
    const nameTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads", folder, nameTemp);

    archive.mv(uploadPath, (err) => {
      if (err) return reject(err);
      resolve("File uploaded to" + uploadPath);
    });
  });
};

module.exports = uploadArchive;
