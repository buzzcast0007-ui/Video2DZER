const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// In-memory store for video conversions (use database in production)
const conversionStatus = {};

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const videoId = uuidv4();
    const videoData = {
      id: videoId,
      originalName: req.file.originalname,
      filename: req.file.filename,
      filepath: req.file.path,
      filesize: req.file.size,
      uploadDate: new Date(),
      status: 'uploaded',
      progress: 0
    };

    conversionStatus[videoId] = videoData;

    res.json({
      success: true,
      message: 'Video uploaded successfully',
      videoId: videoId,
      data: videoData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload video', message: error.message });
  }
};

exports.convertToAnime = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!conversionStatus[videoId]) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoData = conversionStatus[videoId];
    videoData.status = 'converting';
    videoData.progress = 10;

    // Simulate conversion process (replace with actual AI service)
    res.json({
      success: true,
      message: 'Conversion started',
      videoId: videoId,
      estimatedTime: '2-5 minutes'
    });

    // Start background conversion
    simulateConversion(videoId);

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to start conversion', message: error.message });
  }
};

function simulateConversion(videoId) {
  // Simulate conversion progress
  const intervals = [20, 40, 60, 80, 100];
  let index = 0;

  const interval = setInterval(() => {
    if (index < intervals.length) {
      conversionStatus[videoId].progress = intervals[index];
      index++;
    } else {
      conversionStatus[videoId].status = 'completed';
      conversionStatus[videoId].progress = 100;
      conversionStatus[videoId].outputFilename = `anime_${conversionStatus[videoId].filename}`;
      clearInterval(interval);
    }
  }, 3000);
}

exports.getConversionStatus = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!conversionStatus[videoId]) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      success: true,
      data: conversionStatus[videoId]
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to get status', message: error.message });
  }
};

exports.listVideos = async (req, res) => {
  try {
    const videos = Object.values(conversionStatus);
    res.json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: 'Failed to list videos', message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!conversionStatus[videoId]) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoData = conversionStatus[videoId];
    
    // Delete files
    if (fs.existsSync(videoData.filepath)) {
      fs.unlinkSync(videoData.filepath);
    }

    delete conversionStatus[videoId];

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete video', message: error.message });
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!conversionStatus[videoId]) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoData = conversionStatus[videoId];
    
    if (videoData.status !== 'completed') {
      return res.status(400).json({ error: 'Conversion not completed yet' });
    }

    // In a real scenario, serve the converted file
    res.json({
      success: true,
      message: 'Download link ready',
      downloadUrl: `/uploads/${videoData.outputFilename}`
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download video', message: error.message });
  }
};