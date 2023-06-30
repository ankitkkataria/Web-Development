const express = require("express");
const app = express();
const shelterRoutes = require("./routes/shelterRoutes");
const dogRoutes = require("./routes/dogRoutes");

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
