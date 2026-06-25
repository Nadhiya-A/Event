import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-view-container" style={{ padding: '0 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Clean, Theme-matching Back Button */}
      <button 
        onClick={() => navigate('/')} // Goes back to Home Overview
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(145, 47, 171, 0.1)',
          border: '1px solid rgba(145, 47, 171, 0.4)',
          color: '#e2d9e6',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '500',
          marginBottom: '20px',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--brand-primary)';
          e.currentTarget.style.boxShadow = '0 0 12px var(--brand-primary)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(145, 47, 171, 0.1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        🏠 Back to Home
      </button>

      {/* Hero Welcome Header Panel */}
      <div 
        className="about-hero-card" 
        style={{
          background: 'linear-gradient(135deg, rgba(145, 47, 171, 0.2) 0%, rgba(108, 52, 132, 0.05) 100%)',
          border: '1px solid rgba(145, 47, 171, 0.3)',
          borderRadius: '16px',
          padding: '40px 30px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--brand-primary)', filter: 'blur(80px)', opacity: 0.3, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '150px', height: '150px', background: '#d37d52', filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }}></div>

        <div 
          className="about-logo-wrapper" 
          style={{ 
            fontSize: '3rem', 
            background: 'rgba(255, 255, 255, 0.05)', 
            width: '80px', 
            height: '80px', 
            display: 'flex', 
            alignItems: 'center', 
            justify: 'center', 
            borderRadius: '50%', 
            margin: '0 auto 20px auto',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          📅
        </div>
        
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', marginBottom: '12px', letterSpacing: '0.5px' }}>
          About This System
        </h1>
        <p style={{ color: '#c5b9cc', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          An enterprise-grade orchestration workspace designed to help structural organizers manage event registration loops, verify seating metrics, and audit live transactional analytics smoothly.
        </p>
      </div>

      {/* Dynamic Operational Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        
        {/* Pillar 1: Efficient */}
        <div style={{ background: '#1e1a1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>High-Speed Operations</h3>
          <p style={{ color: '#a699af', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Add, update, filter, and track transactional seat counts instantly without manual overhead loops.
          </p>
        </div>

        {/* Pillar 2: Simple */}
        <div style={{ background: '#1e1a1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>😊</div>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Intuitive Interfaces</h3>
          <p style={{ color: '#a699af', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Sophisticated, modern metrics panels paired with responsive grid components tailored for fast navigation.
          </p>
        </div>

        {/* Pillar 3: Reliable */}
        <div style={{ background: '#1e1a1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🛡️</div>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Threshold Guardrails</h3>
          <p style={{ color: '#a699af', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Built-in capacity monitors check allocations and prevent data leaks, preventing overbooking errors entirely.
          </p>
        </div>

      </div>

      {/* System Statistics Footer Note */}
      <div 
        style={{ 
          textAlign: 'center', 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          paddingTop: '20px', 
          fontSize: '0.85rem', 
          color: '#76697f' 
        }}
      >
        Event Registration Management System Matrix • Version 1.2.0 • Running Secured
      </div>

    </div>
  );
}

export default About;