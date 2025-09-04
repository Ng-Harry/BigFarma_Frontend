import Charts from "./farmer/chart/Index";
import DoughnutChart from "./consumer/chart";
import { QuickLinks, RecentOrders } from "./consumer/components";
import { PendingOrders } from "./farmer/components";
import DashboardLayout from "./dashboard-layout";
import ConsumerStatistics from "./consumer/statistics/Index";
import FarmerStatistics from "./farmer/statistics/Index";
import { useFocus } from "../../hooks";

const Dashboard = () => {
  const { role } = useFocus();
  console.log("Current role:", role);
  return (
    <DashboardLayout>
      {role === "farmer" ? <FarmerStatistics /> : <ConsumerStatistics />}

      <div
        className={`grid gap-6 mt-6 ${
          role === "farmer" ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        <div className="col-span-2">
          {role === "farmer" ? <Charts /> : <DoughnutChart />}
          <div className="border-2 border-grey-100 p-5 mt-6 rounded-lg">
            <p className="mb-5 font-semibold text-2xl">
              {role === "farmer" ? "Pending Orders" : "Recent Orders"}
            </p>
            {role === "farmer" ? <PendingOrders /> : <RecentOrders />}
          </div>
        </div>
        {role === "consumer" && <QuickLinks />}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
