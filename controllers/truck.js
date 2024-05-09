const Truck = require("../models/truck");

exports.create = async (req, res) => {
  try {
    const truck = new Truck(req.body);
    const savedTruck = await truck.save();
    await savedTruck.populate("driver");
    res.status(201).json({
      message: "Truck added successfully!",
      payload: savedTruck,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const trucks = await Truck.find().populate("driver");
    res.status(200).json({
      message: "Trucks fetched successfully!",
      payload: trucks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.json({
      message: "Truck fetched successfully!",
      payload: truck,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedTruck = await Truck.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }
    await updatedTruck.populate("driver");
    res.status(200).json({
      message: "Truck updated successfully!",
      payload: updatedTruck,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedTruck = await Truck.findByIdAndDelete(req.params.id);
    if (!deletedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.status(200).json({ message: "Truck deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
