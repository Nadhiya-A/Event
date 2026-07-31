import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  CalendarDays,
  Building2,
  Ticket,
  Phone,
  CreditCard,
} from "lucide-react";

import "../../styles/EditRegistration.css";

const EditRegistration = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  events = [],
  registrations = [],
}) => {
  const [showCapacityModal, setShowCapacityModal] = useState(false);

  const [capacityDetails, setCapacityDetails] = useState({
    eventName: "",
    roomNo: "",
    availableSeats: 0,
  });

  const currentEventId =
    formData.eventId?._id ||
    formData.eventId ||
    formData.eventName ||
    "";

  const selectedEventObj = events.find(
    (evt) => evt._id === currentEventId
  );

  const availableRooms = selectedEventObj
    ? selectedEventObj.rooms || []
    : [];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedEventObj) {
      const targetRoom = selectedEventObj.rooms?.find(
        (rm) => rm.roomNo === formData.roomNumber
      );

      if (targetRoom) {
        const maxCapacity = Number(targetRoom.capacity || 0);

        const existingBookedSeats = registrations
          .filter(
            (reg) =>
              (reg.eventId?._id === currentEventId ||
                reg.eventId === currentEventId) &&
              reg.roomNo === formData.roomNumber &&
              reg._id !== formData._id
          )
          .reduce(
            (sum, reg) =>
              sum + Number(reg.seats || reg.ticketCount || 0),
            0
          );

        const requestedTickets = Number(
          formData.ticketCount || 1
        );

        const availableSeatsLeft =
          maxCapacity - existingBookedSeats;

        if (
          existingBookedSeats + requestedTickets >
          maxCapacity
        ) {
          setCapacityDetails({
            eventName:
              selectedEventObj.eventName || "This Event",
            roomNo:
              formData.roomNumber ||
              "the specified room",
            availableSeats: Math.max(
              0,
              availableSeatsLeft
            ),
          });

          setShowCapacityModal(true);
          return;
        }
      }
    }

    onSubmit(e);
  };

  return (
    <div className="edit-registration-page">

      <div className="edit-registration-container">

        <button
          type="button"
          className="edit-back-btn"
          onClick={onCancel}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="edit-registration-card">

          <div className="edit-header">

            <div className="edit-icon">
              <Ticket
                size={42}
                color="#F97316"
              />
            </div>

            <h1>Edit Registration</h1>

            <p>
              Update attendee details, room assignment,
              ticket count and payment information.
            </p>

            <div className="edit-divider"></div>

          </div>

          <form
            className="edit-form"
            onSubmit={handleFormSubmit}
            autoComplete="off"
          >
                        {/* ================= Row 1 ================= */}

            <div className="edit-grid">

              <div>

                <label className="form-label">
                  <User size={18} />
                  Attendee Name
                </label>

                <input
                  type="text"
                  required
                  className="premium-input"
                  value={formData.userName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userName: e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label className="form-label">
                  <Phone size={18} />
                  Contact Number
                </label>

                <input
                  type="text"
                  required
                  className="premium-input"
                  value={formData.contact || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* ================= Row 2 ================= */}

            <div className="edit-grid">

              <div>

                <label className="form-label">
                  <CalendarDays size={18} />
                  Select Event
                </label>

                <select
                  required
                  className="premium-input"
                  value={currentEventId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventId: e.target.value,
                      roomNumber: "",
                    })
                  }
                >

                  <option value="">Select Event</option>

                  {events.map((evt) => (
                    <option
                      key={evt._id}
                      value={evt._id}
                    >
                      {evt.eventName}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="form-label">
                  <Building2 size={18} />
                  Room Assignment
                </label>

                <select
                  required
                  className="premium-input"
                  value={formData.roomNumber || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roomNumber: e.target.value,
                    })
                  }
                >

                  <option value="">Choose Room</option>

                  {availableRooms.map((room, index) => (
                    <option
                      key={index}
                      value={room.roomNo}
                    >
                      {room.roomNo} (Max {room.capacity})
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* ================= Row 3 ================= */}

            <div className="edit-grid">

              <div>

                <label className="form-label">
                  <Ticket size={18} />
                  Ticket Count
                </label>

                <input
                  type="number"
                  min="1"
                  required
                  className="premium-input"
                  value={formData.ticketCount || 1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ticketCount:
                        parseInt(e.target.value) || 1,
                    })
                  }
                />

              </div>

              <div>

                <label className="form-label">
                  <CreditCard size={18} />
                  Payment Status
                </label>

                <select
                  className="premium-input"
                  value={formData.paymentStatus || "Not Paid"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentStatus: e.target.value,
                    })
                  }
                >

                  <option value="Not Paid">
                    ⌛ Not Paid
                  </option>

                  <option value="Paid">
                    ✅ Paid
                  </option>

                </select>

              </div>

            </div>

            {/* ================= Buttons ================= */}

            <div className="edit-actions">

              <button
                type="button"
                className="edit-cancel-btn"
                onClick={onCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-save-btn"
              >
                Update Registration
              </button>

            </div>

          </form>

        </div>

      </div>
        
                {/* ================= CAPACITY MODAL ================= */}

      {showCapacityModal && (

        <div className="modal-overlay">

          <div className="capacity-modal">

            <div className="capacity-icon">
              ⚠️
            </div>

            <h2>Room Capacity Exceeded</h2>

            <p>
              <strong>{capacityDetails.eventName}</strong>
              <br />
              Room <strong>{capacityDetails.roomNo}</strong> does not have enough available seats.
            </p>

            <div className="capacity-info">

              <span>Available Seats</span>

              <h3>{capacityDetails.availableSeats}</h3>

            </div>

            <button
              type="button"
              className="capacity-btn"
              onClick={() => setShowCapacityModal(false)}
            >
              Got it
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default EditRegistration;