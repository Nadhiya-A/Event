import "../../styles/RecentRegistrationsModal.css";
import {
  X,
  Search,
  Ticket
} from "lucide-react";

function RecentRegistrationsModal({
  isOpen,
  onClose,
  registrations
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="registrations-modal">

        <div className="modal-header">

          <h2>Recent Registrations</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={22}/>
          </button>

        </div>

        <div className="search-box">

          <Search size={18}/>

          <input
            type="text"
            placeholder="Search registrations..."
          />

        </div>

        <div className="modal-list">

          {registrations.map((item)=>(

            <div
              key={item._id}
              className="modal-registration"
            >

              <div className="modal-avatar">

                {item.userName?.charAt(0)}

              </div>

              <div className="modal-info">

                <h4>{item.userName}</h4>

                <p>
                  {item.eventId?.eventName}
                </p>

              </div>

              <div className="modal-right">

                <span className="ticket-pill">

                  <Ticket size={15}/>

                  {item.ticketCount}

                </span>

                <span
                  className={
                    item.paymentStatus==="Paid"
                    ? "status confirmed"
                    : "status pending"
                  }
                >
                  {item.paymentStatus}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default RecentRegistrationsModal;