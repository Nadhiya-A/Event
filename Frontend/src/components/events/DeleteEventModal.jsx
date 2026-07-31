function DeleteEventModal({
  event,
  onClose,
  refreshEvents,
}) {

  async function handleDelete() {

    const token = localStorage.getItem("app_token");

    try {

      const res = await fetch(
        `http://localhost:3000/api/events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        refreshEvents();
        onClose();
      } else {
        alert("Failed to delete event.");
      }

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <h2>Delete Event</h2>

        <p>
          Are you sure you want to delete
          <strong> {event?.eventName}</strong> ?
        </p>

        <div className="modal-buttons">

          <button onClick={handleDelete}>
            Delete
          </button>

          <button onClick={onClose}>
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteEventModal;