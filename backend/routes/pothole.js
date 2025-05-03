const express = require('express');
const upload = require('../middleware/multer');
const { authMiddleware } = require("../middleware/userAuth");
const { uploadToCloudinary } = require("../utils/cloud");
const { PotholeValidator } = require('../middleware/validateporthole');
const { Pothole } = require("../db");
const fs = require('fs');
const router = express.Router();

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  PotholeValidator,
  async function (req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("Received request body:", req.body);

      const localFilePath = req.file.path;

      const lat = req.body.lat === "not available" ? null : Number(req.body.lat);
      const long = req.body.long === "not available" ? null : Number(req.body.long);
      const description = req.body.description;

     
      const CloudinaryResult = await uploadToCloudinary(localFilePath);

      
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
      console.error("Error uploading photo/reporting:", error);
      res.status(500).json({
        message: "Failed to report pothole",
        error: error.message,
      });
    }
  }
);

router.get("/all",async(req,res)=>{
    try{
        const potholes=await Pothole.find({},"lat long description");
        res.json({
          potholes
        })
    }catch(err){
        res.status(500).json({
          msg:"error in fetching the potholes"
        })
    }
})

module.exports = router;
