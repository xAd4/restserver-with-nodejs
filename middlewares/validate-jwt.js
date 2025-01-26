const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Middleware para validar un JWT
const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) return res.status(401).json({ msg: "No token provided" });
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    const user = await User.findById(uid);

    if (!user)
      return res.status(401).json({ msg: "User not there's in database" });

    if (!user.state) return res.status(401).json({ msg: "User state: false" });

    req.userAuthenticated = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "invalid token" });
  }
};

module.exports = validateJWT;
