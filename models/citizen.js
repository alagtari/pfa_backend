const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Citizen", citizenSchema);
