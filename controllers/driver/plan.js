const Plan = require("../../models/plan");
const Location = require("../../models/location");
const Truck = require("../../models/truck");
const Notification = require("../../models/notification");
const moment = require("moment");

exports.getAll = async (req, res) => {
  try {
    const { userId } = req.auth;
    const today = moment().startOf("day").toDate();
    const tomorrow = moment(today).add(2, "days").toDate();
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
    res.status(200).json({
      message: "Plans fetched successfully!",
      payload: plans,
    });
  } catch (error) {
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
    const notification = new Notification({
      title: "Mission started",
      content: `A new ${plan.garbageType} mission started now `,
      type: "MISSION",
      city: plan.city,
    });
    await notification.save();

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
    const location = await Location.findById(locationId);
    await plan.save();
    req.app.get("io").to(planId).emit("receive-visited-location", location);

    res.status(200).json({ message: "Location visited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
