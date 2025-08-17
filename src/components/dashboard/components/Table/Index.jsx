import { useState } from "react";
import Data from "./Data";
import { useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const orders = [
  {
    id: "10001",
    farmName: "Bisi Farm",
    date: "04-02-2025",
    status: "delivered",
  },
  { id: "10002", farmName: "Olu Farm", date: "05-02-2025", status: "pending" },
  {
    id: "10003",
    farmName: "Tola Farm",
    date: "06-02-2025",
    status: "delivered",
  },
  {
    id: "10004",
    farmName: "Yemi Farm",
    date: "07-02-2025",
    status: "cancelled",
  },
  {
    id: "10005",
    farmName: "Kemi Farm",
    date: "08-02-2025",
    status: "shipping",
  },
];


const RecentOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const toggleSingle = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full lg:border border-grey-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#EFEFEF]">
          <tr className="text-left text-lg *:px-6 *:py-2.5 border-b border-grey-200 hidden lg:table-row">
            <th>Order ID</th>
            <th>Farm Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <LoadingSkeleton key={index} itemKey={index} />
          ))
        ) : orders.length === 0 ? (
          <tr colSpan={4}>
            <td>No recent order</td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr
              key={order.id}
              className="table-row cursor-pointer text-sm *:px-4 lg:*:px-6 *:py-2 lg:*:py-3 lg:py-0 border-t border-grey-200 bg-white"
            >
              <Data
                props={order}
                isChecked={selectedOrders.includes(order.id)}
                onToggle={() => toggleSingle(order.id)}
              />
            </tr>
          ))
        )}
      </table>
    </div>
  );
};

export default RecentOrders;
