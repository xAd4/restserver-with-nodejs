const { response } = require("express");
const { loginUser } = require("../services/auth.service");
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
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ":p",
        picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state)
      return res.status(400).json({ msg: "User not exists or user blocked." });

    const token = generateJWT(user.id);

    res.json({ msg: user, token });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { login, googleSignIn };
