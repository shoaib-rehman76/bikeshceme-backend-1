const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp"); // For resizing

// Ensure folder exists
const createFolderIfNotExists = (folderPath) => {
  try {
    if (fs.existsSync(folderPath)) {
      const stats = fs.statSync(folderPath);
      if (!stats.isDirectory()) {
        throw new Error(
          `A file with the name '${path.basename(folderPath)}' already exists. Please remove or rename it to create a directory.`
        );
      }
    } else {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  } catch (error) {
    console.error("Error ensuring folder exists:", error);
    throw new Error("Could not create folder for uploads.");
  }
};

// Multer storage (temporary memory storage for resizing)
const storage = multer.memoryStorage();

// Upload handlers
const uploadFile = () => multer({ storage }).single("image");
const uploadEasyPaiseFile = () => multer({ storage }).single("paymentScreenshot");

// Middleware: resize and save image to disk
const resizeAndSaveImage = async (req, res, next) => {
  try {
    const file = req.file;
    console.log("File in resizeAndSaveImage middleware:", file); // Debug: log the file info
    if (!file) return next(); // No file uploaded, continue

    console.log("Uploaded file:", file.originalname); // Debug: log the uploaded file

    // Extract folder name from URL, fallback to "uploads"
    const urlSegments = req.originalUrl.split("/").filter(Boolean);
    const folderNames = urlSegments.slice(1, -1);
    const folderName = folderNames.length ? folderNames.join("-") : "uploads";

    const folderPath = path.join(__dirname, "..", "..", "public", "images", folderName);
    createFolderIfNotExists(folderPath);

    // Build unique filename
    const uniqueName = `image-${Date.now()}.jpeg`;
    const outputPath = path.join(folderPath, uniqueName);

    // Resize and save
    await sharp(file.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    // Build public URL
    const imageUrl = `${req.protocol}://${req.get("host")}/public/images/${folderName}/${uniqueName}`;

    // Attach image URL to req.body
    req.body.paymentScreenshot = imageUrl;

    return next();
  } catch (error) {
    console.error("Error resizing/saving image:", error);
    return res.status(500).json({
      message: "An error occurred while resizing the image.",
      error: error.message,
    });
  }
};

module.exports = {
  uploadFile,
  uploadEasyPaiseFile,
  resizeAndSaveImage,
};
