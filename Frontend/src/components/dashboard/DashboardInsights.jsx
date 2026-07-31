import "../../styles/DashboardInsights.css";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Activity,
  ArrowRight
} from "lucide-react";

function DashboardInsights() {
  return (
    <section className="dashboard-insights">

      <h2 className="insights-title">
        Dashboard Insights
      </h2>

      {/* Notifications */}

      <div className="insight-section">

        <div className="insight-header">
          <Bell size={18}/>
          <span>Notifications</span>
        </div>

       <div className="notification-box">
    <p>Sam completed payment</p>
    <small>2 mins ago</small>
</div>

<div className="notification-box">
    <p>New Registration</p>
    <small>10 mins ago</small>
</div>

      </div>

      {/* Next Event */}

      <div className="insight-section">

        <div className="insight-header">
          <CalendarDays size={18}/>
          <span>Next Event</span>
        </div>

        <div className="next-event">

          <div className="event-date-box">

            <h3>29</h3>

            <span>JUL</span>

          </div>

          <div>

            <h4>Hackathon</h4>

            <p>Main Hall • Room 2</p>

          </div>

        </div>

      </div>

      {/* Pending Payments */}

      <div className="insight-section">

        <div className="insight-header">
          <CreditCard size={18}/>
          <span>Pending Payments</span>
        </div>

        <div className="payment-box">

          <h3>3</h3>

          <p>Awaiting Verification</p>

        </div>

      </div>

      {/* Activity */}

      <div className="insight-section">

        <div className="insight-header">
          <Activity size={18}/>
          <span>Recent Activity</span>
        </div>

        <div className="activity-item">

          <ArrowRight size={16}/>

          <span>Registration Approved</span>

        </div>

        <div className="activity-item">

          <ArrowRight size={16}/>

          <span>Profile Updated</span>

        </div>

      </div>

    </section>
  );
}

export default DashboardInsights;