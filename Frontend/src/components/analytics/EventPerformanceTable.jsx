import { Activity } from "lucide-react";

function EventPerformanceTable({ events, registrations }) {
  const performanceData = events.map((event) => {
    const totalCapacity = event.rooms.reduce(
      (sum, room) => sum + room.capacity,
      0
    );

    const registered = registrations
      .filter((registration) => registration.eventId?._id === event._id)
      .reduce((sum, registration) => sum + registration.ticketCount, 0);

    const occupancy =
      totalCapacity === 0
        ? 0
        : Math.round((registered / totalCapacity) * 100);

    let status = "Low";

    if (occupancy >= 100) status = "Full";
    else if (occupancy >= 70) status = "High";
    else if (occupancy >= 40) status = "Medium";

    return {
      ...event,
      registered,
      totalCapacity,
      occupancy,
      status,
    };
  });

  return (
    <section className="analytics-card performance-table">

      <div className="analytics-section-title">

        <h2>Event Performance</h2>

        <span>
          <Activity size={16} />
          Live
        </span>

      </div>

      <table className="performance-table-ui">

        <thead>

          <tr>

            <th>Event</th>

            <th>Registered</th>

            <th>Capacity</th>

            <th>Occupancy</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {performanceData.map((event) => (

            <tr key={event._id}>

              <td>{event.eventName}</td>

              <td>{event.registered}</td>

              <td>{event.totalCapacity}</td>

              <td>

                <div className="occupancy-wrapper">

                  <div className="occupancy-bar">

                    <div
                      className="occupancy-fill"
                      style={{
                        width: `${Math.min(event.occupancy, 100)}%`,
                      }}
                    />

                  </div>

                  <span>{event.occupancy}%</span>

                </div>

              </td>

              <td>

                <span
                  className={`status-pill ${event.status.toLowerCase()}`}
                >
                  {event.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
}

export default EventPerformanceTable;