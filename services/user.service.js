const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET
// Lógica para obtener todos los usuarios
const getUsers = async (req = request, res = response) => {
  const { limit = 100, since = 0 } = req.query || {};
  const query = { state: true };

  const [totalUser, user] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  return { user, totalUser };
};

// POST
// Lógica para crear un usuario
const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

// PUT
// Lógica para actualizar un usuario
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

// DELETE
// Lógica para "borrar" un usuario
const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { state: false });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
