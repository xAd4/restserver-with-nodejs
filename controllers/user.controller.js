const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

// PUT
const updateUsers = async function (req, res) {
  try {
    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      rest.password = await bcrypt.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(id, rest, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "Not found." });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error} to update user.` });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUsers,
};
