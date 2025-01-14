const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({ message: "Server running" }, createUser);
});

module.exports = router;
