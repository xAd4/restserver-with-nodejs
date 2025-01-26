const User = require("../models/User");

// Verifica si existe un ID en la base de datos de usuarios
const userByIdValidator = async (id) => {
  const userIdExists = await User.findById({ _id: id });
  if (!userIdExists) {
    throw new Error(`ID ${id} not found.`);
  }
};

module.exports = userByIdValidator;
