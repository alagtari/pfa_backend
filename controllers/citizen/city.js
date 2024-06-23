const City = require("../../models/city");

exports.getAll = async (req, res) => {
  try {
    const cities = await City.find().populate("cityLocation locations");
    res
      .status(200)
      .json({ message: "Cities fetched successfully!", payload: cities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
