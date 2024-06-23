const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
