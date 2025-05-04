const express = require('express');
const upload = require('../middleware/multer');
const { authMiddleware } = require("../middleware/userAuth");
const { uploadToCloudinary } = require("../utils/cloud");
const { PotholeValidator } = require('../middleware/validateporthole');
const { User,Pothole } = require("../db");
const fs = require('fs');
const router = express.Router();

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  PotholeValidator,
  async function(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const lat = req.body.lat === "not available" ? null : Number(req.body.lat);
      const long = req.body.long === "not available" ? null : Number(req.body.long);
      const description = req.body.description;
      const CloudinaryResult = await uploadToCloudinary(localFilePath);

      if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({
          message: "Invalid latitude or longitude values"
        });
      }

      

     
      

      console.log("Reporting userId:", req.userId);

      const newPothole = await Pothole.create({
        lat,
        long,
        description,
        photoUrl: CloudinaryResult.secure_url,
        reportedBy: req.userId,
      });

      await User.findByIdAndUpdate(req.userId, { $inc: { points:100,totalreport: 1 } });

      const reportCount=await Pothole.countDocuments({reportedBy:req.userId})
      if(reportCount==1){
        const user=await User.findById(req.userId);
        if(!user.badges.includes("First Report")){
          user.badges.push("First Report");
          await user.save();
        }
      }
      if(reportCount>=10){
        const user=await User.findById(req.userId);
        if(!user.badges.includes("Top Contributor")){
          user.badges.push("Top Contributor");
          await user.save();
        }
      }


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
