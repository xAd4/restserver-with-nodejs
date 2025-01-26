const User = require("../models/User");

// Valida si existe un email en la base de datos de users
const emailValidator = async (email) => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`Email ${email} exists already.`);
  }
};

module.exports = emailValidator;
