const Problem = require("../models/problem");

exports.create = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    const savedProblem = await problem.save();
    res.status(201).json({
      message: "Problem added successfully!",
      payload: savedProblem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json({
      message: "Problems fetched successfully!",
      payload: problems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json({
      message: "Problem fetched successfully!",
      payload: problem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({
      message: "Problem updated successfully!",
      payload: updatedProblem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
