const express = require("express");
const { login } = require("../controllers/auth.controller");
const { validateAuth } = require("../helpers/user.validate");

const router = express.Router();

router.post("/login", validateAuth, login);

module.exports = router;
