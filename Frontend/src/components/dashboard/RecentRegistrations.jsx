import { useEffect, useState } from "react";
import "../../styles/RecentRegistrations.css";
import RecentRegistrationsModal from "./RecentRegistrationsModal";
function RecentRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchRegistrations();
  }, []);

  async function fetchRegistrations() {
    const token = localStorage.getItem("app_token");

    try {
      const res = await fetch(
        "http://localhost:3000/api/registrations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      // Show newest 5 registrations
      setRegistrations(data.slice(-5).reverse());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="recent-registrations">

      <div className="section-header">
        <h2>Recent Registrations</h2>
        <button
    className="view-all-btn"
    onClick={() => setShowModal(true)}
>
    View All
</button>
      </div>

{registrations.slice(0, 5).map((registration) => (

  <div
    className="registration-card"
    key={registration._id}
  >

    <div className="registration-left">

      <div className="registration-avatar">
        {registration.userName.charAt(0)}
      </div>

      <div>

        <h3>{registration.userName}</h3>

        <p>{registration.eventId?.eventName || "Unknown Event"}</p>

        <small>Registered Today</small>

      </div>

    </div>

    <div className="registration-right">

      <span className="ticket-count">
        🎟 {registration.ticketCount} Tickets
      </span>

      <span
        className={
          registration.paymentStatus === "Paid"
            ? "status confirmed"
            : "status pending"
        }
      >
        {registration.paymentStatus}
      </span>

    </div>

  </div>

))}
<RecentRegistrationsModal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    registrations={registrations}
/>
    </section>
    
  );
}

export default RecentRegistrations;