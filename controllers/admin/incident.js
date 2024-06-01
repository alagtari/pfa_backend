const Incident = require("../../models/incident");
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
