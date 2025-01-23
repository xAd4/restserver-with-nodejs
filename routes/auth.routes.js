const express = require("express");
const { login, googleSignIn } = require("../controllers/auth.controller");
const {
  validateAuth,
  validateAuthGoogle,
} = require("../helpers/user.validate");

const router = express.Router();

router.post("/login", validateAuth, login);
router.post("/google", validateAuthGoogle, googleSignIn);

module.exports = router;
