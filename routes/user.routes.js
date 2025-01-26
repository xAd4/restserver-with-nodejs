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
} = require("../helpers/general-validators");

const router = express.Router();

// Endpoints de usuarios
router.get("/", getUsers);
router.post("/", validateUser, createUser);
router.put("/:id", validatePutUser, updateUser);
router.delete("/:id", validateUserDelete, deleteUser);

module.exports = router;
