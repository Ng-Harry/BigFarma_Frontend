import { formatAmount } from "@/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

const StatCard = ({ title, total, percentage }) => {
  const isPositive = percentage >= 0;
  const isCurrentProduct = title.toLowerCase() === "Total Revenue";
  const isProdSold = title.includes("Product Sold");

  return (
    <div className="bg-white text-black py-5 px-6 border-2 border-grey-100 rounded-lg">
      <p className="font-medium text-sm lg:text-base mb-3">{title}</p>

      {isCurrentProduct ? (
        <p className="font-bold text-2xl lg:text-3xl">{total} active</p>
      ) : (
        <p className="font-bold text-2xl lg:text-3xl">{isProdSold ? total : `₦${formatAmount(total)}` }</p>
      )}

      <div
        className={`mt-2 flex items-center text-xs font-medium ${
          isPositive ? "text-[#016130]" : "text-red-600"
        }`}
      >
        {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        <p className="ml-1">{percentage.toFixed(1)}% </p>
      </div>
    </div>
  );
};

export default StatCard;
