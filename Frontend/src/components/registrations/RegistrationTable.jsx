import RegistrationRow from "./RegistrationRow";

function RegistrationTable({ registrations }) {
  return (
    <table>

      <thead>
        <tr>
          <th>User</th>
          <th>Event</th>
          <th>Tickets</th>
          <th>Room</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {registrations.map((registration) => (
          <RegistrationRow
            key={registration._id}
            registration={registration}
          />
        ))}

      </tbody>

    </table>
  );
}

export default RegistrationTable;