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

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.put("/:id", validatePutUser, updateUser);
router.delete("/:id", validateUserDelete, deleteUser);

module.exports = router;
