import React from "react";
import Button from "../../../shared/Button"

const ConsumerOverlay = ({ onNext }) => {
  

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg w-[30%] h-[50%] flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-semibold mb-4">
          Let’s set up your Profile
        </h2>
        <Button
          onClick={onNext}
          className="text-white px-6 py-2 rounded-lg hover:bg-[#003F1F
]"
        >
          Start Setup
        </Button>
      </div>
    </div>
  );
};

export default ConsumerOverlay;
