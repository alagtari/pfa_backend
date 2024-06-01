const Message = require("../models/message");
const Room = require("../models/chatroom");

exports.create = async (req, res) => {
  try {
    const { userId } = req.auth;
    const message = new Message({ ...req.body, sender: userId });
    savedMessage = await message.save();
    const savedMessageToSender = {
      ...savedMessage._doc,
      sent: true,
    };
    const savedMessageToReciver = {
      ...savedMessage._doc,
      sent: false,
    };

    const room = await Room.findById(req.body.room);
    const [reciver] = room.members.filter((e) => e != userId);
    console.log(reciver.toString());

    req.app
      .get("io")
      .to(reciver.toString())
      .emit("chat message", savedMessageToReciver);
    res.status(201).json({
      message: "Message added successfully!",
      payload: savedMessageToSender,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const { userId } = req.auth;
    const latestMessages = await Message.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$room", latestMessage: { $first: "$$ROOT" } } },
    ]);

    const rooms = await Room.find({ members: { $in: [userId] } })
      .select("_id members")
      .populate({
        path: "members",
        select: "_id firstName lastName image",
      });

    const roomsWithLatestMessages = rooms.map((room) => {
      const latestMessage = latestMessages.find(
        (msg) => msg._id.toString() === room._id.toString()
      );
      const user = room.members.find((user) => user._id.toString() !== userId);
      return {
        _id: room._id,
        user,
        latestMessage: latestMessage ? latestMessage.latestMessage : null,
      };
    });

    res.status(200).json({
      message: "Rooms with latest messages fetched successfully!",
      payload: roomsWithLatestMessages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessagesByRoomId = async (req, res) => {
  try {
    const { room } = req.params;
    const { userId } = req.auth;
    let messages = await Message.find({ room });
    let processedMessages = messages.map((message) => {
      return {
        ...message._doc,
        sent: message.sender.toString() === userId.toString(),
      };
    });
    res.json({
      message: "Message fetched successfully!",
      payload: processedMessages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
