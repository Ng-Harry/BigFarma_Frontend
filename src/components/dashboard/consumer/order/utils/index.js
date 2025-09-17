import { Triangle } from "lucide-react";
import { Bell } from "lucide-react";
import { CheckCircle2, Clock } from "lucide-react";

export const getCurrentStepIndex = (statusLabel, timelineSteps) => {
  if (statusLabel === "Delivery Issue - Pending Review") {
    return timelineSteps.findIndex((s) => s.label === "Awaiting Confirmation");
  }
  return timelineSteps.findIndex((s) => s.label === statusLabel);
};

export const getTimelineStepProps = (idx, currentStepIndex) => {
  const isCompletedOrCurrent = idx <= currentStepIndex;

  return {
    IconComponent: isCompletedOrCurrent ? CheckCircle2 : Clock,
    iconColor: isCompletedOrCurrent ? "#016130" : "#9CA3AF",
    borderColor: isCompletedOrCurrent ? "#016130" : "#D1D5DB",
    bgColor: isCompletedOrCurrent ? "#ECFDF3" : "#F3F4F6",
  };
};

export const getBanner = (statusLabel) => {
  switch (statusLabel) {
    case "Awaiting Confirmation":
      return {
        icon: Bell,
        iconColor: "#6B4610",
        bgColor: "#FFF6E9",
        firstText: "Confirmation Required",
        secondText:
          "Please confirm if you have received this order. If there is a problem, let us know.",
        show: true,
      };

    case "Delivered":
      return {
        icon: Clock,
        iconColor: "#016130",
        bgColor: "#C9F4DE",
        firstText: "Delivery Complete",
        secondText: "Thanks! The farmer has been notified.",
        show: true,
      };

    case "Delivery Issue - Pending Review":
      return {
        icon: Triangle,
        iconColor: "#E02424",
        bgColor: "#FFF6E9",
        firstText: "Delivery Issue - Pending Review",
        secondText:
          "We’ve logged your report. Support will contact you within 24-48 hours.",
        show: true,
      };

    case "Shipping In Progress":
    default:
      return { show: false };
  }
};
