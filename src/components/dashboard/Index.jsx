import { useState, useEffect } from "react";
import Charts from "./farmer/chart/Index.jsx";
import DoughnutChart from "./consumer/chart/Index.jsx";
import { QuickLinks, RecentOrders } from "./consumer/components/";
import { PendingOrders } from "./farmer/components/index.js";
import ConsumerStatistics from "./consumer/statistics/Index.jsx";
import FarmerStatistics from "./farmer/statistics/Index.jsx";
import FarmerProfileSetup from "./farmer/profile-setup/Index.jsx";
import ConsumerProfileSetup from "./consumer/consumerProfile/Index.jsx";
import Cookies from "js-cookie";
import { endpoints } from "../config/endpoints";
import { axios } from "../../lib/axios";
import LoaderSpinner from "../shared/Loader.jsx";

const Dashboard = () => {
  const role = Cookies.get("BIGFARMA_ROLE");
  const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
  const [profileComplete, setProfileComplete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            // setLoading(false);
          } else if (role === "consumer") {
            response = await axios.get(endpoints().users.get_consumer_profile, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data;
						setProfileComplete(data.first_name ? true : false);
            // setLoading(false);
          }
          
        } catch (error) {
          console.error("Error checking profile completion:", error);
          setProfileComplete(false);
          // setLoading(false);
        }
      } else {
        setProfileComplete(false);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500); 
    };
    checkProfileCompletion();
  }, [role, token]);


  console.log("Current role:", role);
  console.log("Is profile complete?", profileComplete);

  if(loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <LoaderSpinner />
      </div>
    );
  }

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
      {/* {!token && (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-gray-500 text-lg">Please log in to view your dashboard.</p>
          <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md" onClick={() => window.location.href = '/login'}>
           Click Here to Log In
          </button>
        </div>
      )} */}
    </>
  );
};

export default Dashboard;