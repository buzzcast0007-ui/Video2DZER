const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const videoController = require('../controllers/videoController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = process.env.UPLOAD_DIR || './uploads';
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 500000000 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'));
    }
  }
});

// Routes
router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.post('/convert/:videoId', videoController.convertToAnime);
router.get('/status/:videoId', videoController.getConversionStatus);
router.get('/list', videoController.listVideos);
router.delete('/:videoId', videoController.deleteVideo);
router.get('/download/:videoId', videoController.downloadVideo);

module.exports = router;