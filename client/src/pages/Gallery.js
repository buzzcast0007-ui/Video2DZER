import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

function Gallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos/list');
      setVideos(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete(`/api/videos/${videoId}`);
        setVideos(videos.filter(v => v.id !== videoId));
      } catch (error) {
        console.error('Failed to delete video:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#48bb78';
      case 'converting': return '#ed8936';
      case 'uploaded': return '#4299e1';
      default: return '#999';
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Your Videos</h1>
        <p>View and manage your converted videos</p>
      </div>

      {loading ? (
        <div className="loading">Loading your videos...</div>
      ) : videos.length === 0 ? (
        <div className="empty-state">
          <p>No videos yet. Upload your first video to get started!</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card fade-in">
              <div className="video-preview">
                <div className="preview-icon">🎬</div>
              </div>
              
              <div className="video-info">
                <h3 className="video-title">{video.originalName}</h3>
                
                <div className="video-details">
                  <p><span className="label">Status:</span> 
                    <span className="status" style={{ color: getStatusColor(video.status) }}>
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </span>
                  </p>
                  <p><span className="label">Size:</span> {(video.filesize / 1024 / 1024).toFixed(2)} MB</p>
                  <p><span className="label">Uploaded:</span> {new Date(video.uploadDate).toLocaleDateString()}</p>
                </div>

                {video.progress !== undefined && (
                  <div className="progress-bar-small">
                    <div className="progress-fill-small" style={{ width: `${video.progress}%` }}></div>
                  </div>
                )}
              </div>

              <div className="video-actions">
                {video.status === 'completed' && (
                  <button className="btn-action btn-download">Download</button>
                )}
                <button 
                  className="btn-action btn-delete"
                  onClick={() => deleteVideo(video.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;