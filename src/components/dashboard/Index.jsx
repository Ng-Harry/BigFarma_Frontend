import { useState, useEffect } from "react";
import Charts from "./farmer/chart/Index";
import DoughnutChart from "./consumer/chart/Index";
import { QuickLinks, RecentOrders } from "./consumer/components";
import { PendingOrders } from "./farmer/components";
import ConsumerStatistics from "./consumer/statistics/Index";
import FarmerStatistics from "./farmer/statistics/Index";
import FarmerProfileSetup from "./farmer/profile-setup/Index";
import ConsumerProfileSetup from "./consumer/consumerProfile/Index";
import { useFocus } from "../../hooks";
import Cookies from "js-cookie";
import { endpoints } from "../config/endpoints";
import { axios } from "../../lib/axios";

const Dashboard = () => {
  const { role } = useFocus();
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
    const checkProfileCompletion = async () => {
      if (token) {
        try {
          
          let response;
          if (role === "farmer") {
            response = await axios.get(endpoints().users.get_farmer_profile, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data;
						setProfileComplete(data.full_name ? true : false);
          } else if (role === "consumer") {
            response = await axios.get(endpoints().users.get_consumer_profile, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data;
						setProfileComplete(data.first_name ? true : false);
          }
          
        } catch (error) {
          console.error("Error checking profile completion:", error);
          setProfileComplete(false); 
        }
      } else {
        setProfileComplete(false); 
      }
    };
    checkProfileCompletion(); 
  }, [role]);


  console.log("Current role:", role);
  console.log("Is profile complete?", profileComplete);

  return (
    <>
      {!profileComplete && (
        <>
          {role === "farmer" ? (
            <FarmerProfileSetup onComplete={() => setProfileComplete(true)} />
          ) : (
            <ConsumerProfileSetup onComplete={() => setProfileComplete(true)} />
          )}
        </>
      )}

      {profileComplete && (
        <>
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
        </>
      )}
    </>
  );
};

export default Dashboard;
