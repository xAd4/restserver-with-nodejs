const { validationResult, check } = require("express-validator");
const User = require("../models/User");
const { validate } = require("../middlewares/validate");
const Role = require("../models/Role");

// Middleware de validación
const validateUser = [
  check("email").isEmail().withMessage("Must be valid email."),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and must has 6 characters"),
  check("role").custom(async function (role) {
    const roleExists = await Role.findOne({ role: role.toLowerCase() });
    if (!roleExists) {
      throw new Error(`Role ${role} not valid.`);
    }
  }),
  validate,
];

const createUser = async (req, res) => {
  try {
    const { name, email, password, img, role } = req.body;
    const user = new User({ name, email, password, img, role });

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email exists already" });
    }

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error} ` });
  }
};

module.exports = {
  validateUser,
  createUser,
};
