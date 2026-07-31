import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/RecentEvents.css";

function RecentEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const token = localStorage.getItem("app_token");

    try {
      const res = await fetch(
        "http://localhost:3000/api/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      // newest first
      setEvents(data.reverse());

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="recent-events-card">

      <div className="recent-events-header">
        <h2>Recent Events</h2>
      <button onClick={() => navigate("/events")}>
    View All
</button>
        
      </div>

      <table className="events-table">

        <thead>
          <tr>
            <th>Event</th>
            <th>Room</th>
            <th>Date</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {events.slice(0,5).map((event) =>  {

            const totalCapacity =
              event.rooms?.reduce(
                (sum, room) => sum + room.capacity,
                0
              ) || 0;

            const status =
              new Date(event.eventDate) > new Date()
                ? "Open"
                : "Closed";

            return (

              <tr key={event._id}>

                <td>{event.eventName}</td>

                <td>
                  {event.rooms?.[0]?.roomNo || "-"}
                </td>

                <td>
                  {new Date(event.eventDate).toLocaleDateString()}
                </td>

                <td>{totalCapacity}</td>

                <td>

                  <span
                    className={`status ${status.toLowerCase()}`}
                  >
                    {status}
                  </span>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}

export default RecentEvents;