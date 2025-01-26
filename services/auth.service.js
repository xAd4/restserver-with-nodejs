const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateJWT = require("../utils/jwt/generate-jwt");

// Lógica para loguear un usuario
const loginUser = async (email, password) => {
  // Verificar correo
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found with that email");
  }

  // Verificar si está activo
  if (!user.state) {
    throw new Error("User is not active.");
  }

  // Verificar contraseña
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw new Error("Password is incorrect.");
  }

  // Generar JWT
  const token = await generateJWT(user.id);

  return { user, token };
};

module.exports = { loginUser };
