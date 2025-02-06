const express = require("express");
const router = express.Router();
const { uploads, updateImage } = require("../controllers/uploads.controller");
const { validateUploads } = require("../helpers/general-validators");

// Endpoints de usuarios
router.post("/", uploads);
router.put("/:collection/:id", validateUploads, updateImage);

module.exports = router;
