const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
