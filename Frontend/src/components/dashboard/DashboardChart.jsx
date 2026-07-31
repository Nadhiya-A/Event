import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "../../styles/Dashboard.css";
import "../../styles/DashboardChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function DashboardChart() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  async function fetchRegistrations() {
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

      const data = await res.json();
      setRegistrations(data);

    } catch (err) {
      console.log(err);
    }
  }

const monthlyData = new Array(12).fill(0);
  registrations.forEach((reg) => {
    const month = new Date(reg.createdAt).getMonth();

      monthlyData[month]++;
  
  });

  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Registrations",

        data: monthlyData,

        backgroundColor: "#F97316",

        borderRadius: 10,
      },
    ],
  };

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: "#111827",
      titleColor: "#fff",
      bodyColor: "#fff",
      cornerRadius: 10,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "#64748B",
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        stepSize: 1,
        color: "#64748B",
      },

      grid: {
        color: "#E5E7EB",
      },
    },
  },
};

return (
  <div className="dashboard-chart">

  <div className="dashboard-header">

    <div>

        <h2>
            Registration Analytics
        </h2>

        <p>
            Monthly attendee registrations
        </p>

    </div>

    <span className="live-dot">

        This Year

    </span>

</div>
    <div className="chart-wrapper">
      <Bar
        data={data}
        options={options}
      />
    </div>

  </div>
);
}

export default DashboardChart;