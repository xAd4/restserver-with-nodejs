const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const createUser = async function (req, res) {
  try {
    const { name, email, password, img, role } = req.body;
    const user = new User({ name, email, password, img, role });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error} ` });
  }
};

module.exports = createUser;
