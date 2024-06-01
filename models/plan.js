const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    startHour: { type: Date, required: true },
    endHour: { type: Date, required: true },
    status: {
      type: String,
      enum: ["NOT_STARTED", "IN_PROGRESS", "FINISHED", "CANCELLED"],
      default: "NOT_STARTED",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
    },
    garbageType: { type: String, required: true },
    visitedLocation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
