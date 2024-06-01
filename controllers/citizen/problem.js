const Problem = require("../../models/problem");

exports.create = async (req, res) => {
  try {
    const { userId } = req.auth;
    let image;
    if (req.file) {
      image = req.file.originalname;
    }
    const problem = new Problem({ ...req.body, image, user: userId });
    const savedProblem = await problem.save();
    res.status(201).json({
      message: "Problem added successfully!",
      payload: savedProblem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
