import arrowLeft from '../../assets/icons/arrow_left.svg';
import supportIcon from '../../assets/icons/Support_Icon .png';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from '@/components/shared/Dropdown';
import { countries } from '../../lib/countries';
import Support from './Support';

const ForgotPasswordForm = () => {
  const [showSupport, setShowSupport] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ phone: false, country: null });
  const navigate = useNavigate();

  // Country selection
  const updateCountry = (country) => {
    setDropdownOpen(false);
    setTouched((prev) => ({ ...prev, country }));
  };

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const validate = () => {
    const newErrors = {};
    const isPhoneValid = phoneNumber && phoneNumber.length >= 10;

    if (!isPhoneValid) {
      newErrors.phone = 'Please enter a valid phone number or email address.';
    }

    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted successfully:', phoneNumber);
      navigate('/otp');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className="h-full p-6 flex items-center justify-center flex-col">
        <div className="md:max-w-[800px] w-full">
          {/* Back button */}
          <div>
            <NavLink
              to="/sign-in"
              className="flex items-center gap-2 cursor-pointer mb-8"
            >
              <img src={arrowLeft} alt="Back" />
              <p>Back</p>
            </NavLink>
          </div>

          {/* Title */}
          <div>
            <span className="text-[32px] font-bold leading-tight">
              Forgot password
            </span>
            <p className="text-[18px] font-normal pt-5">
              Please enter your email or phone number to reset the password
            </p>
          </div>

          {/* Form */}
          <form className="w-full h-auto mt-10" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="username" className="font-semibold text-base">
                Phone No or Email
              </label>

              <div className="flex">
                <Dropdown
                  countries={countries}
                  onSelect={updateCountry}
                  isOpen={dropdownOpen}
                  onToggle={handleDropdownToggle}
                />
                <input
                  type="text"
                  value={phoneNumber}
                  name="PhoneOrEmail"
                  id="PhoneOrEmail"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    const newErrors = validate();
                    setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, phone: true });
                    const newErrors = validate();
                    setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
                  }}
                  placeholder="Your Phone number or Email"
                  className={`border mb-3 p-2.5 rounded-lg placeholder:text-base placeholder:text-[#98A2B3] relative z-10 w-full cursor-pointer ${
                    touched.phone && errors.phone
                      ? 'border border-red-500'
                      : phoneNumber
                      ? 'border border-green-500'
                      : 'border border-[#DDD5DD]'
                  }`}
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg mt-8 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C] hover:bg-green-700 hover:text-white hover:font-bold cursor-pointer transition-all duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Support icon */}
      <div className="relative self-end p-[40px] cursor-pointer">
        <img
          src={supportIcon}
          alt="supportIcon"
          className="w-[40px] h-[40px] self-end"
          onClick={() => setShowSupport(true)}
        />
        <Support show={showSupport} onClose={() => setShowSupport(false)} />
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
