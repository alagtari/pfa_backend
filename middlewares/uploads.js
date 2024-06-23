const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// module.exports = upload.single("image");

const uploadMiddleware = (req, res, next) => {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return next();
    }

    next();
  });
};

module.exports = uploadMiddleware;
