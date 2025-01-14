const User = require("../models/User");

// POST
const createUser = async function (req, res) {
  try {
    const { name, email, password, img, role } = req.body;
    const user = new User({ name, email, password, img, role });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error} ` });
  }
};

// GET
const getUsers = async function (req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: `Error GET: ${error}` });
  }
};

module.exports = {
  createUser,
  getUsers,
};
