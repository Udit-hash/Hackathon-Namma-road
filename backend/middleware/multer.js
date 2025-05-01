const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024, // 8 Mb
  }
});

module.exports = upload;