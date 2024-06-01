const Citizen = require("../models/citizen");
const User = require("../models/user");
const Driver = require("../models/driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/mailsender");
const { verificationCode } = require("../utils/verificationTemplate");
const {
  generateVerificationCode,
} = require("../utils/generateVerificationCode");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.RANDOM_TOKEN_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    res
      .status(200)
      .json({ message: "Login success", payload: { token, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signupCitizen = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      email,
      password,
      phone,
      cin,
      city,
      street,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Can't add an account with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (req.file) {
      image = req.file.originalname;
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      cin,
      birthDate,
      gender,
      image,
      password: hashedPassword,
      role: "citizen",
    });
    const savedUser = await newUser.save();
    const newCitizen = new Citizen({
      street,
      city,
      user: savedUser._id,
      _id: savedUser._id,
    });
    await newCitizen.save();

    res.status(201).json({ message: "Acount added successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signupDriver = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, cin } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Can't add an account with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (req.file) {
      image = req.file.originalname;
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      cin,
      image,
      password: hashedPassword,
      role: "driver",
    });
    const savedUser = await newUser.save();
    const newDriver = new Driver({
      user: savedUser._id,
      _id: savedUser._id,
    });
    await newDriver.save();

    res.status(201).json({ message: "Acount added successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const code = generateVerificationCode();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        verification: {
          code,
          expirationTime: new Date(Date.now() + 5 * 60 * 1000),
          verified: false,
        },
      },
      { new: true }
    );
    if (updatedUser) {
      sendEmail("Password Reset Verification", email, verificationCode(code));
    }
    res.status(200).json({ message: "Code sent successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const now = new Date();
      if (code === user.verification.code) {
        if (user.verification.expirationTime < now) {
          return res
            .status(400)
            .json({ message: "Verification code expired!" });
        } else {
          user.verification.verified = true;
          await user.save();
          return res
            .status(200)
            .json({ message: "Verification code is correct!" });
        }
      }
    }
    res.status(400).json({ message: "Wrong verification code!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.resendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const code = generateVerificationCode();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        verification: {
          code,
          expirationTime: new Date(Date.now() + 5 * 60 * 1000),
          verified: false,
        },
      },
      { new: true }
    );
    if (updatedUser) {
      sendEmail("Password Reset Verification", email, verificationCode(code));
    }
    res.status(200).json({ message: "Code sent successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.newPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (code === user.verification.code && user.verification.verified) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.verification = null;
        await user.save();
        return res
          .status(200)
          .json({ message: "Password changed successfuly!" });
      }
    }
    res.status(400).json({ message: "Wrong verification code!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.auth;
    const user = await User.findById(userId);
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Old password is incorrect!" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed correctly!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.auth;
    if (req.file) {
      image = req.file.originalname;
    }
    await User.findByIdAndUpdate(userId, { ...req.body, image }, { new: true });
    res.status(200).json({ message: "Profil updated successfuly!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    const { userId } = req.auth;
    const user = await User.findById(userId).select(
      "firstName lastName gender cin phone birthDate image"
    );
    res
      .status(200)
      .json({ message: "View profile successfuly!", payload: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
