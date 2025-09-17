import { onions, pepper, plantain, tomato } from "@/assets";
import { TriangleAlert, Clock, CheckCircle2 } from "lucide-react";

export const ORDER_STATUS = {
  SHIPPING: {
    label: "Shipping In Progress",
    icon: Clock,
    textColor: "#2563EB",
    bgColor: "#D3DFF9",
  },
  AWAITING: {
    label: "Awaiting Confirmation",
    icon: Clock,
    textColor: "#2563EB",
    bgColor: "#D3DFF9",
  },
  ISSUE: {
    label: "Delivery Issue - Pending Review",
    icon: TriangleAlert,
    textColor: "#E02424",
    bgColor: "#F5BBBB",
  },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    textColor: "#016130",
    bgColor: "#ECFDF3",
  },
};

// General timeline labels
export const TIMELINE_STEPS = [
  { label: "Placed" },
  { label: "Shipping In Progress" },
  { label: "Awaiting Confirmation", subLabel: "Waiting for your confirmation" },
  { label: "Delivered" },
];

export const MOCK_ORDERS = [
  {
    id: 2741,
    product: "Fresh Tomatoes",
    productImage: tomato,
    qty: 5,
    farmer: "GreenRoots Farm",
    status: ORDER_STATUS.SHIPPING,
    updatedAt: "2h ago",
    delivery: { address: "123 Street, Lagos", contact: "+2348000000000" },
  },
  {
    id: 2742,
    product: "Organic Peppers",
    productImage: pepper,
    qty: 3,
    farmer: "Farm Fresh",
    status: ORDER_STATUS.AWAITING,
    updatedAt: "3h ago",
    delivery: { address: "456 Street, Abuja", contact: "+234800111222" },
  },
  {
    id: 2743,
    product: "Plantains",
    productImage: plantain,
    qty: 2,
    farmer: "GreenRoots Farm",
    status: ORDER_STATUS.ISSUE,
    updatedAt: "1h ago",
    delivery: { address: "789 Street, Kano", contact: "+234800222333" },
  },
  {
    id: 2744,
    product: "Onions Bundle",
    productImage: onions,
    qty: 6,
    farmer: "Tropical Farms",
    status: ORDER_STATUS.DELIVERED,
    updatedAt: "30m ago",
    delivery: { address: "321 Street, Ibadan", contact: "+234800333444" },
  },
];
