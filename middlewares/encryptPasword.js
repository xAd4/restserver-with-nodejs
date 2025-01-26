const bcrypt = require("bcryptjs");

// Middleware para encriptar y hashear la contraseña de un usuario creado
const encryptPassword = async function (next) {
  // Si el usuario es de Google, no hashea contraseña
  if (this.google) {
    return next();
  }

  // Si la contraseña no ha sido modificada, no hagas nada
  if (!this.isModified("password")) {
    return next();
  }

  // Hashea la contraseña solo para usuarios locales
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
};

module.exports = encryptPassword;
