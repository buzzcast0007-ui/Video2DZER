import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎥',
      title: 'Easy Video Upload',
      description: 'Upload any video file and let our AI transform it'
    },
    {
      icon: '🎨',
      title: 'Smart 2D Conversion',
      description: 'Advanced AI technology to convert your videos to anime style'
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      description: 'Get your results quickly with our optimized servers'
    },
    {
      icon: '📥',
      title: 'Easy Download',
      description: 'Download your converted videos in high quality'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Video2DZER</h1>
          <p className="hero-subtitle">Transform Your Videos into Amazing 2D Anime</p>
          <p className="hero-description">
            Experience the magic of AI-powered video conversion. Turn any video into stunning 2D anime style.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/converter')}
          >
            Start Converting Now
          </button>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Why Choose Video2DZER?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-container">
          <div className="stat">
            <h3>10K+</h3>
            <p>Videos Converted</p>
          </div>
          <div className="stat">
            <h3>5K+</h3>
            <p>Happy Users</p>
          </div>
          <div className="stat">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div className="stat">
            <h3>&lt;5min</h3>
            <p>Average Processing Time</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;