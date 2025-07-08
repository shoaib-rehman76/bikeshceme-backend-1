const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to ensure the folder exists or create it if it doesn't
const createFolderIfNotExists = (folderPath) => {
  try {
    if (fs.existsSync(folderPath)) {
      const stats = fs.statSync(folderPath);
      if (!stats.isDirectory()) {
        throw new Error(`A file with the name '${path.basename(folderPath)}' already exists. Please remove or rename it to create a directory.`);
      }
    } else {
      fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
    }
  } catch (error) {
    console.error("Error ensuring folder exists:", error);
    throw new Error("Could not create folder for uploads."); // Rethrow the error for Multer to handle
  }
};

// Define the disk storage for Multer with dynamic folder names
const getMulterStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const urlSegments = req.originalUrl.split("/"); // Split the URL into segments
      const folderNames = urlSegments.slice(2, -1); // Extract folder names (excluding the base URL and last segment)
      
      // Join the folder names to form the folder path
      const folderName = folderNames.join("-"); // Use '-' as a separator for folder names
      console.log("Folder Name:", folderName);
      
      // Use relative path to the public/images directory
      const folderPath = path.join(__dirname, '..', '..', 'public', 'images', folderName);
      
      try {
        createFolderIfNotExists(folderPath); // Create the folder if it doesn't exist
        cb(null, folderPath); // Save images to the dynamic folder
      } catch (error) {
        cb(new Error("Could not ensure folder for uploads."), null); // Handle folder creation error
      }
    },
    filename: (req, file, cb) => {
      const uniqueName = `image-${Date.now()}${path.extname(file.originalname)}`; // Generate a unique filename
      cb(null, uniqueName);
    },
  });
};

// Function to handle single image upload using Multer
const uploadFile = () => multer({ storage: getMulterStorage() }).single("image"); // Handle single image


const uploadEasyPaiseFile = () => multer({ storage: getMulterStorage() }).single("paymentScreenshot");
// Function to save the uploaded image locally and return the image URL
const saveImage = async (req, res, next) => {
  try {
    const file = req.file; // Retrieve the uploaded file

    if (!file) {
      return next(); // If no file is uploaded
    }

    const urlSegments = req.originalUrl.split("/");
    const folderNames = urlSegments.slice(2, -1); // Extract folder names for the image path
    const filePath = `public/images/${folderNames.join("-")}/${file.filename}`; // Path for local image storage
    const imageUrl = `${req.protocol}://${req.get("host")}/${filePath}`; // Get image URL

    req.body.paymentScreenshot = imageUrl; // Set the image URL in req.body

    // Pass req.body to the next middleware or route handler
    return next();
  } catch (error) {
    console.error("Error in saveImage middleware:", error);
    return res.status(500).json({ message: "An error occurred while saving the image.", error: error.message });
  }
};

module.exports = {
  uploadFile,
  saveImage,
  uploadEasyPaiseFile
};
