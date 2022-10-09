const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/codeial");

const db = mongoose.connection;

db.on("error", function (err) {
  console.log(`Connection to database is not successfull: ${err.message}`);
});

db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;
