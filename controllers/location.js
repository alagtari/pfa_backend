const Location = require("../models/location");

exports.create = async (req, res) => {
  try {
    const location = new Location(req.body);
    const savedLocation = await location.save();
    res.status(201).json({
      message: "Location added successfully!",
      payload: savedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({
      message: "Locations fetched successfully!",
      payload: locations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({
      message: "Location fetched successfully!",
      payload: location,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({
      message: "Location updated successfully!",
      payload: updatedLocation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
