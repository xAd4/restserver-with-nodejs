const User = require("../models/User");

const emailValidator = async function (email) {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`Email ${email} exists already.`);
  }
};

module.exports = { emailValidator };
