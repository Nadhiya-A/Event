import {
  BarChart3,
  Activity,
  Download,
  FileSpreadsheet,
} from "lucide-react";

function AnalyticsHeader({ onExportPDF, onDownloadCSV }) {
  return (
    <section className="analytics-hero">
      <div className="analytics-hero-left">
        <div className="hero-badge">
          <Activity size={16} />
          <span>Live Analytics</span>
        </div>

        <h1>
          <BarChart3 size={40} />
          Analytics Dashboard
        </h1>

        <p>
          Monitor registrations, event performance,
          ticket sales and platform insights from one place.
        </p>
      </div>

      <div className="analytics-hero-right">
        <button
          className="analytics-btn secondary"
          onClick={onExportPDF}
        >
          <Download size={18} />
          Export Report
        </button>

        <button
          className="analytics-btn"
          onClick={onDownloadCSV}
        >
          <FileSpreadsheet size={18} />
          Download CSV
        </button>
      </div>
    </section>
  );
}

export default AnalyticsHeader;