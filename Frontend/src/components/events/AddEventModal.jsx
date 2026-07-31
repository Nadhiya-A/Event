import { useState } from "react";

function AddEventModal({ onClose }) {
  const [event, setEvent] = useState({
    title: "",
    category: "",
    venue: "",
    date: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:3000/api/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("app_token")}`,
        },
        body: JSON.stringify({
          eventName: event.title,
          eventDate: event.date,
          rooms: [
            {
              roomNo: event.venue,
              capacity: Number(event.capacity),
            },
          ],
        }),
      }
    );

    if (response.ok) {
      alert("Event Added Successfully!");
      window.location.reload();
    } else {
      const data = await response.json();
      alert(data.message || "Failed to add event.");
    }
  } catch (err) {
    console.error(err);
  }

  onClose();
};

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <h2>Add Event</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Event Name"
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />

          <input
            name="venue"
            placeholder="Venue"
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button type="submit">
              Save Event
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

export default AddEventModal;