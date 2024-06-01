const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", incidentSchema);
