const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET /",
  });
});
router.get("/:id", (req, res) => {
  res.json({
    message: "GET /id",
  });
});
router.post("/", (req, res) => {
  res.json({
    message: "POST /",
  });
});
router.put("/:id", (req, res) => {
  res.json({
    message: "PUT /id",
  });
});
router.delete("/:id", (req, res) => {
  res.json({
    message: "DELETE /",
  });
});

module.exports = router;
