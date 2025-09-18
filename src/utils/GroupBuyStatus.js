export const StatusLabel = {
  none: {
    label: "",
    className: "",
  },
  Active: {
    label: "Active",
    className: "text-[#027A48] bg-[#ECFDF3]",
    Dot: "bg-[#027A48]"
  },
  Closed: {
    label: "Closed",
    className: "text-[#B42318] bg-[#FEF3F2]",
    Dot: "bg-[#B42318]"
  },
};

export const getStatusText = (status) => StatusLabel[status]?.label || status;

export const getStatusClasses = (status) => StatusLabel[status]?.className || "";
export const getDotClasses = (status) => StatusLabel[status]?.Dot || "";
