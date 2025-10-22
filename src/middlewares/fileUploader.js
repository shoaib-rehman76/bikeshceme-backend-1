const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const sanitizePath = require("sanitize-filename");

// Ensure folder exists or create it
const createFolderIfNotExists = (folderPath) => {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created: ${folderPath}`);
    } else {
      console.log(`Folder already exists: ${folderPath}`);
    }
    // Verify folder is writable
    fs.accessSync(folderPath, fs.constants.W_OK);
  } catch (err) {
    console.error(`Error with folder ${folderPath}: ${err.message}`);
    throw new Error(`Unable to create or access folder: ${err.message}`);
  }
};

// Multer memory storage
const storage = multer.memoryStorage();
const uploadFile = () =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, and GIF files are allowed"));
      }
      cb(null, true);
    },
  }).single("image");

const uploadEasyPaiseFile = () =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, and GIF files are allowed"));
      }
      cb(null, true);
    },
  }).single("paymentScreenshot");

// Middleware: resize and save image
const resizeAndSaveImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      console.log("No file uploaded, proceeding to next middleware");
      return next();
    }

    console.log(`Uploaded file: ${file.originalname}`);

    // Construct folder name from URL segments
    const urlSegments = req.originalUrl.split("/").filter(Boolean);
    const folderNames = urlSegments.slice(1, -1);
    const folderName = folderNames.length ? sanitizePath(folderNames.join("-")) : "uploads";

    // Define folder path
    const folderPath = path.join(process.cwd(), "public", "images", folderName);

    // Create folder if it doesn't exist
    createFolderIfNotExists(folderPath);

    // Generate unique file name
    const uniqueName = `image-${Date.now()}.jpeg`;
    const outputPath = path.join(folderPath, uniqueName);

    // Resize and save image
    await sharp(file.buffer)
      .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
      .toFormat("jpeg")
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log(`Image saved to: ${outputPath}`);

    // Construct image URL
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${baseUrl}/public/images/${folderName}/${uniqueName}`;
    req.body.paymentScreenshot = imageUrl;

    console.log(`Image URL set: ${imageUrl}`);

    return next();
  } catch (err) {
    console.error(`Error in resizeAndSaveImage: ${err.message}`);
    return res.status(500).json({ error: "Failed to process image", details: err.message });
  }
};

module.exports = {
  uploadFile,
  uploadEasyPaiseFile,
  resizeAndSaveImage,
};