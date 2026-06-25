import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import RegistrationList from "./components/RegistrationList";
import AddRegistration from "./components/AddRegistration";
import EditRegistration from "./components/EditRegistration";
import AddEvent from "./components/AddEvent";
import Home from "./components/Home"; 
import About from './components/About';
import "./App.css";

const API_URL = "http://localhost:3000/api/registrations";

function App() {
  const [registrations, setRegistrations] = useState([]);
  // 1. Defined your master events collection array state
  const [events, setEvents] = useState([]); 
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    eventName: '',
    eventDate: '', 
    roomNo: '',    
    ticketCount: 1,
    contact: '',
    paymentStatus: 'Not Paid'
  });

  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, targetId: null });
  const [roomErrorModal, setRoomErrorModal] = useState({ show: false, message: '', availableSeats: 0 });

  useEffect(() => {
    fetchDataRecords();
    fetchEventWorkspaceRecords(); // Fetch events layout configuration on startup
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDataRecords();
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const fetchDataRecords = async () => {
    try {
      const response = await fetch(`${API_URL}?search=${search.trim()}`);
      const data = await response.json();
      setRegistrations(data);
    } catch (err) {
      console.error("Failed fetching records matrix: ", err);
    }
  };

  // Helper API fetch pipeline to pull created rooms and capacities
  const fetchEventWorkspaceRecords = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Error connecting to master events server: ", err);
    }
  };

  const handleClearForm = () => {
    setFormData({ 
      userName: '', 
      eventName: '', 
      eventDate: '', 
      roomNo: '', 
      ticketCount: 1, 
      contact: '', 
      paymentStatus: 'Not Paid' 
    });
    setEditingId(null);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        handleClearForm();
        navigate('/dashboard');
        fetchDataRecords();
      } else {
        setRoomErrorModal({ 
          show: true, 
          message: result.message || "Room is already filled", 
          availableSeats: result.availableSeats ?? 0 
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditInitialize = (item) => {
    setEditingId(item._id);
    setFormData({
      _id: item._id, // Embed original ID so validation can isolate editing counts
      userName: item.userName,
      eventName: item.eventName || '',
      eventDate: item.eventDate ? item.eventDate.split('T')[0] : '', 
      roomNo: item.roomNo || '',
      ticketCount: item.ticketCount,
      contact: item.contact,
      paymentStatus: item.paymentStatus
    });
    navigate('/edit');
  };

  const handleUpdateSubmit = async (e) => {
    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();

      if (response.ok) {
        handleClearForm();
        navigate('/dashboard'); 
        fetchDataRecords();
      } else {
        setRoomErrorModal({ 
          show: true, 
          message: result.message || "Room is already filled", 
          availableSeats: result.availableSeats ?? 0 
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerDeletePrompt = (id) => {
    setDeleteModal({ show: true, targetId: id });
  };

  const executeDeleteAction = async () => {
    try {
      const response = await fetch(`${API_URL}/${deleteModal.targetId}`, { method: 'DELETE' });
      if (response.ok) {
        setDeleteModal({ show: false, targetId: null });
        fetchDataRecords();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <Navbar
        currentView={location.pathname}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setView={() => navigate('/dashboard')} 
        onResetForm={handleClearForm}
      />

      <div style={{ display: 'flex', flex: 1, flexDirection: window.innerWidth < 768 ? 'column' : 'row'}}>
        
        <aside className="app-left-sidebar" style={{
          width: isSidebarOpen ? (window.innerWidth < 768 ? '100%' : '260px') : '0px',
          padding: isSidebarOpen ? '30px 15px' : '30px 0px',
          opacity: isSidebarOpen ? 1 : 0,
          overflow: 'hidden',
          display: window.innerWidth < 768 ? 'row' : 'column', 
          background: 'var(--sidebar-gradient)',
          gap: '10px',
          borderRight: isSidebarOpen ? '1px solid var(--border)' : '0px solid transparent',
          justifyContent: window.innerWidth < 768 ? 'space-around' : 'flex-start',
          transition: 'width 0.3s ease, padding 0.3s ease, opacity 0.2s ease, border-color 0.3s ease',
          whiteSpace: 'nowrap'
        }}>
          
          <Link 
            to="/" 
            className={`sidebar-link-item method-nav-btn ${location.pathname === '/' ? 'active-tab' : ''}`}
            style={{ textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>🏡</span> Home Overview
          </Link>

          <Link 
            to="/dashboard" 
            className={`sidebar-link-item method-nav-btn ${location.pathname === '/dashboard' ? 'active-tab' : ''}`}
            style={{ textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>📊</span> Registration List
          </Link>

          <Link 
            to="/add-registration" 
            className={`sidebar-link-item method-nav-btn ${location.pathname === '/add-registration' ? 'active-tab' : ''}`}
            style={{ textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>➕</span> Add Registration
          </Link>

          <Link
            to="/add-event"
            className={`sidebar-link-item method-nav-btn ${location.pathname === '/add-event' ? 'active-tab' : ''}`}
            style={{ textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>📅</span> Add Event
          </Link>

          <Link 
            to="/about" 
            className={`sidebar-link-item method-nav-btn ${location.pathname === '/about' ? 'active-tab' : ''}`}
            style={{ textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center' }}>ℹ️</span> About
          </Link>
        </aside>
          
          
        <div className="content" style={{ flex: 1, padding: '40px' }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={
              <RegistrationList 
                registrations={registrations} 
                search={search} 
                setSearch={setSearch} 
                onSearchSubmit={handleSearchSubmit}
                onEdit={handleEditInitialize}
                onDeleteTrigger={triggerDeletePrompt}
              />
            } />

            <Route path="/add-registration" element={
              <AddRegistration 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleCreateSubmit}
                onCancel={() => navigate('/dashboard')}
              />
            } />

            {/* 2. Added events array data as a prop into your target Route configuration here */}
            <Route path="/edit" element={
              <EditRegistration 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleUpdateSubmit}
                onCancel={() => navigate('/dashboard')}
                events={events} // 👈 Passed safely right here!
                registrations={registrations}
              />
            } />

            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>

      {deleteModal.show && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <div className="modal-icon">❗</div>
            <h3>Confirm Delete</h3>
            <p style={{ color: 'var(--text-muted)', margin: '12px 0' }}>
              Are you sure you want to delete this registration?
            </p>
            <div className="modal-buttons">
              <button className="action-btn-delete" onClick={executeDeleteAction}>Delete</button>
              <button 
                className="action-btn-edit" 
                style={{ background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--border)' }}
                onClick={() => setDeleteModal({ show: false, targetId: null })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {roomErrorModal.show && (
        <div className="modal-overlay">
          <div className="modal-content-box" style={{ textAlign: 'center' }}>
            <div className="modal-icon" style={{ color: '#d9534f' }}>⚠️</div>
            <h3>Room Allocation Warning</h3>
            <p style={{ margin: '12px 0', color: 'var(--text-main)' }}>{roomErrorModal.message}</p>
            <p style={{ fontWeight: 'bold', color: '#f0ad4e' }}>Available Seats left: {roomErrorModal.availableSeats}</p>
            <button 
              className="action-btn-edit" 
              onClick={() => setRoomErrorModal({ show: false, message: '', availableSeats: 0 })}
              style={{ marginTop: '15px', background: 'var(--brand-primary)', color: '#fff', cursor: 'pointer' }}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;