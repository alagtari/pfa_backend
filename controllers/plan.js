const Plan = require("../models/plan");

exports.create = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    const savedPlan = await plan.save();
    await savedPlan.populate("truck city");
    res.status(201).json({
      message: "Plan added successfully!",
      payload: savedPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const plans = await Plan.find().populate("truck city");
    res.status(200).json({
      message: "Plans fetched successfully!",
      payload: plans,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json({
      message: "Plan fetched successfully!",
      payload: plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("truck city");
    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json({
      message: "Plan updated successfully!",
      payload: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json({ message: "Plan deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
