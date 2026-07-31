import { CreditCard } from "lucide-react";

function RegistrationDistribution({ registrations }) {
  const paid = registrations.filter(
    (registration) => registration.paymentStatus === "Paid"
  ).length;

  const notPaid = registrations.filter(
    (registration) => registration.paymentStatus === "Not Paid"
  ).length;

  const total = registrations.length || 1;

  const paidPercent = Math.round((paid / total) * 100);
  const notPaidPercent = Math.round((notPaid / total) * 100);

  return (
    <section className="analytics-card">

      <div className="analytics-section-title">

<h2>Revenue & Payment Analytics</h2>
        <span>
          <CreditCard size={16} />
          Live
        </span>

      </div>
<div className="revenue-box">

    <h1>
₹{registrations.reduce(
  (sum, registration) =>
    registration.paymentStatus === "Paid"
      ? sum + registration.ticketCount * 500
      : sum,
  0
)}    </h1>

    <span>
        Estimated Revenue
    </span>

</div>
      <div className="distribution-item">

        <div className="distribution-label">
          <span>Paid</span>
          <span>{paidPercent}%</span>
        </div>

        <div className="distribution-bar">

          <div
            className="distribution-fill paid"
            style={{ width: `${paidPercent}%` }}
          />

        </div>

      </div>

      <div className="distribution-item">

        <div className="distribution-label">
          <span>Not Paid</span>
          <span>{notPaidPercent}%</span>
        </div>

        <div className="distribution-bar">

          <div
            className="distribution-fill unpaid"
            style={{ width: `${notPaidPercent}%` }}
          />

        </div>

      </div>

     <div className="distribution-summary">

    <div>

        <h3>{paid}</h3>

        <p>Paid Registrations</p>

    </div>

    <div>

        <h3>{notPaid}</h3>

        <p>Pending Payments</p>

    </div>

    <div>

        <h3>{registrations.reduce(
            (sum, registration) => sum + registration.ticketCount,
            0
        )}</h3>

        <p>Total Tickets</p>

    </div>

</div>

    </section>
  );
}

export default RegistrationDistribution;