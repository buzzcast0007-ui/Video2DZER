import React, { useState } from 'react';
import axios from 'axios';
import './Converter.css';

function Converter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setMessage('');
    } else {
      setMessage('Please select a valid video file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setVideoId(response.data.videoId);
      setMessage('Video uploaded successfully! Ready to convert.');
      setStatus('uploaded');
    } catch (error) {
      setMessage('Upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleConvert = async () => {
    if (!videoId) {
      setMessage('Please upload a video first');
      return;
    }

    setConverting(true);
    setProgress(0);
    setStatus('converting');

    try {
      await axios.post(`/api/videos/convert/${videoId}`);

      // Poll for progress
      const interval = setInterval(async () => {
        const statusResponse = await axios.get(`/api/videos/status/${videoId}`);
        const data = statusResponse.data.data;
        setProgress(data.progress);

        if (data.status === 'completed') {
          clearInterval(interval);
          setStatus('completed');
          setConverting(false);
          setMessage('Conversion completed! Ready to download.');
        }
      }, 1000);
    } catch (error) {
      setMessage('Conversion failed: ' + (error.response?.data?.message || error.message));
      setConverting(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/videos/download/${videoId}`);
      window.open(response.data.downloadUrl, '_blank');
    } catch (error) {
      setMessage('Download failed: ' + error.message);
    }
  };

  return (
    <div className="converter-container">
      <div className="converter-card fade-in">
        <h1>Video to 2D Anime Converter</h1>
        
        <div className="upload-section">
          <div className="drop-zone">
            <input 
              type="file" 
              accept="video/*"
              onChange={handleFileSelect}
              id="video-input"
              className="file-input"
            />
            <label htmlFor="video-input" className="drop-label">
              <span className="icon">📹</span>
              <span className="text">
                {selectedFile ? selectedFile.name : 'Click to select or drag & drop your video'}
              </span>
            </label>
          </div>

          <button 
            className="btn btn-upload"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>

        {status === 'uploaded' && (
          <div className="conversion-section">
            <p className="info-text">Your video is ready for conversion!</p>
            <button 
              className="btn btn-convert"
              onClick={handleConvert}
              disabled={converting}
            >
              {converting ? 'Converting...' : 'Start Conversion'}
            </button>
          </div>
        )}

        {status === 'converting' && (
          <div className="progress-section">
            <p>Converting your video to 2D anime...</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">{progress}%</p>
          </div>
        )}

        {status === 'completed' && (
          <div className="completion-section">
            <p className="success-text">✅ Conversion completed!</p>
            <button 
              className="btn btn-download"
              onClick={handleDownload}
            >
              Download Your Video
            </button>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>  
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Converter;