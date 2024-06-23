const User = require("../../models/user");
const Truck = require("../../models/truck");
const Room = require("../../models/chatroom");

const bcrypt = require("bcrypt");
const { driverAccountCode } = require("../../utils/driverAccountTemplate");
const { sendEmail } = require("../../utils/mailsender");
const { generatePassword } = require("../../utils/generatePassword");

exports.create = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { firstName, lastName, email, phone, cin } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Can't add an account with this email" });
    }
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);
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
    delete savedUser.password;
    const room = new Room({ members: [savedUser._id, userId] });
    await room.save();
    sendEmail("Account Credentials", email, driverAccountCode(email, password));

    res
      .status(201)
      .json({ message: "Acount added successfuly", payload: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");
    let trucks = await Truck.find();
    console.log(trucks);
    let traitedDrivers = drivers.map((item) => {
      let [truck] = trucks.filter((truck) => {
        return truck.driver.toString() === item._id.toString();
      });
      if (truck) {
        truck = truck.toObject();
        delete truck.driver;
        return { ...item.toObject(), truck };
      }
      return { ...item.toObject() };
    });
    res.status(200).json({
      message: "Drivers fetched successfully!",
      payload: traitedDrivers,
    });
  } catch (error) {
    console.log(error);
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
    await Room.deleteOne({ members: { $in: [deletedDriver._id] } });

    res.status(200).json({ message: "Driver deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
