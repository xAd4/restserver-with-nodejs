const express = require("express");
const { login, googleSignIn } = require("../controllers/auth.controller");
const {
  validateAuth,
  validateAuthGoogle,
} = require("../helpers/general-validators");

const router = express.Router();

// Endpoints de autenticaciones
router.post("/login", validateAuth, login);
router.post("/google", validateAuthGoogle, googleSignIn);

module.exports = router;
