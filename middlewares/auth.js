const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    User.findOne({ _id: userId }).then((result) => {
      if (result) {
        req.auth = {
          userId: userId,
          role: result.role,
        };
        next();
      } else {
        res.status(404).json({ error: "user does not exist" });
      }
    });
  } catch (error) {
    console.log("You have to sign in !");
    res.status(401).json({ error: "You have to sign in !" });
  }
};

module.exports.checkUserRole = (roles) => {
  return (req, res, next) => {
    try {
      if (req.auth && roles.includes(req.auth.role)) {
        next();
      } else {
        res.status(403).json({ error: "No access for this route" });
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
};

module.exports.isCitizen = module.exports.checkUserRole("citizen");
module.exports.isDriver = module.exports.checkUserRole("driver");
module.exports.isAdmin = module.exports.checkUserRole("admin");
