import { useEffect, useState } from "react";
import "../../styles/ActivityTimeline.css";

function ActivityTimeline() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivity();
  }, []);

  async function fetchActivity() {
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

      const registrations = await res.json();

      const latest = registrations
        .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 5)
        .map((reg) => ({
          id: reg._id,
          title: "New Registration",
          description: `${reg.userName} registered for ${
            reg.eventId?.eventName || "an event"
          }`,
          time: new Date(reg.createdAt).toLocaleString(),
        }));

      setActivities(latest);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="timeline-card">
      <h2>Activity Timeline</h2>

      <div className="timeline-list">

        {activities.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          activities.map((activity) => (
            <div
              className="activity-item"
              key={activity.id}
            >
              <div className="activity-icon">
                📝
              </div>

              <div>
                <h4>{activity.title}</h4>

                <p>{activity.description}</p>

                <small>{activity.time}</small>
              </div>

            </div>
          ))
        )}

      </div>
    </section>
  );
}

export default ActivityTimeline;