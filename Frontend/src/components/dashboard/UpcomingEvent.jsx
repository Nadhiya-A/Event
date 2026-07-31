import { useEffect, useState } from "react";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/UpcomingEvent.css";
function UpcomingEvent() {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUpcomingEvent();
  }, []);

  async function fetchUpcomingEvent() {
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

      const upcoming = data
        .filter(e => new Date(e.eventDate) > new Date())
        .sort(
          (a, b) =>
            new Date(a.eventDate) -
            new Date(b.eventDate)
        );

      if (upcoming.length > 0) {
        setEvent(upcoming[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (!event) {
  return (
    <section className="upcoming-event">
      <h2>Upcoming Event</h2>

      <div className="empty-event">
        <CalendarDays size={42} />
        <p>No upcoming events</p>
      </div>
    </section>
  );
}

  return (
  <section className="upcoming-event">

    <h2>Upcoming Event</h2>
      <div
className="upcoming-event-card"
onClick={() =>
        navigate("/events", {
            state: { highlightEvent: event._id }
        })
    }
>

    <h3>{event.eventName}</h3>

    <div className="upcoming-event-info">

        <span>
            <CalendarDays size={18}/>
            {new Date(event.eventDate).toLocaleDateString()}
        </span>

        <span>
            <Clock3 size={18}/>
            {event.eventTime || "Time TBA"}
        </span>

        <span>
            <MapPin size={18}/>
            {event.rooms?.[0]?.roomNo || "Venue TBA"}
        </span>

        <span>
            <Users size={18}/>
            {event.rooms?.[0]?.capacity || 0} Seats
        </span>

    </div>

    <p className="upcoming-view-text">
        Click to view event →
    </p>

</div>


  </section>
);
}

export default UpcomingEvent;