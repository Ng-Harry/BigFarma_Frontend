import { useState } from "react";
import Charts from "./farmer/chart/Index";
import DoughnutChart from "./consumer/chart";
import { QuickLinks, RecentOrders } from "./consumer/components";
import { PendingOrders } from "./farmer/components";
import DashboardLayout from "./dashboard-layout";
import ConsumerStatistics from "./consumer/statistics/Index";
import FarmerStatistics from "./farmer/statistics/Index";
import { useFocus } from "../../hooks";
import FarmerProfileSetup from "./farmer/profile-setup/Index";

const Dashboard = () => {
	const [profileComplete, setProfileComplete] = useState(false);

	const { role } = useFocus();
	console.log("Current role:", role);
	return (
		<DashboardLayout>
			{!profileComplete && (
				<>
					{role === "farmer" ? (
						<FarmerProfileSetup onComplete={() => setProfileComplete(true)} />
					) : (
						"ConsumerProfile-SetUp"
					)}
				</>
			)}

			{profileComplete && (
				<>
					{role === "farmer" ? <FarmerStatistics /> : <ConsumerStatistics />}

					<div
						className={`grid gap-6 mt-6 ${
							role === "farmer" ? "grid-cols-2" : "grid-cols-3"
						}`}>
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
				</>
			)}
		</DashboardLayout>
	);
};

export default Dashboard;
