import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CalendarPlus,
  CalendarDays,
  Building2,
  Users,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
} from "lucide-react";

import "../../styles/AddEvent.css";

function AddEvent() {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [rooms, setRooms] = useState([
    {
      roomNo: "",
      capacity: "",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* ==========================
      ROOM FUNCTIONS
  ========================== */

  const handleRoomChange = (index, field, value) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        roomNo: "",
        capacity: "",
      },
    ]);
  };

  const deleteRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  /* ==========================
      SUBMIT
  ========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("app_token");

      const response = await fetch(
        "http://localhost:3000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventName,
            eventDate,
            rooms: rooms.map((room) => ({
              roomNo: room.roomNo,
              capacity: Number(room.capacity),
            })),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setShowSuccessModal(true);
    } catch (err) {
      alert(err.message || "Unable to create event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/events");
  };

  const totalCapacity = rooms.reduce(
    (sum, room) => sum + Number(room.capacity || 0),
    0
  );

  return (
    <div className="add-event-page">
        <button
  className="back-btn"
  onClick={() => navigate("/events")}
>
  <ArrowLeft size={18} />
  Back to Events
</button>
      <div className="event-card">

        {/* ==========================
            HERO
        ========================== */}

        <div className="event-hero">

          <CalendarPlus className="event-hero-icon" />

          <div className="event-hero-content">

            <span className="event-badge">
              <CalendarPlus size={16} />
              Event Management
            </span>

            <h1>Create Event</h1>

            <p>
              Organize professional events, configure rooms,
              and manage attendee capacity from one powerful dashboard.
            </p>

          </div>

        </div>

        {/* ==========================
            STATISTICS
        ========================== */}
<div className="event-form-card">

    <div className="event-stats">

        <div className="event-stat-card">
            <Building2 size={28} />
            <h2>{rooms.length}</h2>
            <span>Total Rooms</span>
        </div>

        <div className="event-stat-card">
            <Users size={28} />
            <h2>{totalCapacity}</h2>
            <span>Total Capacity</span>
        </div>

        <div className="event-stat-card">
            <CalendarDays size={28} />
            <h2>
                {eventDate
                    ? new Date(eventDate).toLocaleDateString()
                    : "--"}
            </h2>
            <span>Event Date</span>
        </div>

    </div>

        {/* Continue with the form... */}

<form
  className="event-form"
  onSubmit={handleSubmit}
>
                  <div className="section-title">

            <CalendarPlus size={20} />

            <h2>Event Details</h2>

          </div>

          <div className="event-grid">

            <div className="form-group">

              <label>Event Name</label>

              <input
                type="text"
                placeholder="Hackathon 2026"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Event Date</label>

              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />

            </div>

          </div>

          <div className="section-title room-heading">

            <Building2 size={20} />

            <h2>Room Configuration</h2>

          </div>

          {rooms.map((room, index) => (

            <div
              key={index}
              className="room-card"
            >

              <div className="room-card-header">

                <h3>
                  Room {index + 1}
                </h3>

                {rooms.length > 1 && (

                  <button
                    type="button"
                    className="delete-room-btn"
                    onClick={() => deleteRoom(index)}
                  >
                    <Trash2 size={18} />
                  </button>

                )}

              </div>

              <div className="room-grid">

                <div className="form-group">

                  <label>Room Name / Number</label>

                  <input
                    type="text"
                    placeholder="A101"
                    value={room.roomNo}
                    onChange={(e) =>
                      handleRoomChange(
                        index,
                        "roomNo",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Capacity</label>

                  <input
                    type="number"
                    min="1"
                    placeholder="100"
                    value={room.capacity}
                    onChange={(e) =>
                      handleRoomChange(
                        index,
                        "capacity",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

            </div>

          ))}

          <button
            type="button"
            className="add-room-btn"
            onClick={addRoom}
          >

            <Plus size={18} />

            Add Another Room

          </button>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/events")}
            >

              Cancel

            </button>

            <button
              type="submit"
              className="create-event-btn"
              disabled={isSubmitting}
            >

              <Save size={18} />

              {isSubmitting
                ? "Creating..."
                : "Create Event"}

            </button>

          </div>

               </form>

      </div> {/* event-form-card */}

    </div> {/* event-card */}

      {showSuccessModal && (

        <div className="success-modal-overlay">

          <div className="success-modal">

            <div className="success-icon">

              <CheckCircle2 size={70} />

            </div>

            <h2>
              Event Created Successfully!
            </h2>

            <p>
              Your event is now live and ready for
              registrations.
            </p>

            <button
              className="success-btn"
              onClick={closeModal}
            >
              Continue
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AddEvent;