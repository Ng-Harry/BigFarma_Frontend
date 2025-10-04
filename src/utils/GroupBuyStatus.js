export const StatusLabel = {
  none: {
    label: "",
    className: "",
  },
  AlmostFull: {
    label: "Almost Full",
    className: "text-[#ffffff] bg-[#FFA725]",
  },
  Complete: {
    label: "Complete",
    className: "text-[#ffffff] bg-[#016130]",

  },
};

export const getStatusText = (status) => StatusLabel[status]?.label || status;

export const getStatusClasses = (status) => StatusLabel[status]?.className || "";
export const getDotClasses = (status) => StatusLabel[status]?.Dot || "";
