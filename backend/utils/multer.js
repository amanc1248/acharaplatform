import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "/DASA PROJECT/thewebapp/backend/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

// file validation

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

export default upload;
