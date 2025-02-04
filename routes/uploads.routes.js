const express = require("express");
const router = express.Router();
const { uploads } = require("../controllers/uploads.controller");

// Endpoints de usuarios
router.post("/", uploads);

module.exports = router;
