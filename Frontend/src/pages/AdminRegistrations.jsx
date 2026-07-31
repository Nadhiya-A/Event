import { useEffect, useState } from "react";
import RegistrationTable from "../components/registrations/RegistrationTable";

function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("app_token");

    async function fetchRegistrations() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/registrations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch registrations");
        }

        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <section className="admin-registrations">

      <h1>Registration Management</h1>

      <RegistrationTable registrations={registrations} />

    </section>
  );
}

export default AdminRegistrations;