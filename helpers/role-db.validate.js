const Role = require("../models/Role");

const roleValidator = async function (role) {
  const roleExists = await Role.findOne({ role: role.toLowerCase() });
  if (!roleExists) {
    throw new Error(`Role ${role} not valid.`);
  }
};

module.exports = { roleValidator };
