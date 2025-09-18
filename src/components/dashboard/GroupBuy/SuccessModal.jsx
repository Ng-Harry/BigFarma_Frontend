import React from "react";
import successIcon from "../../../assets/icons/success.svg";
import { Link } from "react-router-dom";

const SuccessModal = ({ onClose }) => {
    return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-lg shadow-xl px-6 py-10 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-4 flex flex-col items-center justify-center">
          <img src={successIcon} alt="" />
          <h3 className="text-[32px] font-bold text-[#016130] leading-tight">
            Your group has been created successfully!
          </h3>
          <p className="text-black text-lg font-normal">
            Share the link below so others can join your group purchase
          </p>
          <div className="flex items-center gap-5">
            <Link to={"/"} className="text-[#FFA725]">
              <button type="button" className="text-lg font-normal">
                www.bigfarma.com/group/beans123
              </button>
            </Link>
            <button
              type="button"
              className="text-[#016130] px-2.5 py-1 rounded-lg border border-[#016130] text-sm ml-7"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/group-buy">
            <button
              type="button"
              className="px-5 py-3 rounded-md bg-[#016130] text-white hover:bg-[#003F1F] transition-colors text-lg font-bold"
              onClick={onClose}
            >
              Go to Group Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
