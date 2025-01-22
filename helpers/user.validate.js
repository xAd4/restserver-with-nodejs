const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const roleValidator = require("./role-db.validate");
const emailValidator = require("./email-db.validate");
const userByIdValidator = require("./userById-db.validate");

// Middleware de validación
const validateUser = [
  check("email").custom(emailValidator),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and must has 6 characters"),
  check("role").custom(roleValidator),
  validate,
];

const validatePutUser = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(userByIdValidator),
  check("role").custom(roleValidator),
  validate,
];

const validateUserDelete = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(userByIdValidator),
  validate,
];

const validateAuth = [
  check("email").isEmail(),
  check("password").not().isEmpty().withMessage("Password is required"),
  validate,
];

module.exports = {
  validateUser,
  validatePutUser,
  validateUserDelete,
  validateAuth,
};
