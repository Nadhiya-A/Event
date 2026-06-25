import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationList({ registrations, search, setSearch, onSearchSubmit, onEdit, onDeleteTrigger }) {
  const navigate = useNavigate();
  
  // High Impact Dashboard Calculations
  const metrics = registrations.reduce((accum, curr) => {
    accum.tickets += Number(curr.ticketCount || 0);
    if(curr.paymentStatus === "Paid") accum.paid++;
    else accum.unpaid++;
    return accum;
  }, { tickets: 0, paid: 0, unpaid: 0 });

  return (
    <div className="list-view-container" style={{ padding: '0 10px' }}>
      {/* Dynamic Visual Analytics Dashboard Row */}
      <div className="dashboard-metrics" style={{ gap: '16px', marginBottom: '24px' }}>
        <div className="metric-card card-total" style={{ backgroundColor:'#a75ad1', padding: '16px 20px' }}>
          <div className="metric-icon" style={{ backgroundColor: '#6c3484b3' }}>👥</div>
          <div className="metric-info">
            <h2 style={{ color: '#3c0451', fontSize: '0.95rem', fontWeight: '700', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Total Registrations</h2>
            <div className="value" style={{ textAlign: "center", fontSize: '2rem' }}>{registrations.length}</div>
          </div>
        </div>
        <div className="metric-card card-tickets" style={{ backgroundColor: '#d37d52', padding: '16px 20px' }}>
          <div className="metric-icon">🎟️</div>
          <div className="metric-info">
            <h2 style={{ color: '#d0460a', fontSize: '0.95rem', fontWeight: '700', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.9px' }}>Total Tickets Sold</h2>
            <div className="value" style={{ textAlign: "center", fontSize: '2rem' }}>{metrics.tickets}</div>
          </div>
        </div>
        <div className="metric-card card-paid" style={{ backgroundColor: '#6ed15a', padding: '16px 20px' }}>
          <div className="metric-icon">✅</div>
          <div className="metric-info">
            <h2 style={{ color: '#04491e', fontSize: '0.95rem', fontWeight: '700', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.9px' }}>Paid Bookings</h2>
            <div className="value" style={{ textAlign: "center", fontSize: '2rem' }}>{metrics.paid}</div>
          </div>
        </div>
        <div className="metric-card card-pending" style={{ backgroundColor: '#c53a3a', padding: '16px 20px' }}>
          <div className="metric-icon">⏳</div>
          <div className="metric-info">
            <h2 style={{ color: '#740f0f', fontSize: '0.95rem', fontWeight: '700', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.9px' }}>Pending Payments</h2>
            <div className="value" style={{ textAlign: "center", fontSize: '2rem' }}>{metrics.unpaid}</div>
          </div>
        </div>
      </div>

      {/* Operations Controls Section */}
      <div className="controls-bar" style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button 
          type="button"
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(145, 47, 171, 0.1)',
            border: '1px solid rgba(145, 47, 171, 0.4)',
            color: '#e2d9e6',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            height: '46px',
            whiteSpace: 'nowrap'
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
          🏠 Home Overview
        </button>

        <form onSubmit={onSearchSubmit} className="search-form-wrapper" style={{ flex: 1, display: 'flex', gap: '10px', margin: 0 }}>
          <div className="search-input-container" style={{ flex: 1 }}>
            <span className="search-icon">🔍</span>
            <input 
              type="text"
              className="search-field"
              placeholder="Search by name, contact, status, event name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="search-submit-btn" style={{ height: '46px' }}>Search</button>
        </form>
      </div>

      {/* Primary Grid Interface */}
      <div className="table-wrapper" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
        {registrations.length === 0 ? (
          <div 
            className="no-records-card" 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '50px 30px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
            }}
          >
            <div 
              style={{ 
                fontSize: '48px', 
                marginBottom: '16px',
                background: 'rgba(145, 47, 171, 0.1)',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '1px dashed rgba(145, 47, 171, 0.3)'
              }}
            >
              🔍
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 8px 0', fontWeight: '600' }}>
              No Registration Matches Found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '400px', lineHeight: '1.5' }}>
              We couldn't find any data matching your current filter parameters. Try checking your spelling or clearing the search.
            </p>
          </div>
        ) : (
          <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ width: '22%', backgroundColor: '#1e1a1f', padding: '16px 12px', textAlign: 'left' }}><h3>USER DETAILS</h3></th>
                <th style={{ width: '10%', backgroundColor: '#262228', padding: '16px 12px', textAlign: 'center' }}><h3>TICKETS</h3></th>
                <th style={{ width: '20%', backgroundColor: '#262228', padding: '16px 12px', textAlign: 'left' }}><h3>CONTACT</h3></th>
                <th style={{ width: '23%', backgroundColor: '#262228', padding: '16px 12px', textAlign: 'left' }}><h3>EVENT ASSIGNMENT</h3></th>
                <th style={{ width: '13%', backgroundColor: '#262228', padding: '16px 12px', textTransform: 'uppercase', textAlign: 'center' }}><h3>STATUS</h3></th>
                <th style={{ width: '12%', backgroundColor: '#262228', padding: '16px 12px', textTransform: 'uppercase', textAlign: 'center' }}><h3>ACTIONS</h3></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  {/* Column 1: User Profile Block */}
                  <td data-label="User Details" style={{ padding: '12px' }}>
                    <div className="user-profile-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="avatar-placeholder">{item.userName ? item.userName.charAt(0).toUpperCase() : '?'}</div>
                      <span className="user-name-text" style={{ fontWeight: '600', color: '#fff' }}>{item.userName}</span>
                    </div>
                  </td>
                  
                  {/* Column 2: Tickets Badging */}
                  <td data-label="Tickets" style={{ padding: '12px', textAlign: 'center' }}>
                    <span className="ticket-count-badge" style={{ padding: '4px 10px' }}>{item.ticketCount}</span>
                  </td>
                  
                  {/* Column 3: Contact Info */}
                  <td data-label="Contact Address" style={{ padding: '12px', fontSize: '0.9rem', color: '#c5b9cc' }}>
                    {item.contact}
                  </td>
                  
                  {/* Column 4: Unified Event Allocation Stack */}
                  <td data-label="Event Assignment" style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontWeight: '600', color: '#e2d9e6', fontSize: '0.95rem' }}>
                        {item.eventName || '—'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: '#a699af' }}>
                        <span>📅 {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : '—'}</span>
                        {item.roomNo && (
                          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            🚪 {item.roomNo}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  {/* Column 5: Payment Status Badge */}
                  <td data-label="Payment Status" style={{ padding: '12px', textAlign: 'center' }}>
                    <span className={`badge ${item.paymentStatus === 'Paid' ? 'paid' : 'not-paid'}`} style={{ display: 'inline-flex', padding: '6px 12px' }}>
                      <span className="badge-dot"></span>
                      {item.paymentStatus}
                    </span>
                  </td>
                  
                  {/* Column 6: Administrative Actions */}
                  <td data-label="Actions" style={{ padding: '12px', textAlign: 'center' }}>
                    <div className="actions-button-group" style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button 
                        className="action-btn-edit" 
                        title="Edit Data" 
                        onClick={() => onEdit(item)}
                        style={{ padding: '6px 10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        ✏️ <span style={{ fontSize: '0.8rem' }}>Edit</span>
                      </button>
                      <button 
                        className="action-btn-delete" 
                        title="Delete Data" 
                        onClick={() => onDeleteTrigger(item._id)}
                        style={{ padding: '6px 10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        🗑️ <span style={{ fontSize: '0.8rem' }}>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RegistrationList;