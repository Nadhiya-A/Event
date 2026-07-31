import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/RegistrationList.css";
import {
  ClipboardList,
  Ticket,
  BadgeCheck,
  CirclePlus,
  Search,
  X,
  MapPin,
} from "lucide-react";
// 🔄 FIX: Destructured onEdit to use your centralized editing initialization layout logic safely
const RegistrationList = ({ events , user , onEdit }) => { 


  const navigate = useNavigate();

  const [localRegistrations, setLocalRegistrations] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [loading, setLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState({ show: false, targetId: null });

  const isAdmin = user?.role === 'admin';

  
  const fetchDashboardData = async () => {
    setLoading(true);
  try 
  {
    const token = localStorage.getItem("app_token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const regRes = await fetch(
      `http://localhost:3000/api/registrations?search=${debouncedSearch}`,
      { headers }
    );
    if (!regRes.ok) {
      return;
    }
    const regData = await regRes.json();
    setLocalRegistrations(regData);
  } 
  catch (err) 
  {
    console.error("Failed to fetch registrations:", err);
  } 
  finally
   {
    setLoading(false);
  }
};



useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 400);

  return () => clearTimeout(timer);
}, [searchTerm]);

useEffect(() => {
  fetchDashboardData();
}, [debouncedSearch]);

  const openDeleteConfirmation = (id) => {
    if (!isAdmin) return;
    setDeleteModal({ show: true, targetId: id });
  };

  const handleExecuteDelete = async () => {
    const targetId = deleteModal.targetId;
    if (!targetId) return;

    try {
      const token = localStorage.getItem('app_token');
      const res = await fetch(`http://localhost:3000/api/registrations/${targetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setDeleteModal({ show: false, targetId: null });
        await fetchDashboardData(); 
      }
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const totalTicketsBooked = localRegistrations.reduce((acc, curr) => acc + Number(curr.ticketCount || 0), 0);
  const activePaidCount = localRegistrations.filter(r => r.paymentStatus === 'Paid').length;

  return (
   <div className="registration-page">

      
     {/* Hero Section */}

<div className="registration-hero">

  <div className="registration-hero-left">


    <h1>
      {isAdmin ? "Registration Operations" : "My Registrations"}
    </h1>

    <p>
      {isAdmin
        ? "Manage attendee allocations, monitor bookings, and streamline event operations from one place."
        : "Track your event registrations, ticket allocations, and payment status."}
    </p>

  </div>
<div className="registration-hero-right">

    {isAdmin ? (

    <button
        className="hero-create-btn"
        onClick={() => navigate("/room-allocation")}
    >
        <CirclePlus size={20}/>
        <span>Create Allocation</span>
    </button>

) : (

    <button
        className="hero-create-btn"
        onClick={() => navigate("/add-registration")}
    >
        <CirclePlus size={20}/>
        <span>New Registration</span>
    </button>

)}
</div>

</div>

{/* Statistics */}
<div className="registration-overview">

    <div className="registration-stats">

        <div className="stat-card">

            <div className="stat-icon">
                <ClipboardList size={28}/>
            </div>

            <div>

                <h2>{localRegistrations.length}</h2>

                <span>Total Registrations</span>

            </div>

        </div>

        <div className="stat-card">

            <div className="stat-icon">
                <Ticket size={28}/>
            </div>

            <div>

                <h2>{totalTicketsBooked}</h2>

                <span>Tickets Booked</span>

            </div>

        </div>

        <div className="stat-card">

            <div className="stat-icon">
                <BadgeCheck size={28}/>
            </div>

            <div>

                <h2>{activePaidCount}</h2>

                <span>Paid Registrations</span>

            </div>

        </div>

    </div>


</div>

{/* Search & Actions */}
<div className="registration-toolbar">

    <div className="search-wrapper">

        <Search
            size={20}
            className="search-icon"
        />

        <input
            className="premium-search"
            placeholder="Search attendee, event, room..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
        />

        {searchTerm && (

            <button
                className="clear-search-btn"
                onClick={()=>setSearchTerm("")}
            >
                <X size={18}/>
            </button>

        )}

    </div>

    <div className="results-count">

        {localRegistrations.length} Registration
        {localRegistrations.length!==1 && "s"}

    </div>

</div>

      {/* Workspace Layout */}
      <div className="workspace-layout" >
        
        {/* LEFT: Main Content (Table) */}
        <div className="workspace-main">
          <div
            className="metric-card-box registration-table-card"
          >
            {loading ? (
              <div  className="loading-state" >
                <div className="loading-icon" >⚡</div>
                <h3 className="loading-title" >Loading EventSphere...</h3>
                <p className="loading-text">Preparing your dashboard</p>
              </div>
            ) : localRegistrations.length === 0 ? (
              <div className="empty-state">
                <div  className="empty-icon" >🔍</div>
                <h3 className="empty-title">No Results Found</h3>
                <p className="empty-text">
                  {searchTerm ? "Try another search keyword." : user?.role === "admin" ? "No registrations have been created yet." : "You haven't been allocated to any events yet."}
                </p>
              </div>
            ) : (
              <div className="registration-table-wrapper">
                <table className="registration-table">
                  <thead>
                    <tr className="table-row">
                      <th >Attendee Name</th>
                      <th >Event Layout</th>
                      <th >Room No</th>
                      <th >Seats</th>
                      <th >Payment Status</th>
                      {isAdmin && <th >Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {localRegistrations.map((reg) => {
                      const recordId = reg._id || reg.id;
                      return (
                        <tr key={recordId} className="table-row">
                          <td>

<div className="user-cell">

<div className="user-avatar">

{reg.userName.charAt(0).toUpperCase()}

</div>

<div>

<div className="user-name">

{reg.userName}

</div>

<div className="user-email">

{reg.contact}

</div>

</div>

</div>

</td>
                          <td  className="event-name">{reg.eventId?.eventName || 'Unassigned Event'}</td>
                          <td>
   <span className="room-badge">
    <MapPin size={14} />
    {reg.roomNumber || "N/A"}
</span>
</td>
                          <td  className="ticket-count">{reg.ticketCount}</td>
                          <td >
                            <span
  className={`status-badge ${
    reg.paymentStatus === "Paid"
      ? "status-paid"
      : "status-pending"
  }`}
>
  {reg.paymentStatus === "Paid" ? "✔ Paid" : "⌛ Pending"}
</span>
                          </td>
                          {isAdmin && (
                            <td className="actions-column">
 <div className="action-buttons">
  <button
    className="table-action-btn edit"
    title="Edit Allocation"
    onClick={() => onEdit(reg)}
  >
    ✏ Edit
  </button>

  <button
    className="table-action-btn delete"
    title="Delete Allocation"
    onClick={() => openDeleteConfirmation(recordId)}
  >
    🗑 Delete
  </button>
</div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      
        
         {/* Confirmation Modal */}
      {deleteModal.show && (
        <div  className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-icon">⚠️</div>
            <h3 className="delete-title">Confirm Record Purge</h3>
            <p className="delete-text">
              Are you sure you want to permanently delete this allocation? This operational sequence cannot be undone.
            </p>
            <div className="delete-actions" >
              <button className="cancel-btn" onClick={() => setDeleteModal({ show: false, targetId: null })} >Cancel</button>
              <button  className="confirm-delete-btn" onClick={handleExecuteDelete} >Delete Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  
      </div>
  );
};

export default RegistrationList;