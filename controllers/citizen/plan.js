const Plan = require("../../models/plan");
const Citizen = require("../../models/citizen");
const moment = require("moment");
exports.getAll = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { date } = req.query;
    const day = moment(date).startOf("day").toDate();
    const citizen = await Citizen.findById(userId);
    const plans = await Plan.find({ city: citizen.city, date: day });

    res.status(200).json({
      message: "Plans fetched successfully!",
      payload: plans,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
