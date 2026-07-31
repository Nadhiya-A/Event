import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  CalendarDays,
  Building2,
  Phone,
  Ticket
} from "lucide-react";

import "../../styles/AddRegistration.css";

function AddRegistration({
  formData,
  onSubmit,
  onCancel,
  events,
}) {

  const [localData, setLocalData] = useState(formData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {

    if (localData.eventId) {

      const event = events.find(
        e => e._id === localData.eventId
      );

      setSelectedEvent(event || null);

    } else {

      setSelectedEvent(null);

    }

  }, [localData.eventId, events]);

  const handleChange = (field, value) => {

    setLocalData(prev => ({
      ...prev,
      [field]: value
    }));

  };

  const handleEventChange = (e) => {

    handleChange("eventId", e.target.value);

    handleChange("roomNumber", "");

  };

  const validateContact = (value) => {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[0-9]{10}$/;

    return (
      emailRegex.test(value) ||
      phoneRegex.test(value)
    );

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateContact(localData.contact)) {

      alert(
        "Please enter a valid Email or 10 digit Phone Number."
      );

      return;

    }

    onSubmit(localData);

  };

  return (

    <div className="add-registration-page">

      <div className="add-registration-card">

        <button
          type="button"
          className="add-back-button"
          onClick={onCancel}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="add-registration-header">

          <div className="add-registration-logo">

            <Ticket size={38} />

          </div>

          <h1>New Registration</h1>

          <p>
            Create a registration for your upcoming event.
          </p>

        </div>

        <div className="add-registration-divider"></div>

        <form
          className="add-registration-form"
          onSubmit={handleSubmit}
        >

          <div className="add-field">

            <label>

              <User size={16} />

              Attendee Name

            </label>

            <input
              type="text"
              required
              value={localData.userName || ""}
              onChange={(e) =>
                handleChange(
                  "userName",
                  e.target.value
                )
              }
            />

          </div>

          <div className="add-field">

            <label>

              <CalendarDays size={16} />

              Select Event

            </label>

            <select
              required
              value={localData.eventId || ""}
              onChange={handleEventChange}
            >

              <option value="">

                Select Event

              </option>

              {events.map(event => (

                <option
                  key={event._id}
                  value={event._id}
                >

                  {event.eventName}

                </option>

              ))}

            </select>

          </div>
                    <div className="add-field">

            <label>

              <Building2 size={16} />

              Room Allocation

            </label>

            <input
              type="text"
              required
              list="rooms"
              placeholder="Choose room"
              value={localData.roomNumber || ""}
              onChange={(e) =>
                handleChange(
                  "roomNumber",
                  e.target.value
                )
              }
            />

            <datalist id="rooms">

              {selectedEvent?.rooms?.map((room, index) => (

                <option
                  key={index}
                  value={room.roomNo}
                />

              ))}

            </datalist>

          </div>

          <div className="add-field">

            <label>

              <Ticket size={16} />

              Number of Tickets

            </label>

            <input
              type="number"
              required
              min="1"
              value={localData.ticketCount || 1}
              onChange={(e) =>
                handleChange(
                  "ticketCount",
                  Number(e.target.value)
                )
              }
            />

          </div>

          <div className="add-field add-field-full">

            <label>

              <Phone size={16} />

              Email or Phone

            </label>

            <input
              type="text"
              required
              placeholder="example@gmail.com or 9876543210"
              value={localData.contact || ""}
              onChange={(e) =>
                handleChange(
                  "contact",
                  e.target.value
                )
              }
            />

          </div>
     <div className="add-field">

    <label>

        Payment Status

    </label>

    <select
        value={localData.paymentStatus || "Not Paid"}
        onChange={(e)=>
            handleChange(
                "paymentStatus",
                e.target.value
            )
        }
    >

        <option value="Paid">

            Paid

        </option>

        <option value="Not Paid">

            Not Paid

        </option>

    </select>

</div>


          <div className="add-registration-divider"></div>

          <div className="add-registration-actions">

            <button
              type="button"
              className="add-cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-submit-btn"
            >
              Create Registration
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddRegistration;