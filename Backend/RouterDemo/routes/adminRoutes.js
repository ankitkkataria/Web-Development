const express = require("express");
const router = express.Router();

// Defining middleware for only these routes router makes it easier for us not only to split routes into different sections but also apply certain middleware only on a each section.
router.use((req, res, next) => {
  console.log(req.query);
  if (req.query.isAdmin) {
    return next();
  }
  res.send("Sorry you're not a admin!");
});

router.get("/topsecret", (req, res) => {
  res.send("Top secret my boi");
});

router.delete("/deleteeverything", (req, res) => {
  res.send("Deleted everything");
});

module.exports = router;
