const Role = require("../models/Role");

// Verifica si existe un ID en la base de datos de usuarios
const userByIdValidator = async (id) => {
  const userIdExists = await Role.findById(id);
  if (userIdExists) {
    throw new Error(`ID ${id} not found.`);
  }
};

module.exports = userByIdValidator;
