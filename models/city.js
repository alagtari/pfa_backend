const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);