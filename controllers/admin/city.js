const City = require("../../models/city");
const Location = require("../../models/location");

exports.create = async (req, res) => {
  try {
    const { name, postalCode, state, cityLocation } = req.body;
    const location = new Location(cityLocation);
    const savedLocation = await location.save();

    const city = new City({
      name,
      postalCode,
      state,
      cityLocation: savedLocation._id,
    });
    const savedCity = await city.save();
    await savedCity.populate("cityLocation");
    res
      .status(201)
      .json({ message: "City added successfully!", payload: savedCity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.getById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.json({ message: "City fetched successfully!", payload: city });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res
      .status(200)
      .json({ message: "City updated successfully!", payload: updatedCity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json({ message: "City deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
