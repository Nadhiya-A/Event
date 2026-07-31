import { useEffect, useState } from "react";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsStats from "../components/analytics/AnalyticsStats";
import AnalyticsChart from "../components/analytics/AnalyticsChart";
import RegistrationTrends from "../components/analytics/RegistrationTrends";
import EventPerformanceTable from "../components/analytics/EventPerformanceTable";
import RegistrationDistribution from "../components/analytics/RegistrationDistribution";
import PlatformInsights from "../components/analytics/PlatformInsights";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../styles/Analytics.css";

function Analytics() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const token = localStorage.getItem("app_token");

    try {
      const [eventsRes, registrationsRes] = await Promise.all([
        fetch("http://localhost:3000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:3000/api/registrations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const eventsData = await eventsRes.json();
      const registrationsData = await registrationsRes.json();

      setEvents(eventsData);
      setRegistrations(registrationsData);
    } catch (err) {
      console.error("Analytics Error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="analytics-loading">
        Loading Analytics...
      </div>
    );
  }
    function downloadCSV() {
  const rows = events.map((event) => {
    const registrationsCount = registrations.filter(
      (r) => r.eventId?._id === event._id
    ).length;

    const capacity = (event.rooms || []).reduce(
      (sum, room) => sum + (room.capacity || 0),
      0
    );

    const occupancy =
      capacity === 0
        ? "0%"
        : `${Math.round((registrationsCount / capacity) * 100)}%`;

    return {
      Event: event.eventName,
      Capacity: capacity,
      Registrations: registrationsCount,
      Occupancy: occupancy,
    };
  });

  if (!rows.length) return;

  const headers = Object.keys(rows[0]).join(",");

  const csv = [
    headers,
    ...rows.map((r) => Object.values(r).join(",")),
  ].join("\n");

  // UTF-8 BOM for Excel
  const blob = new Blob(
    ["\uFEFF" + csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "eventsphere-analytics.csv";

  link.click();

  URL.revokeObjectURL(url);
}
function exportPDF() {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(249, 115, 22);
  doc.text("EventSphere Analytics Report", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(80);

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    14,
    30
  );

  const tableData = events.map((event) => {
    const registrationsCount = registrations.filter(
      (r) => r.eventId?._id === event._id
    ).length;

    const capacity = (event.rooms || []).reduce(
      (sum, room) => sum + (room.capacity || 0),
      0
    );

    const occupancy =
      capacity === 0
        ? "0%"
        : `${Math.round((registrationsCount / capacity) * 100)}%`;

    return [
      event.eventName,
      capacity,
      registrationsCount,
      occupancy,
    ];
  });

  autoTable(doc, {
    startY: 40,

    head: [[
      "Event",
      "Capacity",
      "Registrations",
      "Occupancy",
    ]],

    body: tableData,

    headStyles: {
      fillColor: [249, 115, 22],
    },

    alternateRowStyles: {
      fillColor: [252, 248, 245],
    },
  });

  doc.save("eventsphere-report.pdf");
}

  return (
    <div className="analytics-page">
      <AnalyticsHeader
    onDownloadCSV={downloadCSV}
    onExportPDF={exportPDF}
/>

      <AnalyticsStats
        events={events}
        registrations={registrations}
      />

      <AnalyticsChart
        events={events}
        registrations={registrations}
      />

      <RegistrationTrends
  events={events}
  registrations={registrations}
/>

      <EventPerformanceTable
        events={events}
        registrations={registrations}
      />

      <div className="analytics-bottom-grid">

        <RegistrationDistribution
          registrations={registrations}
        />

        <PlatformInsights
          events={events}
          registrations={registrations}
        />

      </div>
    </div>
  );
}

export default Analytics;