import { useEffect, useState } from "react";
import "../../styles/NotificationsPanel.css";

function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    const token = localStorage.getItem("app_token");

    try {
      const res = await fetch(
        "http://localhost:3000/api/registrations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const registrations = await res.json();

      const latest = registrations
        .slice(-5)
        .reverse()
        .map((reg) => ({
          id: reg._id,
          text: `${reg.userName} registered for ${reg.eventId?.eventName}`,
        }));

      setNotifications(latest);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="notifications-panel">

      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            className="notification-item"
          >
            🔔 {note.text}
          </div>
        ))
      )}

    </section>
  );
}

export default NotificationsPanel;