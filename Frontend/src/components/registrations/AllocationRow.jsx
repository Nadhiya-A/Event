import {
  User,
  Building2,
  CheckCircle2,
  XCircle,
  Pencil,
} from "lucide-react";

function AllocationRow({ registration }) {
  return (
    <tr>

      <td>
        <div className="allocation-user">

          <User size={18} />

          <span>{registration.userName}</span>

        </div>
      </td>

      <td>
        {registration.eventId?.eventName || "-"}
      </td>

      <td>

        <div className="allocation-room">

          <Building2 size={16} />

          {registration.roomNumber || "-"}

        </div>

      </td>

      <td>
        {registration.ticketCount}
      </td>

      <td>

        {registration.paymentStatus === "Paid" ? (

          <span className="status paid">

            <CheckCircle2 size={16} />

            Paid

          </span>

        ) : (

          <span className="status pending">

            <XCircle size={16} />

            Pending

          </span>

        )}

      </td>

      <td>

        <button
    className="allocation-edit-btn"
    title="Edit Room Allocation"
>

    <Pencil size={16} />

    <span>Edit</span>

</button>

      </td>

    </tr>
  );
}

export default AllocationRow;