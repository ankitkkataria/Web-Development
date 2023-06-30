const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send('All Shelters')
});

router.get("/:id", (req, res) => {
  res.send('Displaying One Shelter')
});

router.get("/:id/edit", (req, res) => {
  res.send('Editing a Shelter');
});

router.post("/", (req, res) => {
  res.send('Creating a Shelter')
});

module.exports = router;