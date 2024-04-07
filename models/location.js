const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    geoLocation: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
