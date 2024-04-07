const Incident = require("../models/incident");

exports.create = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    const savedIncident = await incident.save();
    res.status(201).json({
      message: "Incident added successfully!",
      payload: savedIncident,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json({
      message: "Incidents fetched successfully!",
      payload: incidents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json({
      message: "Incident fetched successfully!",
      payload: incident,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json({
      message: "Incident updated successfully!",
      payload: updatedIncident,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);
    if (!deletedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json({ message: "Incident deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
