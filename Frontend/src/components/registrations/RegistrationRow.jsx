import { Eye, Pencil, Trash2 } from "lucide-react";

function RegistrationRow({ registration }) {
  return (
    <tr>

      <td>{registration.userName}</td>

      <td>{registration.eventId?.eventName}</td>

      <td>{registration.ticketCount}</td>

      <td>{registration.roomNumber}</td>

      <td>

<span
className={
registration.paymentStatus === "Paid"
? "status-badge status-paid"
: "status-badge status-pending"
}
>

{registration.paymentStatus}

</span>

</td>

      <td>

        <Eye size={18} />

        <Pencil size={18} />

        <Trash2 size={18} />

      </td>

    </tr>
  );
}

export default RegistrationRow;