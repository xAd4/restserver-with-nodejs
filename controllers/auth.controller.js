const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateJWT = require("../utils/jwt/generate-jwt");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Verificar correo
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ Error: "User not found with that email" });

    // Verificar si está activo
    if (!user.state)
      return res.status(400).json({ Error: "User is not active." });

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({ Error: "Password is incorrect." });
    // Genera JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Contact with the administrator" });
  }
  res.json({
    msg: "Login",
  });
};

module.exports = { login };
