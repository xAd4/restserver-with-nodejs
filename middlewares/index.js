// Archivo de barril

const validate = require("./validate");
const validateJWT = require("./validate-jwt");
const { isAdmin, hasRole } = require("./validate-role");
const validateArchive = require("./validate-archive");

module.exports = { validate, validateJWT, isAdmin, hasRole, validateArchive };
