import { motion } from "framer-motion";
import { Button } from "@/components/shared";
import { Bell } from "lucide-react";
import { TIMELINE_STEPS } from "../mock";
import { getBanner, getCurrentStepIndex, getTimelineStepProps } from "../utils";

const DetailsModal = ({ order, onClose, onReport, onMarkDelivered }) => {
  const currentStepIndex = getCurrentStepIndex(
    order.status.label,
    TIMELINE_STEPS
  );

  const banner = getBanner(order.status.label);
  const canMarkDelivered = order.status.label === "Awaiting Confirmation";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="bg-white w-full max-w-[800px] max-h-[90vh] rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 sticky top-0 bg-white z-10">
          <div className="max-w-2/3">
            <p className="text-xl font-semibold">
              {order.product} ({order.qty} pcs)
            </p>
            <p className="text-grey-300 text-xs italic">
              Order #{order.id} : {order.farmer}
            </p>
          </div>
          <div
            className="border p-2 rounded-xl flex items-center justify-center"
            style={{
              color: order.status.textColor,
              backgroundColor: order.status.bgColor,
            }}
          >
            <order.status.icon size={20} className="mr-1" />
            {order.status.label}
          </div>
          <Button
            onClick={onClose}
            className="border border-primary px-4 py-2! bg-white text-primary! hover:text-white!"
          >
            Close
          </Button>
        </div>

        <div className="overflow-y-auto px-7 py-5 space-y-6 flex-1">
          {banner.show && (
            <div
              className="flex gap-2 p-4 rounded-lg text-sm"
              style={{
                backgroundColor: banner.bgColor,
                color: banner.iconColor,
              }}
            >
              <banner.icon color={banner.iconColor} size={20} />
              <div>
                <p className="font-semibold">{banner.firstText}</p>
                <p>{banner.secondText}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="border border-black rounded-lg p-4 text-grey-300">
            <p className="font-semibold text-black text-lg mb-4">
              Order Timeline
            </p>

            {TIMELINE_STEPS.map((step, idx) => {
              const stepLabel =
                step.label === "Awaiting Confirmation" &&
                order.status.label === "Delivery Issue - Pending Review"
                  ? "Delivery Issue - Pending Review"
                  : step.label;

              const { IconComponent, iconColor, borderColor, bgColor } =
                getTimelineStepProps(idx, currentStepIndex, order.status);

              return (
                <div key={idx} className="flex items-center gap-3 relative">
                  <div className="flex flex-col items-center relative">
                    {idx !== 0 && (
                      <div
                        className="w-px h-4 border-l-2 border-dashed"
                        style={{ borderColor }}
                      />
                    )}

                    <div
                      className="rounded-full h-[30px] w-[30px] border flex items-center justify-center z-10"
                      style={{ borderColor, backgroundColor: bgColor }}
                    >
                      <IconComponent color={iconColor} size={20} />
                    </div>

                    {idx !== TIMELINE_STEPS.length - 1 && (
                      <div
                        className="w-px h-4 border-l-2 border-dashed"
                        style={{ borderColor }}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center text-black h-[30px]">
                    <p className="font-medium text-sm">{stepLabel}</p>
                    {step.subLabel && (
                      <p className="text-grey-300 text-xs mt-0.5">
                        {step.subLabel}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <div className="border border-black rounded-lg p-4 text-grey-300">
            <p className="font-semibold text-black text-lg mb-4">Items</p>
            <ul className="list-disc ml-5">
              <li>
                {order.qty}x {order.product}
              </li>
            </ul>
          </div>

          {/* Delivery */}
          <div className="border border-black rounded-lg p-4 text-grey-300">
            <p className="font-semibold text-black text-lg mb-4">Delivery</p>
            <p>Address: {order.delivery.address}</p>
            <p>Contact: {order.delivery.contact}</p>
          </div>

          {/* Action Buttons */}
          {order.status.label !== "Delivered" && (
            <div className="flex justify-center items-center gap-2.5">
              <Button
                onClick={onReport}
                className="border border-primary px-4 py-2! bg-white text-primary! hover:text-white!"
              >
                Report a problem
              </Button>
              <Button
                onClick={onMarkDelivered}
                disabled={!canMarkDelivered}
                className={`px-4 py-2!`}
              >
                Mark as delivered
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsModal;
