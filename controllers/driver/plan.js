const Plan = require("../../models/plan");
const Truck = require("../../models/truck");
const moment = require("moment");
exports.getAll = async (req, res) => {
  try {
    // const { userId } = req.auth;
    const userId = "664b850912d18de2b894bb79";

    const today = moment().startOf("day").toDate();
    const tomorrow = moment(today).add(2, "days").toDate();
    console.log(today);
    console.log(tomorrow);
    const [truck] = await Truck.find({ driver: userId });
    const plans = await Plan.find({
      truck: truck._id,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    }).populate([
      { path: "truck", populate: { path: "driver" } },
      { path: "city", populate: { path: "cityLocation locations" } },
      "visitedLocation",
    ]);
    console.log(plans);
    res.status(200).json({
      message: "Plans fetched successfully!",
      payload: plans,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json({
      message: "Plans fetched successfully!",
      payload: plan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.startMission = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    plan.status = "IN_PROGRESS";
    await plan.save();

    res.status(200).json({ message: "Mission started successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.endMission = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    plan.status = "FINISHED";
    await plan.save();

    res.status(200).json({ message: "Mission ended successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.visitLocation = async (req, res) => {
  const { planId, locationId } = req.params;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    plan.visitedLocation.push(locationId);
    await plan.save();

    res.status(200).json({ message: "Location visited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
