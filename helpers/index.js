// Archivo de barril

const roleValidator = require("./role.user-db.validate");
const emailValidator = require("./email.user-db.validate");
const userByIdValidator = require("./userById-db.validate");
const categoryValidator = require("./name.category-db.validate");
const categoryByIdValidator = require("./categoryById-db.validate");
const productValidator = require("./name.product-db.validate");
const uploadArchive = require("./upload-archive");

module.exports = {
  ...roleValidator,
  ...emailValidator,
  ...userByIdValidator,
  ...categoryValidator,
  ...categoryByIdValidator,
  ...productValidator,
  ...uploadArchive,
};
