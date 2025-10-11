import { ArrowDownLeft, ArrowUpRight,CheckCircleIcon, XCircleIcon,ClockIcon } from "lucide-react";
export const TransactionTypes = {
    credit: {
    label: "Credit",
    icon: ArrowDownLeft,
    iconColor: "#016130",
    bgColor: " #C9F4DE",
  },
  debit: {
    label: "Debit",
    icon: ArrowUpRight,
    iconColor: "#FFA725",
    bgColor: "#FFF1C2",
  },
}

export const TransactionStatus = {
  none: {
    label: "",
    className: "",
  },

  completed: {
    label: "Completed",
    icon: CheckCircleIcon,
    bgColor: " #016130",
    textColor: "#016130",
    className: "text-[#016130] bg-[#C9F4DE]",
  },
  pending: {
    label: "Pending",
    icon: ClockIcon,
    bgColor: "#FFA725",
    textColor: "#FFA725",
    className: "text-[#FFA725] bg-[#FFE4BB]",
  },
  failed: {
    label: "Failed",
    icon: XCircleIcon,
    bgColor: "#E02424",
    textColor: "#E02424",
    className: "text-[#E02424] bg-[#F19A9A]",
  },
};

export const getStatusText = (status) =>
  TransactionStatus[status?.toLowerCase()]?.label || status;

export const getStatusClasses = (status) =>
  TransactionStatus[status?.toLowerCase()]?.className || "";

export const getTextColor = (status) =>
  TransactionStatus[status?.toLowerCase()]?.textColor || "#000";
export  const getStatusIcon = (status) =>
  TransactionStatus[status?.toLowerCase()]?.icon || null;

// export const getIconClasses = (status) =>
//   TransactionStatus[status?.toLowerCase()]?.icon || null;

// export const getIconColor = (status) =>
//   TransactionStatus[status?.toLowerCase()]?.iconColor || "#000";

// export const getIconBg = (status) =>
//   TransactionStatus[status?.toLowerCase()]?.bgColor || "#F1F1F1";

export const getIconClasses = (status) =>
  TransactionTypes[status?.toLowerCase()]?.icon || null;

export const getIconColor = (status) =>
  TransactionTypes[status?.toLowerCase()]?.iconColor || "#000";

export const getIconBg = (status) =>
  TransactionTypes[status?.toLowerCase()]?.bgColor || "#F1F1F1";