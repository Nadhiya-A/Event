import { useEffect, useState } from "react";
import AnimatedNumber from "./AnimatedNumber";

import {
  CalendarDays,
  Ticket,
  Clock3,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import "../../styles/DashboardStatistics.css";

function DashboardStatistics() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    registrations: 0,
    upcomingEvents: 0,
    successRate: 100,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
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

      const upcoming = events.filter(
        (event) => new Date(event.eventDate) > new Date()
      ).length;

      setStats({
        totalEvents: events.length,
        registrations: registrations.length,
        upcomingEvents: upcoming,
        successRate: 100,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const cards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      subtitle: "+2 This Month",
      icon: CalendarDays,
      color: "stat-orange",
    },
    {
      title: "Registrations",
      value: stats.registrations,
      subtitle: "Active Attendees",
      icon: Ticket,
      color: "stat-blue",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      subtitle: "Next 30 Days",
      icon: Clock3,
      color: "stat-purple",
    },
    {
      title: "Success Rate",
      value: stats.successRate,
      subtitle: "Excellent",
      icon: BadgeCheck,
      color: "stat-green",
    },
  ];

  return (
    <section className="dashboard-stats">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
<div className="dashboard-stat-card" key={index}>
<div className="stat-top">

              <div className={`stat-icon-box ${card.color}`}>
                <Icon size={26} strokeWidth={2.2} />
              </div>

              <TrendingUp
                size={18}
                className="stat-arrow"
              />

            </div>

            <h2>
              <AnimatedNumber value={card.value} duration={500} />
              {card.title === "Success Rate" && "%"}
            </h2>

            <h4>{card.title}</h4>

            <p>{card.subtitle}</p>

          </div>
        );
      })}
    </section>
  );
}

export default DashboardStatistics;