import React from 'react';
import Success from '../../../../assets/icons/success.svg';

const SetupSuccessful = ({onNext}) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
        <img
          src={Success}
          alt="Success"
          className="w-12 h-12 md:w-20 md:h-20 mx-auto"
        />
        <div className="text-center mt-6">
          <span className="text-[32px] font-bold leading-tight">Successful!</span>
          <p className="text-[18px] font-normal pt-5">Your account is all set!</p>
        </div>
        <button
          onClick={onNext}
          className="px-12 py-3 rounded-lg mt-8 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C] hover:bg-green-700 hover:text-white hover:font-bold cursor-pointer transition-all duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SetupSuccessful;
