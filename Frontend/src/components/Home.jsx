import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-landing-wrapper">
      <p className="hero-tagline">Next-Generation Event Operations</p>
      
      <h1 className="hero-title">
        Seamless Event Access & <span>Real-Time Allocation</span>
      </h1>
      
      <p className="hero-description">
        Welcome to the ultimate event control deck. Register attendees dynamically, track system-wide capacities, manage room infrastructure configurations, and watch your metrics adjust natively.
      </p>
      
      <div className="cta-group">
        <button 
          className="btn-cta-main" 
          onClick={() => navigate('/dashboard')}
        >
          Launch Control Dashboard 📊
        </button>
        <button 
          className="btn-secondary" 
          style={{ padding: '16px 32px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '600' }}
          onClick={() => navigate('/add-registration')}
        >
          Add Registration ➕
        </button>
      </div>

      <div className="features-showcase-grid">
        <div className="feature-glass-card">
          <div className="icon-box">⚡</div>
          <h4>Instant Verification</h4>
          <p>Process inbound registrations instantly with explicit room balancing rules engineered directly onto your database core layers.</p>
        </div>

        <div className="feature-glass-card">
          <div className="icon-box">💎</div>
          <h4>Premium Aesthetics</h4>
          <p>Navigate a responsive dark-workspace platform styled intentionally with beautiful typography, high contrast ratios, and layout stability.</p>
        </div>

        <div className="feature-glass-card">
          <div className="icon-box">🛡️</div>
          <h4>Capacity Guardrails</h4>
          <p>Prevent system room overflow errors automatically with embedded array verification checking backend capacity rules sequentially.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;