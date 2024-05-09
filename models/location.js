const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    geoLocation: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
