module.exports = {
  port: process.env.API_PORT || 5000,
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 500000000,
  allowedFormats: ['mp4', 'mpeg', 'mov', 'avi'],
  aiApiKey: process.env.AI_API_KEY,
  aiApiUrl: process.env.AI_API_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
};