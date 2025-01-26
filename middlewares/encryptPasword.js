const bcrypt = require("bcryptjs");

// Middleware para encriptar y hashear la contraseña de un usuario creado
// Debe mantenerse como función normal para que funcione correctamente!
const encryptPassword = async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
};

module.exports = encryptPassword;
