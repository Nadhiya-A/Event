import { useEffect, useState } from "react";
import AllocationRow from "./AllocationRow";
import { Search } from "lucide-react";

function AllocationTable() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  fetch("http://localhost:3000/api/registrations", {
    headers: {
      Authorization:
        "Bearer " + localStorage.getItem("app_token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setRegistrations(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
  const filtered = registrations.filter((reg) =>
    reg.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

      <div className="allocation-toolbar">

        <div className="allocation-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search attendee, event or room..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="allocation-table-card">

        <table>

          <thead>

            <tr>

              <th>Attendee</th>

              <th>Event</th>

              <th>Room Number</th>

              <th>Participants</th>

              <th>Payment</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((registration) => (

              <AllocationRow
                key={registration._id}
                registration={registration}
              />

            ))}

          </tbody>

        </table>

      </div>

    </>
  );
}

export default AllocationTable;