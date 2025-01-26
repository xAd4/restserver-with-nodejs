const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateJWT = require("../utils/jwt/generate-jwt");
const googleVerify = require("../utils/google-verify");

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

  // Verificar si es de Google
  if (user.google) {
    throw new Error("Login with Google.");
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

const googleSignInUser = async (idToken) => {
  const { name, picture, email } = await googleVerify(idToken);

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      name,
      email,
      password: null,
      picture,
      google: true,
    });
    await user.save();
  }

  if (!user.state) {
    throw new Error("User banned or not exists.");
  }

  const token = generateJWT(user.id);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
    token,
  };
};

module.exports = { loginUser, googleSignInUser };
