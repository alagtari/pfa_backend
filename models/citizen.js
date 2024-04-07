const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Citizen", citizenSchema);
