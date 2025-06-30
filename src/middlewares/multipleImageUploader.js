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
      // Get the first segment after /api/ (e.g., 'menu-food')
      const urlSegments = req.originalUrl.split("/api/")[1].split("/"); 
      const folderName = urlSegments[0]; // Capture only the first part (e.g., 'menu-food')
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
      const uniqueName = `image-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`; // Generate a unique filename
      cb(null, uniqueName);
    },
  });
};

// Function to handle multiple image uploads using Multer
const uploadFiles = () => multer({ storage: getMulterStorage() }).array("images", 10); // Handle multiple images (up to 10)

// Function to save the uploaded images locally and return their URLs
const saveImages = async (req, res, next) => {
  try {
    const files = req.files; // Retrieve the uploaded files (array of images)

    if (!files || files.length === 0) {
      return next(); // If no files are uploaded, proceed to the next middleware
    }

    // Get the first segment after /api/ (e.g., 'menu-food')
    const urlSegments = req.originalUrl.split("/api/")[1].split("/");
    const folderName = urlSegments[0]; // Capture only the first part

    const imageUrls = files.map(file => {
      const filePath = `public/images/${folderName}/${file.filename}`; // Path for local image storage
      return `${req.protocol}://${req.get("host")}/${filePath}`; // Get image URL for each file
    });

    req.body.images = imageUrls; // Set the array of image URLs in req.body

    // Pass req.body to the next middleware or route handler
    return next();
  } catch (error) {
    console.error("Error in saveImages middleware:", error);
    return res.status(500).json({ message: "An error occurred while saving the images.", error: error.message });
  }
};

module.exports = {
  uploadFiles,
  saveImages,
};
