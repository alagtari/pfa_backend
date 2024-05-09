const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    model: { type: String, required: true },
    capacity: { type: Number, required: true },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Truck", truckSchema);
