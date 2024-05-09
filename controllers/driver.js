const User = require("../models/user");
const Truck = require("../models/truck");

const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, cin } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Can't add an account with this email" });
    }
    const hashedPassword = await bcrypt.hash("password", 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      cin,
      password: hashedPassword,
      role: "driver",
    });
    const savedUser = await newUser.save();
    delete savedUser.password; // Remove password field from savedUser
    res
      .status(201)
      .json({ message: "Acount added successfuly", payload: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    res.status(200).json({
      message: "Drivers fetched successfully!",
      payload: drivers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailable = async (req, res) => {
  try {
    let trucks = await Truck.find();
    let availableIds = trucks
      .map((item) => item.driver)
      .filter((driver) => driver !== null)
      .map((driver) => driver._id);
    const drivers = await User.find({
      _id: { $nin: availableIds },
      role: "driver",
    }).select("-password");
    res.status(200).json({
      message: "Drivers fetched successfully!",
      payload: drivers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({
      message: "Driver fetched successfully!",
      payload: driver,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedDriver = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({
      message: "Driver updated successfully!",
      payload: updatedDriver,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedDriver = await User.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ message: "Driver deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
