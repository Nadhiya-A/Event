import React from 'react';

function Navbar({ setView, onResetForm, isDarkMode, setIsDarkMode, isSidebarOpen, setIsSidebarOpen }) {
  
  const handleHamburgerClick = () => {
    // Toggle the sidebar state back and forth (Open <-> Closed)
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="navbar" style={{ background: 'var(--navbar-bg)', borderBottom: '1px solid var(--border)' }}>
      <div className="nav-left">
        {/* Three lines menu button to toggle sidebar */}
        <button className="hamburger-btn" onClick={handleHamburgerClick} title="Toggle Menu">
          ☰
        </button>
        
        {/* Main Title Banner with Logo */}
        <div className="nav-logo" onClick={() => { setView('list'); onResetForm(); }} style={{ cursor: 'pointer'}}>
          <span className="logo-icon">📅</span>
          <span className="logo-text">EVENT REGISTRATION MANAGEMENT SYSTEM</span>
        </div>
      </div>
      
      <div className="nav-right">
        {/* Theme Mode toggler */}
        <div className="theme-toggle-container">
          <button className={`theme-btn ${!isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(false)}>☀️ Light</button>
          <button className={`theme-btn ${isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(true)}>🌙 Dark</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;