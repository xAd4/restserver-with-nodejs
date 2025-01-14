const express = require("express");
const { createUser, validateUser } = require("../controllers/user.controller");

const router = express.Router();
router.post("/", validateUser, createUser);

module.exports = router;
