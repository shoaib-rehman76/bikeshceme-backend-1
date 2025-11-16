const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const sanitizePath = require("sanitize-filename");

// Multer memory storage
const storage = multer.memoryStorage();

const uploadFile = () =>
  multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
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
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, and GIF files are allowed"));
      }
      cb(null, true);
    },
  }).single("paymentScreenshot");

// Middleware: resize and save image locally
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
    const folderName = folderNames.length
      ? sanitizePath(folderNames.join("-"))
      : "uploads";

    // Define local folder path
    const folderPath = path.join(process.cwd(), "public", "images", folderName);

    // Process image with sharp
    // const processedBuffer = await sharp(file.buffer)
    //   .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
    //   .toFormat("jpeg")
    //   .jpeg({ quality: 85 })
    //   .toBuffer();

    // Check if folder exists (don't create it)
    if (fs.existsSync(folderPath)) {
      // Generate unique file name and save
      const uniqueName = `image-${Date.now()}.jpeg`;
      const outputPath = path.join(folderPath, uniqueName);

      // await fs.promises.writeFile(outputPath, processedBuffer);
      // console.log(`Image saved to: ${outputPath}`);

      // Construct image URL
      const baseUrl =
        process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/public/images/${folderName}/${uniqueName}`;
      req.body.paymentScreenshot = imageUrl;

      console.log(`Image URL set: ${imageUrl}`);
    } else {
      // Folder doesn't exist - return base64
      console.log(`Folder doesn't exist: ${folderPath}, using base64`);
      const base64Image = `data:image/jpeg;base64,${processedBuffer.toString(
        "base64"
      )}`;
      req.body.paymentScreenshot = base64Image;
      console.log(`Image converted to base64`);
    }

    return next();
  } catch (err) {
    console.error(`Error in resizeAndSaveImage: ${err.message}`);

    // Return error but don't crash
    return res.status(500).json({
      message: "Image processing failed",
      error: err.message,
    });
  }
};

module.exports = {
  uploadFile,
  uploadEasyPaiseFile,
  resizeAndSaveImage,
};
