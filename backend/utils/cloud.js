const cloudinary = require('cloudinary').v2;
const fs=require('fs');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (localFilePath) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(localFilePath,{
        resource_type: 'image',
        tags: ['profile', 'user_upload']

      }, (error, result) => {
        fs.unlink(localFilePath, (err) => {
          if (err) console.log("Failed to delete local file:", err);
        });
        
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

module.exports={
    cloudinary,
    uploadToCloudinary
};