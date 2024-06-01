const { Schema, default: mongoose } = require("mongoose");

const chatRoomSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},  { timestamps: true });

module.exports  = mongoose.model('ChatRoom', chatRoomSchema);

