const express = require('express');
const upload = require('../middleware/multer');
const { authMiddleware } = require("../middleware/userAuth");
const { uploadToCloudinary } = require("../utils/cloud");
const { PotholeValidator } = require('../middleware/validateporthole');
const { Pothole } = require("../db");
const router = express.Router();

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  PotholeValidator,
  async function(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No File Uploaded"
        });
      }

      const lat = parseFloat(req.body.lat);
      const long = parseFloat(req.body.long);
      const description = req.body.description;

      if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({
          message: "Invalid latitude or longitude values"
        });
      }

      const localFilePath = req.file.path;
      const CloudinaryResult = await uploadToCloudinary(localFilePath);

      console.log("Reporting userId:", req.userId);

      const newPothole = await Pothole.create({
        lat,
        long,
        description,
        photoUrl: CloudinaryResult.secure_url,
        reportedBy: req.userId,
      });

      res.status(201).json({
        message: "Pothole reported successfully!",
        pothole: newPothole, 
      });
    } catch (error) {
      console.error("Error uploading pothole:", error);
      res.status(500).json({
        message: "Failed to report pothole",
        error: error.message
      });
    }
  }
);

router.get("/my-report", authMiddleware, async (req, res) => {
  try {
    const reports = await Pothole.find({
      reportedBy: req.userId
    }).sort({ date: -1 });

    const count = reports.length;

    res.status(200).json({
      reports,
      count
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error - couldn't fetch pothole data");
  }
});

module.exports = router;
