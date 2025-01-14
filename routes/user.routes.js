const express = require("express");
const createUser = require("../controllers/user.controller");
const validateUser = require("../helpers/user.validate");

const router = express.Router();
router.post("/", validateUser, createUser);

module.exports = router;
