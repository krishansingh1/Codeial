const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;

app.use(express.static("./assets"));
app.use(expressLayouts);

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  }
  console.log(`Successfully runnin on port:${port}`);
});
