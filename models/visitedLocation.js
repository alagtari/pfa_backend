const mongoose = require("mongoose");

const visitedLocationSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisitedLocation", visitedLocationSchema);
