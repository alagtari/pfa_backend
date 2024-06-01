const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
