const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true , enum:["RESCHEDULE", "MISSION"] },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
