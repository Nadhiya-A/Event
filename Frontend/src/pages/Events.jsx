import EventTable from "../components/events/EventTable";

function Events({ currentUser }) {
  return (
    <div className="page-container">
      <EventTable currentUser={currentUser} />
    </div>
  );
}

export default Events;