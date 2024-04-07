const GarbageType = require("../models/garbageType");

exports.create = async (req, res) => {
  try {
    const garbageType = new GarbageType(req.body);
    const savedGarbageType = await garbageType.save();
    res.status(201).json({
      message: "Garbage type added successfully!",
      payload: savedGarbageType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const garbageTypes = await GarbageType.find();
    res.status(200).json({
      message: "Garbage types fetched successfully!",
      payload: garbageTypes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const garbageType = await GarbageType.findById(req.params.id);
    if (!garbageType) {
      return res.status(404).json({ message: "Garbage type not found" });
    }
    res.json({
      message: "Garbage type fetched successfully!",
      payload: garbageType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedGarbageType = await GarbageType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGarbageType) {
      return res.status(404).json({ message: "Garbage type not found" });
    }
    res.status(200).json({
      message: "Garbage type updated successfully!",
      payload: updatedGarbageType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedGarbageType = await GarbageType.findByIdAndDelete(
      req.params.id
    );
    if (!deletedGarbageType) {
      return res.status(404).json({ message: "Garbage type not found" });
    }
    res.status(200).json({ message: "Garbage type deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
