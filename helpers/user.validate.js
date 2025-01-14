const { check } = require("express-validator");
const { validate } = require("../middlewares/validate");
const roleValidator = require("./role-db.validate");

// Middleware de validación
const validateUser = [
  check("email").isEmail().withMessage("Must be valid email."),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and must has 6 characters"),
  check("role").custom(roleValidator),
  validate,
];

module.exports = { validateUser };