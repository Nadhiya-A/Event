import {
  Users,
  Hotel,
  Clock3,
  BedDouble,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    title: "Total Attendees",
    value: 124,
    color: "#3B82F6",
  },
  {
    icon: Hotel,
    title: "Rooms Allocated",
    value: 89,
    color: "#F97316",
  },
  {
    icon: Clock3,
    title: "Pending",
    value: 35,
    color: "#EAB308",
  },
  {
    icon: BedDouble,
    title: "Available Rooms",
    value: 12,
    color: "#10B981",
  },
];

function AllocationStats() {
  return (
    <div className="allocation-stats">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            className="allocation-stat-card"
            key={item.title}
          >
            <div
              className="allocation-stat-icon"
              style={{ background: item.color }}
            >
              <Icon size={26} />
            </div>

            <div>
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllocationStats;