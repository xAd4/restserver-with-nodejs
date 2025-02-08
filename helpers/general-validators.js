const { check } = require("express-validator");
const {
  validate,
  validateJWT,
  isAdmin,
  hasRole,
  validateArchive,
} = require("../middlewares/");
const {
  emailValidator,
  roleValidator,
  userByIdValidator,
  categoryValidator,
  categoryByIdValidator,
  productValidator,
} = require("./");
const collectionAllowed = require("./collection-db.validate");

// Middleware de validaciones

// Validaciones del modelo User
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
  validateJWT,
  isAdmin,
  hasRole("admin", "user"),
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(userByIdValidator),
  check("role").custom(roleValidator),
  validate,
];

const validateUserDelete = [
  validateJWT,
  isAdmin,
  hasRole("admin", "user"),
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("id").custom(userByIdValidator),
  validate,
];

// Validaciones de la autenticación
const validateAuth = [
  check("email").isEmail(),
  check("password").not().isEmpty().withMessage("Password is required"),
  validate,
];

// Validaciones del Google Verify
const validateAuthGoogle = [check("id_token").not().isEmpty(), validate];

// Validaciones del modelo Category
const validateCategory = [
  validateJWT,
  check("name").custom(categoryValidator),
  validate,
];

const validateIdCategory = [
  validateJWT,
  isAdmin,
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  validate,
];

const validateGetByIdCategory = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  validate,
];

// Validaciones del modelo Product
const validateProduct = [check("name").custom(productValidator), validate];

const validateIdProduct = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  validateJWT,
  isAdmin,
  validate,
];

const validatePostProduct = [
  check("name").not().isEmpty().withMessage("Name is required"),
  validate,
];

// Validaciones uploads

const validateUploads = [
  check("id").isMongoId().withMessage("Must be Mongo ID"),
  check("collection").custom((c) =>
    collectionAllowed(c, ["users", "products"])
  ),
  validate,
];

module.exports = {
  validateUser,
  validatePutUser,
  validateUserDelete,
  validateAuth,
  validateAuthGoogle,
  validateCategory,
  validateIdCategory,
  validateGetByIdCategory,
  validateProduct,
  validateIdProduct,
  validatePostProduct,
  validateUploads,
};
