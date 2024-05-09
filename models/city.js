const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    postalCode: { type: String, required: true },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
