import { useEffect, useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  Ticket,
  BadgeCheck,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../styles/DashboardAnalyticsCard.css";

function DashboardAnalyticsCard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalTickets: 0,
    paid: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = localStorage.getItem("app_token");

    try {
      const [eventRes, registrationRes] = await Promise.all([
        fetch("http://localhost:3000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:3000/api/registrations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const events = await eventRes.json();
      const registrations = await registrationRes.json();

      const tickets = registrations.reduce(
        (sum, reg) => sum + reg.ticketCount,
        0
      );

      const paid = registrations.filter(
        (reg) => reg.paymentStatus === "Paid"
      ).length;

      setStats({
        totalEvents: events.length,
        totalRegistrations: registrations.length,
        totalTickets: tickets,
        paid,
      });

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="dashboard-analytics-card">

      <div className="dashboard-card-header">

        <div>

          <h2>Analytics Overview</h2>

          <p>Platform summary</p>

        </div>

      </div>

      <div className="dashboard-metrics">

        <div className="dashboard-metric">

          <div className="metric-icon orange">

            <CalendarDays size={18}/>

          </div>

          <div>

            <h3>{stats.totalEvents}</h3>

            <span>Total Events</span>

          </div>

        </div>

        <div className="dashboard-metric">

          <div className="metric-icon blue">

            <ClipboardList size={18}/>

          </div>

          <div>

            <h3>{stats.totalRegistrations}</h3>

            <span>Registrations</span>

          </div>

        </div>

        <div className="dashboard-metric">

          <div className="metric-icon purple">

            <Ticket size={18}/>

          </div>

          <div>

            <h3>{stats.totalTickets}</h3>

            <span>Tickets Sold</span>

          </div>

        </div>

        <div className="dashboard-metric">

          <div className="metric-icon green">

            <BadgeCheck size={18}/>

          </div>

          <div>

            <h3>{stats.paid}</h3>

            <span>Paid</span>

          </div>

        </div>

      </div>

      <button
        className="analytics-view-btn"
        onClick={() => navigate("/analytics")}
      >
        View Full Analytics

        <ArrowRight size={18}/>
      </button>

    </section>
  );
}

export default DashboardAnalyticsCard;