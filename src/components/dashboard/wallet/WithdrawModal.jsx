import React from "react";
import { ChevronDown } from "lucide-react";

const balance = 102500.78;
const WithdrawModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-150  bg-white rounded-lg p-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" text-left font-medium space-y-1">
          <h3 className="text-xl ">Withdraw Funds</h3>
          <p className="text-[#8A8A8A]">
            Withdraw money from your wallet to your bank account
          </p>
        </div>
                {/* Bank details */}
        <div>
          <div className="relative mt-5">
            <label
              htmlFor="bank-account"
              className="block mb-1 text-sm font-semibold"
            >
              Bank Account
            </label>

            <select
              id="bank-account"
              className="pl-6 pr-6 border border-[#DDD5DD] p-2.5 rounded-lg w-full 
             focus:ring-2 focus:ring-[#016130] 
                 outline-none appearance-none transition duration-150"
            >
              <option value="" className="font-medium">
                Select bank account
              </option>
              <option value="1">lorem</option>
              <option value="2">lorem</option>
              <option value="3">lorem</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute top-[65%] right-3 -translate-y-1/2 "
            />
          </div>
          <div className="relative mt-5">
            <label
              htmlFor="amount"
              className="block mb-1 text-sm font-semibold"
            >
              Amount
            </label>

            <select
              id="amount"
              className="pl-6 pr-6 border border-[#DDD5DD] p-2.5 rounded-lg w-full 
             focus:ring-2 focus:ring-[#016130] 
                 outline-none appearance-none transition duration-150 text-[#98A2B3] font-medium"
            >
              <option value="">0.00</option>
              <option value="1">lorem</option>
              <option value="2">lorem</option>
              <option value="3">lorem</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute top-[65%] right-3 -translate-y-1/2 "
            />
          </div>
          <div className="flex items-center gap-1 text-[#98A2B3] font-medium mt-2"> 
            <p>Available :</p>
            <p>₦{" "}{balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="flex justify-between mt-5">
            <button onClick={onClose} className="w-65 h-10 flex items-center justify-center rounded-lg font-medium border border-[#016130] text-[#016130] hover:bg-gray-100">
                <p>Cancel</p>
            </button>
            <button className="w-65 h-10 flex items-center justify-center rounded-lg font-medium text-white bg-[#016130]">
                <p>Confirm Withdrawal</p>
            </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
