import { motion } from "framer-motion";
import { Button } from "@/components/shared";
import { X } from "lucide-react";

const ReportModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div className="bg-white p-5 rounded-lg w-[450px]">
        <div className="flex justify-between items-center font-semibold text-xl text-black">
          <p>Report a delivery problem</p>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <hr className="mt-5 mb-[30px] text-gray-300" />
        <p>Describe the issue</p>
        <textarea
          cols={12}
          className="rounded-lg p-3.5 border border-grey-200 w-full mt-2.5"
          placeholder="e.g., package left at gate, items missing, never received, etc."
        />
        <div className="flex justify-end gap-5 items-center mt-8">
          <Button
            onClick={onClose}
            className="border border-primary px-4 py-2! bg-white text-primary! hover:text-white!"
          >
            Cancel
          </Button>
          <Button className="px-4 py-2!">Submit</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportModal;
