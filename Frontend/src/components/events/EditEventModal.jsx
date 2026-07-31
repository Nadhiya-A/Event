import { useState, useEffect } from "react";

function EditEventModal({ event, onClose, refreshEvents }) {
  const [form, setForm] = useState({
    eventName: "",
    eventDate: "",
    roomNo: "",
    capacity: "",
  });

 useEffect(() => {
  if (event) {
    setForm({
      eventName: event.eventName,
      eventDate: event.eventDate?.split("T")[0],
      roomNo: event.rooms?.[0]?.roomNo || "",
      capacity: event.rooms?.[0]?.capacity || "",
    });
  }
}, [event]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  

  try {
    const token = localStorage.getItem("app_token");

    const response = await fetch(
      `http://localhost:3000/api/events/${event._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventName: form.eventName,
          eventDate: form.eventDate,
          rooms: [
            {
              roomNo: form.roomNo,
              capacity: Number(form.capacity),
            },
          ],
        }),
      }
    );

    const data = await response.json();


    if (response.ok) {
      alert("Event Updated Successfully!");

      refreshEvents();   // Refresh table

      onClose();         // Close modal
    } else {
      alert(data.error || "Update failed.");
    }

  } catch (err) {
console.error(err);  }
};
  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Edit Event</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="eventName"
            placeholder="Event Name"
            value={form.eventName}
            onChange={handleChange}
          />

          <input
            name="roomNo"
            placeholder="Room"
            value={form.roomNo}
            onChange={handleChange}
          />

          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditEventModal;