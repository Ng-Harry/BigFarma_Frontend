import React from 'react';
import Success from '../../assets/icons/success.svg';

const SuccessForm = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
        <img
          src={Success}
          alt="Success"
          className="w-12 h-12 md:w-20 md:h-20"
        />
        <div className="text-center mt-6">
          <span className="text-[32px] font-bold leading-tight">
            Successful
          </span>
          <p className="text-[18px] font-normal pt-5">
            Congratulations your password has been changed. click continue to
            sign in
          </p>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-1/3 px-6 py-3 rounded-lg mt-8 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C] hover:bg-green-700 hover:text-white hover:font-bold cursor-pointer transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default SuccessForm;
