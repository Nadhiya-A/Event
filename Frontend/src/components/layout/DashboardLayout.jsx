import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

import "../styles/DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <DashboardNavbar />

        <main className="dashboard-main">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;