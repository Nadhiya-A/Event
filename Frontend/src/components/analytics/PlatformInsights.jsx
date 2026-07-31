import {
  Lightbulb,
  CalendarDays,
  Users,
  Trophy,
} from "lucide-react";

function PlatformInsights({ events, registrations }) {
  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) > new Date()
  ).length;

  const totalCapacity = events.reduce((sum, event) => {
    const capacity = event.rooms.reduce(
      (roomSum, room) => roomSum + room.capacity,
      0
    );
    return sum + capacity;
  }, 0);

  const totalTickets = registrations.reduce(
    (sum, registration) => sum + registration.ticketCount,
    0
  );

  const averageRegistrations =
    events.length === 0
      ? 0
      : Math.round(totalTickets / events.length);

  const topEvent = events.reduce(
    (best, event) => {
      const registrationsCount = registrations
        .filter((registration) => registration.eventId?._id === event._id)
        .reduce((sum, registration) => sum + registration.ticketCount, 0);

      if (registrationsCount > best.count) {
        return {
          name: event.eventName,
          count: registrationsCount,
        };
      }

      return best;
    },
    {
      name: "-",
      count: 0,
    }
  );

  return (
    <section className="analytics-card">

      <div className="analytics-section-title">

        <h2>Platform Insights</h2>

        <span>
          <Lightbulb size={16} />
          Smart
        </span>

      </div>

      <div className="insight-grid">

        <div className="insight-item">

          <div className="insight-icon orange">
            <Trophy size={22} />
          </div>

          <div>
            <h4>Top Event</h4>
            <p>{topEvent.name}</p>
          </div>

        </div>

        <div className="insight-item">

          <div className="insight-icon blue">
            <CalendarDays size={22} />
          </div>

          <div>
            <h4>Upcoming</h4>
            <p>{upcomingEvents} Events</p>
          </div>

        </div>

        <div className="insight-item">

          <div className="insight-icon green">
            <Users size={22} />
          </div>

          <div>
            <h4>Average</h4>
            <p>{averageRegistrations} / Event</p>
          </div>

        </div>

        <div className="insight-item">

          <div className="insight-icon purple">
            <Users size={22} />
          </div>

          <div>
            <h4>Total Capacity</h4>
            <p>{totalCapacity}</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default PlatformInsights;