const express = require("express");
const router = expresss.Router();

router.post("/", (req, res) => {
  res.json({ status: "OK", env: process.env.NODE_ENV || "development " });
});

module.exports = router;
