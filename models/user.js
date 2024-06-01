const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    cin: { type: String, required: true },
    birthDate: { type: Date, default: Date.now },
    image: { type: String },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    role: {
      type: String,
      required: true,
      enum: ["citizen", "driver", "admin"],
    },
    verification: {
      code: { type: String },
      expirationTime: { type: Date },
      verified: { type: Boolean },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
