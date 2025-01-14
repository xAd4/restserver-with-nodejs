const express = require("express");
const { createUser, getUsers } = require("../controllers/user.controller");
const validateUser = require("../helpers/user.validate");

const router = express.Router();
router.post("/", validateUser, createUser);
router.get("/", getUsers);

module.exports = router;
