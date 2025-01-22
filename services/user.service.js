const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

const getUsers = async (req = request, res = response) => {
  const { limit = 15, since = 1 } = req.query || {};
  return await User.find().skip(Number(since)).limit(Number(limit));
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

module.exports = {
  createUser,
  getUsers,
  updateUser,
};
