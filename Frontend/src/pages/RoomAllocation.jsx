import AllocationTable from "../components/registrations/AllocationTable";
import AllocationStats from "../components/registrations/AllocationStats";
import "../styles/RoomAllocation.css";
import { Hotel } from "lucide-react";

function RoomAllocation() {
  return (
    <div className="allocation-page">

      <div className="allocation-hero">

        {/* Background Hero Icon */}
        <Hotel className="allocation-hero-icon" />

        <div className="allocation-hero-content">

          <span className="allocation-badge">
            <Hotel size={16} />
            Room Management
          </span>

          <h1>Room Allocation</h1>

          <p>
            Assign rooms, manage occupancy, and organize attendees efficiently
            from one place.
          </p>

        </div>

      </div>

      <AllocationStats />

      <AllocationTable />

    </div>
  );
}

export default RoomAllocation;