const Problem = require("../../models/problem");

exports.getAll = async (req, res) => {
  try {
    const problems = await Problem.find().populate("user");
    res.status(200).json({
      message: "Problems fetched successfully!",
      payload: problems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
