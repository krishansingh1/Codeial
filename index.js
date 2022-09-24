const express = require("express");
const app = express();
const port = 8000;

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  }
  console.log(`Successfully runnin on port:${port}`);
});
