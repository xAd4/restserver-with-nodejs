const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  validateUser,
  validatePutUser,
  validateUserDelete,
} = require("../helpers/user.validate");

const router = express.Router();

router.get("/", getUsers);
router.post("/", validateUser, createUser);
router.put("/:id", validatePutUser, updateUser);
router.delete("/:id", validateUserDelete, deleteUser);

module.exports = router;
