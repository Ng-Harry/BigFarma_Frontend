export const STATUSES = {
  none: {
    label: "",
    className: "",
  },
  delivered: {
    label: "Delivered",
    className: "text-white bg-[#016130]",
  },
  pending: {
    label: "Pending",
    className: "text-white bg-[#FFA725]",
  },
  cancelled: {
    label: "Cancelled",
    className: "text-white bg-[#E02424]",
  },
  shipping: {
    label: "Shipping",
    className: "text-white bg-[#1161E6]",
  },
};

export const getStatusText = (status) => STATUSES[status]?.label || status;

export const getStatusClasses = (status) => STATUSES[status]?.className || "";
