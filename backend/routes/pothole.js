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
    console.log("hey got it");
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No File Uploaded"
        });
      }
      console.log("Received request body:", req.body);
      
   
      const lat = req.body.lat;
      const long = req.body.long;
      const description=req.body.description;

      const localFilePath = req.file.path;
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
      console.error("error uploading photos", error);
      res.status(500).json({
        message: "failed to report pothole",
        error: error.message
      });
    }
  }
);

router.get("/my-report",userAuth,async(req,res)=>{
  try{
    const reports=await Pothole.find({
      user : req.userId}).sort({date:-1});
  
     const count=Pothole.length;

     res.status(200).json({
       reports,
       count
     });
    }catch(err){
      console.log(err.message);
      res.status(500).send("server error- couldn't fetch pothole data");
    }
  });
module.exports = router;
