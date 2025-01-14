const { validationResult, check } = require("express-validator");
const User = require("../models/User");

// Middleware de validación
const validateUser = [
  check("email").isEmail().withMessage("Must be valid email."),
];

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
