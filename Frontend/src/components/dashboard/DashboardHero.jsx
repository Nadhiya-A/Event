import { Link } from "react-router-dom";
import "../../styles/DashboardHero.css";
import {
  Sparkles,
} from "lucide-react";

function DashboardHero() {
  return (
    <section className="dashboard-hero">

      <div className="dashboard-hero-left">

        <span className="dashboard-badge">
        
    <Sparkles size={16} />
    Event Management Platform
        </span>
<h1>
  Welcome Back,{" "}
  {JSON.parse(localStorage.getItem("app_user"))?.name || "User"} 👋
</h1>
        <p>
          Manage your events, registrations and attendees
          from one modern dashboard.
        </p>

      </div>

      <div className="dashboard-hero-buttons">

      {JSON.parse(localStorage.getItem("app_user"))?.role === "admin" && (
  <Link
    to="/add-event"
    className="hero-btn primary"
  >
    + Create Event
  </Link>
)}
       
      </div>

    </section>
  );
}

export default DashboardHero;