import DoughnutChart from "./chart/Index";
import { QuickLinks, RecentOrders } from "./components";
import DashboardLayout from "./dashboard-layout";
import Statistics from "./statistics/Index";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Statistics />
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <DoughnutChart />
          <div className="border-2 border-grey-100 p-5 mt-6 rounded-lg">
            <p className="mb-5 font-semibold text-2xl">Recent Orders</p>
            <RecentOrders />
          </div>
        </div>
        <QuickLinks />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
