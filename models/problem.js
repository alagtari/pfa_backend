const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);
