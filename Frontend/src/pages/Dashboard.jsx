import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStatistics from "../components/dashboard/DashboardStatistics";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardChart from "../components/dashboard/DashboardChart";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import RecentRegistrations from "../components/dashboard/RecentRegistrations";
import DashboardAnalyticsOverview from "../components/dashboard/DashboardAnalyticsCard";
import RecentEvents from "../components/dashboard/RecentEvents";
import UpcomingEvent from "../components/dashboard/UpcomingEvent";
import EventCompass from "../components/dashboard/EventCompass";

function Dashboard() {
  return (
    <>
      <DashboardHero />
      <DashboardStatistics />
      <QuickActions />

      <div className="dashboard-grid">
        <div className="left-column">
          <DashboardChart />
          <RecentRegistrations />
          <RecentEvents />
        </div>

        <div className="right-column">
          <DashboardInsights />
          <UpcomingEvent />
          <DashboardAnalyticsOverview />
          <EventCompass />
        </div>
      </div>
    </>
  );
}

export default Dashboard;