const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    cityLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
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
