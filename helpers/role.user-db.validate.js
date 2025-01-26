const Role = require("../models/Role");

// Valida si no existe un rol en la base de datos de roles
const roleValidator = async (role) => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} not valid.`);
  }
};

module.exports = roleValidator;
