// Archivo de barril

const validate = require("./validate");
const validateJWT = require("./validate-jwt");
const { isAdmin, hasRole } = require("./validate-role");

module.exports = { validate, validateJWT, isAdmin, hasRole };
