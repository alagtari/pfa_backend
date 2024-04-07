const VisitedLocation = require("../models/visitedLocation");

exports.create = async (req, res) => {
  try {
    const visitedLocation = new VisitedLocation(req.body);
    const savedVisitedLocation = await visitedLocation.save();
    res.status(201).json({
      message: "Visited location added successfully!",
      payload: savedVisitedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const visitedLocations = await VisitedLocation.find();
    res.status(200).json({
      message: "Visited locations fetched successfully!",
      payload: visitedLocations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const visitedLocation = await VisitedLocation.findById(req.params.id);
    if (!visitedLocation) {
      return res.status(404).json({ message: "Visited location not found" });
    }
    res.json({
      message: "Visited location fetched successfully!",
      payload: visitedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedVisitedLocation = await VisitedLocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVisitedLocation) {
      return res.status(404).json({ message: "Visited location not found" });
    }
    res.status(200).json({
      message: "Visited location updated successfully!",
      payload: updatedVisitedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedVisitedLocation = await VisitedLocation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVisitedLocation) {
      return res.status(404).json({ message: "Visited location not found" });
    }
    res.status(200).json({ message: "Visited location deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
