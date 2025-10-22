const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Ensure folder exists
const createFolderIfNotExists = (folderPath) => {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log("Folder created:", folderPath);
    } else if (!fs.statSync(folderPath).isDirectory()) {
      console.warn(`A file with the name '${folderPath}' already exists.`);
    }
  } catch (err) {
    console.error("Error creating folder:", err.message);
    // Do not throw, just log
  }
};

// Multer memory storage
const storage = multer.memoryStorage();
const uploadFile = () => multer({ storage }).single("image");
const uploadEasyPaiseFile = () => multer({ storage }).single("paymentScreenshot");

// Middleware: resize and save image
const resizeAndSaveImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return next(); // No file uploaded, continue

    console.log("Uploaded file:", file.originalname);

    // Use project root as base path
    const urlSegments = req.originalUrl.split("/").filter(Boolean);
    const folderNames = urlSegments.slice(1, -1);
    const folderName = folderNames.length ? folderNames.join("-") : "uploads";

    const folderPath = path.join(process.cwd(), "public", "images", folderName);
    createFolderIfNotExists(folderPath);

    const uniqueName = `image-${Date.now()}.jpeg`;
    const outputPath = path.join(folderPath, uniqueName);

    await sharp(file.buffer)
      .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
      .toFormat("jpeg")
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${folderName}/${uniqueName}`;
    req.body.paymentScreenshot = imageUrl;

  } catch (err) {
    console.error("Error resizing/saving image:", err.message);
    // Do not return response, just continue
  }
  return next(); // Always call next
};

module.exports = {
  uploadFile,
  uploadEasyPaiseFile,
  resizeAndSaveImage,
};
