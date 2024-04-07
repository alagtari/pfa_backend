const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    startHour: { type: Date, required: true },
    endHour: { type: Date, required: true },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
    },
    garbageType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GarbageType",
    },
    visitedLocation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisitedLocation",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
