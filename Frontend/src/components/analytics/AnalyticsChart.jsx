import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function AnalyticsChart({ registrations }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyRegistrations = new Array(12).fill(0);

  registrations.forEach((registration) => {
    const month = new Date(registration.createdAt).getMonth();
    monthlyRegistrations[month] += registration.ticketCount;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Registrations",
        data: monthlyRegistrations,
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,.20)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
const isDark =
  document.documentElement.getAttribute("data-theme") === "dark";

const textColor = isDark ? "#F8FAFC" : "#1E293B";
const lightText = isDark ? "#CBD5E1" : "#64748B";
const gridColor = isDark ? "#334155" : "#E5E7EB";
const tooltipBg = isDark ? "#243447" : "#FFFFFF";

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      mode: "index",
      intersect: false,

      backgroundColor: tooltipBg,
      titleColor: textColor,
      bodyColor: textColor,

      borderColor: "#F97316",
      borderWidth: 1,
    },
  },

  interaction: {
    mode: "nearest",
    intersect: false,
  },

  scales: {
    x: {
      ticks: {
        color: lightText,
      },

      grid: {
        display: false,
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        stepSize: 5,
        color: lightText,
      },

      grid: {
        color: gridColor,
      },
    },
  },
};

  return (
    <section className="analytics-chart-card">

      <div className="chart-header">

        <div>

          <h2>Registration Analytics</h2>

          <p>Monthly attendee registrations</p>

        </div>

        <div className="chart-badge">
          This Year
        </div>

      </div>

      <div className="chart-container">

        <Line
          data={data}
          options={options}
        />

      </div>

    </section>
  );
}

export default AnalyticsChart;