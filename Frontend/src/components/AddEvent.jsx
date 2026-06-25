import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [rooms, setRooms] = useState([{ roomNo: '', capacity: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const addRoomField = () => {
    setRooms([...rooms, { roomNo: '', capacity: '' }]);
  };

  const removeRoomField = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const eventData = {
      eventName,
      eventDate,
      rooms: rooms.map(r => ({ roomNo: r.roomNo, capacity: Number(r.capacity) }))
    };

    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add event");
      }
    } catch (err) {
      console.error("Error creating event:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard'); 
  };

  return (
    <div className="form-page-wrapper" style={{ padding: '20px 10px' }}>
      {/* Clean, Theme-matching Back Button */}
      <button 
        onClick={() => navigate('/dashboard')} // Goes back to Registration List / Dashboard
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
        ⬅️ Back to List
      </button>
      
      <div className="form-card edit-card-view" style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Dynamic calendar color injector */}
        <style>{`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1) brightness(2);
            cursor: pointer;
          }
        `}</style>

        <h2>📅 Create New Event</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Create an event workspace setup and define room thresholds.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>EVENT NAME</label>
              <input 
                type="text" 
                required 
                placeholder="Hackathon"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>EVENT DATE</label>
              <input 
                type="date" 
                required 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '10px 0' }} />
          
          <h3>Assign Rooms & Seating Matrix</h3>
          
          {rooms.map((room, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Room Name / No." 
                required
                value={room.roomNo}
                onChange={(e) => handleRoomChange(index, 'roomNo', e.target.value)}
                style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
              <input 
                type="number" 
                placeholder="Capacity" 
                required
                min="1"
                value={room.capacity}
                onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
              {rooms.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeRoomField(index)} 
                  style={{ background: 'transparent', border: 'none', color: '#c53a3a', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          <button 
            type="button" 
            onClick={addRoomField}
            style={{ width: 'fit-content', padding: '8px 16px', borderRadius: '6px', border: '1px dashed var(--brand-primary)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}
          >
            ➕ Add Another Room
          </button>

          <button 
            type="submit" 
            className="btn-cta-main" 
            disabled={isSubmitting}
            style={{ padding: '14px', borderRadius: '8px', marginTop: '10px', width: '100%' }}
          >
            {isSubmitting ? "Saving Workspace Matrix..." : "Save Event Setup"}
          </button>
        </form>

        {/* Styled Theme Success Modal */}
        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="modal-content-box" style={{ textAlign: 'center' }}>
              <div className="modal-icon" style={{ color: '#6ed15a' }}>🎉</div>
              <h3>Success!</h3>
              <p style={{ margin: '12px 0', color: 'var(--text-main)' }}>Event added successfully!</p>
              <button 
                className="action-btn-edit" 
                onClick={handleModalClose}
                style={{ marginTop: '15px', background: 'var(--brand-primary)', color: '#fff', cursor: 'pointer', padding: '10px 30px' }}
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

export default AddEvent;