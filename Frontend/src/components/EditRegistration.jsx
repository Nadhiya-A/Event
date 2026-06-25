import React, { useState } from 'react';

const EditRegistration = ({ formData, setFormData, onSubmit, onCancel, events = [], registrations = [] }) => {
  // Modal state layout
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [capacityDetails, setCapacityDetails] = useState({ 
    eventName: '', 
    roomNo: '', 
    availableSeats: 0 
  });

  // Find the rooms associated with the currently selected event to populate the Room dropdown
  const selectedEventObj = events.find(
    (evt) => evt.eventName?.trim().toLowerCase() === formData.eventName?.trim().toLowerCase()
  );
  const availableRooms = selectedEventObj ? selectedEventObj.rooms || [] : [];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 1. Clean up inputs to prevent spelling/casing mismatch bugs
    const targetEventName = formData.eventName?.trim().toLowerCase();
    const targetRoomNo = formData.roomNo?.trim().toLowerCase();

    // 2. Find the master workspace configuration safely using eventName
    const masterEvent = events.find(
      (evt) => evt.eventName?.trim().toLowerCase() === targetEventName
    );

    if (masterEvent) {
      // 3. Find the correct room threshold configurations using roomNo
      const targetRoom = masterEvent.rooms?.find(
        (rm) => rm.roomNo?.trim().toLowerCase() === targetRoomNo
      );

      if (targetRoom) {
        const maxCapacity = Number(targetRoom.capacity || 0);

        // 4. Sum up existing tickets across other attendees (excluding current record instance)
        const existingBookedSeats = registrations
          .filter((reg) => 
            reg.eventName?.trim().toLowerCase() === targetEventName &&
            reg.roomNo?.trim().toLowerCase() === targetRoomNo &&
            reg._id !== formData._id 
          )
          .reduce((sum, reg) => sum + Number(reg.ticketCount || 0), 0);

        const requestedTickets = Number(formData.ticketCount || 0);
        const availableSeatsLeft = maxCapacity - existingBookedSeats;

        // 5. Trigger Frontend Modal Block if allocations exceed bounds
        if (existingBookedSeats + requestedTickets > maxCapacity) {
          setCapacityDetails({
            eventName: formData.eventName || 'This Event',
            roomNo: formData.roomNo || 'the specified room',
            availableSeats: Math.max(0, availableSeatsLeft)
          });
          setShowCapacityModal(true);
          return; // Blocks form onSubmit backend pipeline execution
        }
      }
    }

    // If limits aren't exceeded, pass layouts upward to handleUpdateSubmit in App.js
    onSubmit(e);
  };

  return (
    <div className="form-page-wrapper" style={{ padding: '20px 10px' }}>
      
      {/* Back Button */}
      <button 
        type="button"
        onClick={onCancel}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(145, 47, 171, 0.1)', border: '1px solid rgba(145, 47, 171, 0.4)',
          color: '#e2d9e6', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
          fontWeight: '500', marginBottom: '20px', transition: 'all 0.2s ease', maxWidth: 'fit-content'
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
        <h2>✏️ Edit Registration</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Modify the allocation fields below to update the registration record.
        </p>

        <form onSubmit={handleFormSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* User Name Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Attendee Name</label>
            <input 
              type="text" required
              autoComplete="new-password"
              placeholder="e.g. John Doe"
              value={formData.userName || ""}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
            />
          </div>

          {/* Event Name Dropdown SELECT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Select Event</label>
            <select
              required
              value={formData.eventName || ""}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value, roomNo: "" })} // Clears room choice if event changes
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <option value="">-- Choose an Event --</option>
              {events.map((evt, idx) => (
                <option key={idx} value={evt.eventName}>
                  {evt.eventName}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Event Date</label>
            <input 
              type="date" required
              value={formData.eventDate || ""}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
            />
          </div>

          {/* Room Number Dropdown SELECT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Room Assignment</label>
            <select
              required
              value={formData.roomNo || ""}
              onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <option value="">-- Choose Assigned Room --</option>
              {availableRooms.map((rm, idx) => (
                <option key={idx} value={rm.roomNo}>
                  {rm.roomNo}
                </option>
              ))}
            </select>
          </div>

          {/* Ticket Count & Contact Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Ticket Allocation</label>
              <input 
                type="number" min="1" required
                value={formData.ticketCount || 1}
                onChange={(e) => setFormData({ ...formData, ticketCount: parseInt(e.target.value) || 1 })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Contact Info</label>
              <input 
                type="text" required
                placeholder="Email or phone"
                value={formData.contact || ""}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          {/* Payment Status Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Payment Status</label>
            <select
              value={formData.paymentStatus || 'Not Paid'}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <option value="Paid">Paid ✅</option>
              <option value="Not Paid">Not Paid ❌</option>
              <option value="Pending">Pending ⏳</option>
            </select>
          </div>

          {/* Control Button Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', justifyContent: 'flex-end' }}>
            <button 
              type="button" onClick={onCancel}
              style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-cta-main" style={{ padding: '12px 28px', borderRadius: '8px' }}>
              Update Records 
            </button>
          </div>

        </form>
      </div>

      {/* ⚠️ Overbooking Limit Capacity Error Modal */}
      {showCapacityModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content-box" style={{ textAlign: 'center', background: '#262228', padding: '30px', borderRadius: '12px', border: '1px solid #d9534f', maxWidth: '440px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div className="modal-icon" style={{ color: '#d9534f', fontSize: '44px', marginBottom: '12px' }}>⚠️</div>
            <h3 style={{ color: '#fff', margin: '10px 0', fontSize: '1.25rem' }}>Room Allocation Warning</h3>
            <p style={{ margin: '12px 0', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              The number of seats is filled. <strong>{capacityDetails.eventName}</strong> is allocated to <strong>{capacityDetails.roomNo}</strong> and has hit maximum seating constraints.
            </p>
            <p style={{ fontWeight: 'bold', color: '#f0ad4e', margin: '15px 0', fontSize: '1.05rem' }}>
              Available Seats Left: {capacityDetails.availableSeats}
            </p>
            <button 
              className="action-btn-edit" 
              onClick={() => setShowCapacityModal(false)}
              style={{ marginTop: '15px', background: 'var(--brand-primary)', color: '#fff', cursor: 'pointer', padding: '10px 30px', border: 'none', borderRadius: '6px', fontWeight: '600', width: '100%' }}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditRegistration;