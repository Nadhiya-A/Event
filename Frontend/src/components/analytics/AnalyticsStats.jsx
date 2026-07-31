import {
  CalendarDays,
  ClipboardList,
  Clock3,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import "../../styles/Analytics.css";

function AnalyticsStats({ events, registrations }) {
  const totalEvents = events.length;

  const totalRegistrations = registrations.length;

  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) > new Date()
  ).length;

  const paidRegistrations = registrations.filter(
    (registration) => registration.paymentStatus === "Paid"
  ).length;

  const successRate =
    registrations.length === 0
      ? 0
      : Math.round((paidRegistrations / registrations.length) * 100);

  return (
    <section className="analytics-stats">

      {/* Total Events */}

      <div className="analytics-stat-card">

        <div className="stat-top">

          <div className="stat-icon orange">
            <CalendarDays size={26} />
          </div>

          <TrendingUp className="stat-trend" size={18} />

        </div>

        <h2>{totalEvents}</h2>

        <h4>Total Events</h4>

       <span>+{upcomingEvents} Upcoming</span>

      </div>

      {/* Registrations */}

      <div className="analytics-stat-card">

        <div className="stat-top">

          <div className="stat-icon blue">
            <ClipboardList size={26} />
          </div>

          <TrendingUp className="stat-trend" size={18} />

        </div>

        <h2>{totalRegistrations}</h2>

        <h4>Registrations</h4>

<span>
  {registrations.reduce(
    (sum, registration) => sum + registration.ticketCount,
    0
  )}{" "}
  Tickets Booked
</span>
      </div>

      {/* Upcoming */}

      <div className="analytics-stat-card">

        <div className="stat-top">

          <div className="stat-icon purple">
            <Clock3 size={26} />
          </div>

          <TrendingUp className="stat-trend" size={18} />

        </div>

        <h2>{upcomingEvents}</h2>

        <h4>Upcoming Events</h4>

<span>Next Event Ready</span>
      </div>

      {/* Success */}

      <div className="analytics-stat-card">

        <div className="stat-top">

          <div className="stat-icon green">
            <BadgeCheck size={26} />
          </div>

          <TrendingUp className="stat-trend" size={18} />

        </div>

        <h2>{successRate}%</h2>

        <h4>Payment Success</h4>

<span>
  {paidRegistrations} / {registrations.length} Paid
</span>
      </div>

    </section>
  );
}

export default AnalyticsStats;