const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    model: { type: String, required: true },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Truck", truckSchema);
