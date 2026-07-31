import { Link } from "react-router-dom";
import {
  CalendarPlus,
  Ticket,
  Users,
  UserCircle,
  ArrowRight
} from "lucide-react";
import "../../styles/QuickActions.css";

function QuickActions() {
  return (
    <section className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="quick-grid">

        <Link to="/add-event" className="quick-card">
          <div className="quick-icon"> <CalendarPlus size={28}/></div>
          <h3>Create Event</h3>
          <p>Launch a new event in seconds.</p>
        
    <div className="quick-footer">
        <span>Open</span>
        <ArrowRight size={18}/>
    </div>
</Link>
        <Link to="/add-registration" className="quick-card">
          <div className="quick-icon"><Ticket size={28}/></div>
          <h3>Add Registration</h3>
          <p>Register a new attendee.</p>
        <div className="quick-footer">
    <span>Open</span>
    <ArrowRight size={18}/>
</div>
        </Link>

        <Link to="/add-registration" className="quick-card">
          <div className="quick-icon"><Users size={28}/></div>
          <h3>Manage Registrations</h3>
          <p>View and update registrations.</p>
        <div className="quick-footer">
    <span>Open</span>
    <ArrowRight size={18}/>
</div>
        </Link>

        <Link to="/profile" className="quick-card">
          <div className="quick-icon"><UserCircle size={28}/></div>
          <h3>Profile</h3>
          <p>Update your account details.</p>
        <div className="quick-footer">
    <span>Open</span>
    <ArrowRight size={18}/>
</div>
        </Link>
    
      </div>

    </section>
  );
}

export default QuickActions;