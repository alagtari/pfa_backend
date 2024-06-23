const Notification = require("../../models/notification");
const Citizen = require("../../models/citizen");
exports.getAll = async (req, res) => {
  try {
    const { userId } = req.auth;
    const citizen = await Citizen.findById(userId);
    const notifications = await Notification.find({
      city: citizen.city,
    });

    res.status(200).json({
      message: "Notifications fetched successfully!",
      payload: notifications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
