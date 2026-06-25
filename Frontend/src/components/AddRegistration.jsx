import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRegistration({ onRegistrationSuccess }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState('Not Paid');
  
  const [eventsList, setEventsList] = useState([]);
  const [roomsList, setRoomsList] = useState([]);
  
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedRoomNo, setSelectedRoomNo] = useState('');
  
  const [maxRoomCapacity, setMaxRoomCapacity] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Fetch all created events config templates
  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(res => res.json())
      .then(data => setEventsList(data || []))
      .catch(err => console.error("Error pulling events map:", err));
  }, []);

  const handleEventChange = (eventId) => {
    setSelectedEventId(eventId);
    setSelectedRoomNo('');
    setMaxRoomCapacity(0);
    setAvailableSeats(0);

    const targetEvent = eventsList.find(e => e._id === eventId);
    if (targetEvent && targetEvent.rooms) {
      setRoomsList(targetEvent.rooms);
    } else {
      setRoomsList([]);
    }
  };

  const handleRoomChange = (roomNo) => {
    setSelectedRoomNo(roomNo);
    if (!roomNo) {
      setMaxRoomCapacity(0);
      setAvailableSeats(0);
      return;
    }

    const currentEvent = eventsList.find(e => e._id === selectedEventId);
    const currentRoom = roomsList.find(r => r.roomNo === roomNo);
    
    if (currentRoom && currentEvent) {
      const roomCapacity = Number(currentRoom.capacity ?? 0);
      setMaxRoomCapacity(roomCapacity);

      // Live Calculation Check against database entries
      fetch(`http://localhost:3000/api/registrations`)
        .then(res => res.json())
        .then(allRegistrations => {
          if (!Array.isArray(allRegistrations)) return;

          const matchingBookings = allRegistrations.filter(reg => 
            reg.eventName === currentEvent.eventName && 
            reg.roomNo === roomNo
          );

          const activeBookingsCount = matchingBookings.reduce((sum, reg) => sum + Number(reg.ticketCount || 0), 0);
          setAvailableSeats(roomCapacity - activeBookingsCount);
        })
        .catch(() => {
          setAvailableSeats(roomCapacity);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentEvent = eventsList.find(e => e._id === selectedEventId);

    const payload = {
      userName,
      contact,
      ticketCount: Number(ticketCount),
      eventName: currentEvent ? currentEvent.eventName : '',
      eventDate: currentEvent ? currentEvent.eventDate : '',
      roomNo: selectedRoomNo,
      paymentStatus
    };

    try {
      const res = await fetch('http://localhost:3000/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration added successfully!");
        setUserName('');
        setContact('');
        setTicketCount(1);
        setSelectedEventId('');
        setSelectedRoomNo('');
        setMaxRoomCapacity(0);
        setAvailableSeats(0);
        if (onRegistrationSuccess) onRegistrationSuccess();
      } else {
        // Fallback to server validation response values if overbooked
        setAvailableSeats(data.availableSeats ?? 0);
        setShowWarningModal(true);
      }
    } catch (err) {
      console.error("Failed storing registration profile:", err);
    }
  };

  return (
    <div className="form-page-wrapper" style={{ padding: '20px 10px' }}>
      {/* Clean, Theme-matching Back Button */}
      <button 
        onClick={() => navigate('/dashboard')} // Redirects back to Registration List
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
          maxWidth: 'fit-content'
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
        ⬅️ Back to List
      </button>

      <div className="form-card edit-card-view" style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <style>{`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1) brightness(2);
            cursor: pointer;
          }
          select option {
            background: #1e1a1f;
            color: #fff;
          }
        `}</style>

        <h2>🎟️ Add Registration</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Fill out details below to secure seating structures.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Attendee Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Attendee Name</label>
            <input 
              type="text" required placeholder="Maha" value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
            />
          </div>

          {/* Select Event */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Select Event</label>
            <select 
              required value={selectedEventId} onChange={(e) => handleEventChange(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <option value="">-- Choose an Event --</option>
              {eventsList.map(ev => (
                <option key={ev._id} value={ev._id}>{ev.eventName}</option>
              ))}
            </select>
          </div>

          {/* Room Assignment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Room Assignment</label>
            <select 
              required disabled={!selectedEventId} value={selectedRoomNo} onChange={(e) => handleRoomChange(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: selectedEventId ? 'var(--input-bg)' : 'rgba(255,255,255,0.03)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <option value="">-- Choose Assigned Room --</option>
              {roomsList.map((rm, idx) => {
                const capacityVal = Number(rm.capacity ?? 0);
                return (
                  <option key={idx} value={rm.roomNo}>{rm.roomNo} (Max Capacity: {capacityVal})</option>
                );
              })}
            </select>
            
            {selectedRoomNo && (
              <span style={{ fontSize: '0.85rem', color: availableSeats >= ticketCount ? '#6ed15a' : '#c53a3a', fontWeight: '500', marginTop: '4px' }}>
                ℹ️ Live seats remaining in this room: {availableSeats} / {maxRoomCapacity} total
              </span>
            )}
          </div>

          {/* Ticket Count & Contact */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Ticket Allocation</label>
              <input 
                type="number" min="1" required value={ticketCount}
                onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Contact Info</label>
              <input 
                type="text" required placeholder="Email or phone" value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          {/* Payment Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Payment Status</label>
            <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <option value="Paid">Paid ✅</option>
              <option value="Not Paid">Not Paid ❌</option>
              <option value="Pending">Pending ⏳</option>
            </select>
          </div>

          <button type="submit" className="btn-cta-main" style={{ padding: '14px', borderRadius: '8px', marginTop: '10px' }}>
            Complete Registration Record
          </button>
        </form>

        {/* Warning Overlay Modal */}
        {showWarningModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div className="modal-content-box" style={{ background: '#1e1625', border: '2px solid #c53a3a', borderRadius: '16px', padding: '30px', maxWidth: '450px', width: '90%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#d37d52', fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>Room Allocation Warning</h3>
              <p style={{ color: '#c5b9cc', fontSize: '1rem', marginBottom: '15px', lineHeight: '1.5' }}>
                Cannot complete registration. The seats available in this room are already filled!
              </p>
              <div style={{ background: 'rgba(197, 58, 58, 0.1)', padding: '12px', borderRadius: '8px', margin: '15px 0', border: '1px solid rgba(197, 58, 58, 0.3)' }}>
                <div style={{ color: '#a699af', fontSize: '0.9rem' }}>Total Seats Configured: <strong style={{ color: '#fff' }}>{maxRoomCapacity}</strong></div>
                <div style={{ color: '#e6a15c', fontSize: '1rem', fontWeight: '700', marginTop: '4px' }}>Remaining Seats Available: {availableSeats}</div>
              </div>
              <button 
                onClick={() => setShowWarningModal(false)}
                style={{ background: '#c53a3a', color: '#fff', border: 'none', padding: '10px 30px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRegistration;