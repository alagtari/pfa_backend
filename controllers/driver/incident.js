const Incident = require("../../models/incident");

exports.create = async (req, res) => {
  try {
    const { userId } = req.auth;
    let image;
    if (req.file) {
      image = req.file.originalname;
    }
    const incident = new Incident({ ...req.body, image, user: userId });
    const savedIncident = await incident.save();
    res.status(201).json({
      message: "Incident added successfully!",
      payload: savedIncident,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
