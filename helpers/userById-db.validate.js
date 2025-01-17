const Role = require("../models/Role");

const userByIdValidator = async function (id) {
  const userIdExists = await Role.findById(id);
  if (userIdExists) {
    throw new Error(`ID ${id} not found.`);
  }
};

module.exports = userByIdValidator;
