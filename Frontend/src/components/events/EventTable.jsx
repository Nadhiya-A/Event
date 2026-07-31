import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import AddEventModal from "./AddEventModal";

import EditEventModal from "./EditEventModal";

import DeleteEventModal from "./DeleteEventModal";

import "../../styles/Event.css";

function EventTable({ currentUser }) {
const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const location = useLocation();

const highlightEvent = location.state?.highlightEvent;

const rowRefs = useRef({});
const [search, setSearch] = useState("");

    
const [events, setEvents] = useState([]);
const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("app_token");

    const res = await fetch(
      "http://localhost:3000/api/events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setEvents(data);

  } catch(err){
    console.error(err);
}
};

useEffect(() => {
  fetchEvents();
}, []);
useEffect(() => {
  if (!highlightEvent || events.length === 0) return;

  const row = rowRefs.current[highlightEvent];

  if (row) {
    row.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    row.classList.add("highlight-event");

    setTimeout(() => {
      row.classList.remove("highlight-event");
    }, 2000);
  }
}, [events, highlightEvent]);
const filteredEvents = events.filter(event =>
  event.eventName.toLowerCase().includes(search.toLowerCase())
);



    return (
    <div className="event-table-card">
        <div className="event-table-header">
            <div>
                <h2>Events</h2>
                <p>Manage and organize all your events.</p>
            </div>
            {currentUser?.role === "admin" && (
    <button
        className="add-event-btn"
        onClick={() => setShowModal(true)}
    >
        + Add Event
    </button>
)}
            </div>

<div className="event-search">
  <input
    type="text"
    placeholder="Search events..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
<div className="event-stats">

<div className="stat-card">
<h2>{events.length}</h2>
<p>Total Events</p>
</div>

<div className="stat-card">
<h2>
{
events.reduce(
(sum,event)=>
sum+(event.rooms[0]?.capacity||0),
0
)
}
</h2>
<p>Total Capacity</p>
</div>

<div className="stat-card">
<h2>
{
events.filter(
e=>new Date(e.eventDate)>new Date()
).length
}
</h2>
<p>Upcoming</p>
</div>

</div>
    <table className="event-table">
        <thead>

          <tr>

            <th>Event</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Capacity</th>
          
  {currentUser?.role === "admin" && (
    <th>Actions</th>
  )}

          </tr>

        </thead>
<tbody>
  {filteredEvents.map((event) => (
    <tr
      key={event._id}
      ref={(el) => (rowRefs.current[event._id] = el)}
    >
      <td>{event.eventName}</td>

      <td>{event.rooms?.[0]?.roomNo || "-"}</td>

      <td>{new Date(event.eventDate).toLocaleDateString()}</td>

      <td>{event.rooms?.[0]?.capacity || "-"}</td>

      {currentUser?.role === "admin" && (
        <td className="actions">
          <button
            className="edit-btn"
            onClick={() => {
              setSelectedEvent(event);
              setEditModal(true);
            }}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setSelectedEvent(event);
              setDeleteModal(true);
            }}
          >
            🗑 Delete
          </button>
        </td>
      )}
    </tr>
  ))}
</tbody>
 

      </table>
           {currentUser?.role === "admin" && showModal && (
    <AddEventModal
    onClose={() => setShowModal(false)}
    refreshEvents={fetchEvents}
/>
)}
            {currentUser?.role === "admin" && editModal && (
   <EditEventModal
    event={selectedEvent}
    onClose={() => setEditModal(false)}
    refreshEvents={fetchEvents}
/>
            )}
      {currentUser?.role === "admin" && deleteModal && (
    <DeleteEventModal
        event={selectedEvent}
        onClose={() => setDeleteModal(false)}
        refreshEvents={fetchEvents}
    />
)}
    </div>
  );
}

export default EventTable;