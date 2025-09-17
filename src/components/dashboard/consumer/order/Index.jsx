import { useState } from "react";
import { MOCK_ORDERS } from "./mock";
import { DetailsModal, ReportModal } from "./modals";
import { ChevronRight } from "lucide-react";
import OrderFilter from "./Filter";

const ConsumerOrder = () => {
  const [showReport, setShowReport] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery);

    const matchesStatus =
      statusFilter === "All" || order.status.label === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <p className="text-xl font-semibold">Order</p>
      <p className="text-neutral text-sm">
        Track orders status, confirm deliveries, or raise an issue
      </p>

      <OrderFilter
        onSearch={(query) => setSearchQuery(query)}
        onFilter={(status) => setStatusFilter(status)}
      />

      <div className="grid xl:grid-cols-2 gap-6 mt-10">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="p-2.5 min-h-[100px] border border-primary rounded-lg flex items-center justify-between gap-3"
          >
            <div className="bg-[#F6F6F6] h-20 w-20 p-2 rounded-md">
              <img
                src={order.productImage}
                alt={order.product}
                className="w-full h-full"
              />{" "}
            </div>
            <div className="text-sm space-y-1.5 text-grey-300 break-words max-w-2/3">
              <p className="font-semibold text-black">{order.product}</p>
              <p className="">
                Order #{order.id}. {order.farmer}
              </p>
            </div>
            <div
              style={{
                color: order.status.textColor,
                backgroundColor: order.status.bgColor,
              }}
              className="border p-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <order.status.icon size={20} />
              <p>{order.status.label}</p>
            </div>
            <div className="text-sm space-y-1.5 pr-3 whitespace-nowrap">
              <p>Updated {order.updatedAt}</p>
              <button
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-1 hover:text-primary hover:scale-105 duration-300 ease-in-out transition-all cursor-pointer"
              >
                View
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <DetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onReport={() => setShowReport(true)}
          onMarkDelivered={() => alert("Marked as delivered")}
        />
      )}
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}
    </div>
  );
};

export default ConsumerOrder;
