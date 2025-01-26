const { response } = require("express");
const { loginUser, googleSignInUser } = require("../services/auth.service");
const User = require("../models/User");
const googleVerify = require("../utils/google-verify");
const generateJWT = require("../utils/jwt/generate-jwt");

// Controlador para el login por JWT
const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Error: error.message });
  }
};

// Controlador para el login por Google Verify
const googleSignIn = async (req, res = response) => {
  try {
    const { id_token } = req.body;
    const { user, token } = await googleSignInUser(id_token);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, googleSignIn };
