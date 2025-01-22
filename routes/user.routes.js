const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
} = require("../controllers/user.controller");
const { validateUser, validatePutUser } = require("../helpers/user.validate");

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.put("/:id", validatePutUser, updateUser);

module.exports = router;
