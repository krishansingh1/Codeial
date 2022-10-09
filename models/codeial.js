const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
});

const data = mongoose.model("Codeial", dataSchema);

module.exports = data;
