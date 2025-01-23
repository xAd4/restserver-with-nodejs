const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limit = 100, since = 0 } = req.query || {};
  const query = { state: true };

  const [totalUser, user] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  return { user, totalUser };
};

const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

const updateUser = async (id, data) => {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }

  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { state: false });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
