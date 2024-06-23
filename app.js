const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/index");
const driverRoutes = require("./routes/driver/index");
const citizenRoutes = require("./routes/citizen/index");
const messageRoutes = require("./routes/messages");
const cityRoutes = require("./routes/city");

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));

const path = require("path");
const cors = require("cors");
const { loggedMiddleware } = require("./middlewares/auth");

app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {});

app.use(express.json());
app.use("uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With, Content, Accept, Content-Type ,Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT , DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api/uploads/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(err.status || 500).send("File not found");
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/driver", loggedMiddleware, driverRoutes);
app.use("/api/admin", loggedMiddleware, adminRoutes);
app.use("/api/citizen", loggedMiddleware, citizenRoutes);
app.use("/api/city", cityRoutes);

app.use("/api/message", messageRoutes);

module.exports = app;
