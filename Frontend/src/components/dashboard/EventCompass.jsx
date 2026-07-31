import {
  Compass,
  Wallet,
  Users,
  CalendarCheck2,
  Sparkles
} from "lucide-react";

import "../../styles/EventCompass.css";

function EventCompass() {
  return (
    <section className="event-compass">

      <div className="compass-header">

        <div className="compass-icon">
          <Compass size={34}/>
        </div>

        <div>
          <h2>Event Compass</h2>
          <p>Guiding your next steps.</p>
        </div>

      </div>

      <div className="compass-tasks">

        <div className="compass-task">
          <Wallet size={20}/>
          <span>Review Pending Payments</span>
        </div>

        <div className="compass-task">
          <Users size={20}/>
          <span>Approve Registrations</span>
        </div>

        <div className="compass-task">
          <CalendarCheck2 size={20}/>
          <span>Prepare Upcoming Event</span>
        </div>

      </div>

      <div className="compass-footer">

        <Sparkles size={18}/>

        <span>
         Ready for your next successful event.
        </span>

      </div>

    </section>
  );
}

export default EventCompass;