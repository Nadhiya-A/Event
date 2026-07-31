import "../../styles/DashboardOverview.css";

import {
  TrendingUp,
  Flame,
  CreditCard,
  Ticket,
} from "lucide-react";

function DashboardOverview() {
  return (
    <section className="performance-overview">

      <div className="overview-item">

        <div className="overview-icon orange">
          <TrendingUp size={22} />
        </div>

        <div>
          <h4>Monthly Growth</h4>
          <h2>+12%</h2>
        </div>

      </div>

      <div className="overview-item">

        <div className="overview-icon red">
          <Flame size={22} />
        </div>

        <div>
          <h4>Popular Event</h4>
          <h2>Hackathon</h2>
        </div>

      </div>

      <div className="overview-item">

        <div className="overview-icon blue">
          <CreditCard size={22} />
        </div>

        <div>
          <h4>Pending Payments</h4>
          <h2>5</h2>
        </div>

      </div>

      <div className="overview-item">

        <div className="overview-icon purple">
          <Ticket size={22} />
        </div>

        <div>
          <h4>Avg Tickets</h4>
          <h2>3.8</h2>
        </div>

      </div>

    </section>
  );
}

export default DashboardOverview;