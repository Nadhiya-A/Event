import {
  Users,
  TrendingUp,
  CalendarDays,
  Ticket,
} from "lucide-react";

function RegistrationTrends({ events, registrations }) {
  const totalCapacity = events.reduce((sum, event) => {
    return (
      sum +
      event.rooms.reduce((roomSum, room) => roomSum + room.capacity, 0)
    );
  }, 0);

  const totalTickets = registrations.reduce(
    (sum, reg) => sum + reg.ticketCount,
    0
  );

  const attendance =
    totalCapacity === 0
      ? 0
      : Math.round((totalTickets / totalCapacity) * 100);

  const upcoming = events.filter(
    (event) => new Date(event.eventDate) > new Date()
  ).length;

  return (
    <section className="analytics-card attendance-card">

      <div className="attendance-left">

        <span className="attendance-title">
          Attendance Score
        </span>

        <h1>{attendance}%</h1>

        <div className="attendance-progress">

          <div
            className="attendance-fill"
            style={{ width: `${attendance}%` }}
          />

        </div>

        <p>
          Capacity Utilization Across All Events
        </p>

      </div>

      <div className="attendance-right">

        <div className="mini-kpi">

          <Users size={20} />

          <div>

            <h3>{totalTickets}</h3>

            <span>Total Tickets</span>

          </div>

        </div>

        <div className="mini-kpi">

          <CalendarDays size={20} />

          <div>

            <h3>{upcoming}</h3>

            <span>Upcoming Events</span>

          </div>

        </div>

        <div className="mini-kpi">

          <TrendingUp size={20} />

          <div>

            <h3>+12%</h3>

            <span>Monthly Growth</span>

          </div>

        </div>

        <div className="mini-kpi">

          <Ticket size={20} />

          <div>

            <h3>{totalCapacity}</h3>

            <span>Total Capacity</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RegistrationTrends;