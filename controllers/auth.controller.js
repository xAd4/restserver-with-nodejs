const { response } = require("express");
const { loginUser } = require("../services/auth.service");

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

module.exports = { login };
