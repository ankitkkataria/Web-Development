const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Showing All Dogs");
});

router.get("/:id", (req, res) => {
  res.send("Showing One Dog");
});

router.get("/:id/edit", (req, res) => {
  res.send("Editing One Dogs");
});

module.exports = router;