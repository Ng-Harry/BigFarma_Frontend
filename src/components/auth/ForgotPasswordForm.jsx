import arrowLeft from '../../assets/icons/arrow_left.svg';
import supportIcon from '../../assets/icons/Support_Icon .png';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Support from './Support';

// // Mock countries list for Dropdown
// const countries = [
//   { name: 'Nigeria', code: 'ng' },
//   { name: 'United States', code: 'us' },
//   { name: 'United Kingdom', code: 'gb' },
// ];

const ForgotPasswordForm = () => {
  const [focused, setFocused] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [value, setValue] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Detect email vs phone
  const handleInputChange = (val) => {
    setValue(val);
    setErrors({});
    const phoneRegex = /^[0-9+()\s-]+$/;
    setIsPhone(phoneRegex.test(val) && val.length > 3);
  };

  const validate = () => {
    const newErrors = {};
    if (!value) {
      newErrors.username = 'Please enter your phone or email';
    } else if (!isPhone && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.username = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully:', value);
      navigate('/otp');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className=" h-full p-6  flex items-center justify-center flex-col">
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

              <motion.div
                className="flex items-center gap-2 relative"
                initial={false}
                animate={{ marginLeft: focused ? '10px' : '0px' }}
                transition={{ duration: 0.4 }}
              >
                {isPhone ? (
                  <PhoneInput 
                    country={'ng'}
                    value={value}
                    onChange={(phone) => setValue(phone)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                      setFocused(false);
                      setTouched({ ...touched, username: true });
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '0.375rem',
                      border: '1px solid #D1D5DB',
                      padding: '0.5rem',
                    }}
                    containerClass="w-full"
                    placeholder="Enter phone number"
                    inputProps={{ name: 'phone', required: true }}
                    // containerClass="flex-1"
                    inputClass={`w-full py-[25px] rounded-lg placeholder:text-base placeholder:text-[#98A2B3]
                    ${
                      errors.username
                        ? 'border border-red-500'
                        : value
                        ? 'border border-green-500'
                        : 'border border-[#DDD5DD]'
                    }`}
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                      setFocused(false);
                      setTouched({ ...touched, username: true });
                    }}
                    placeholder="Enter email or phone number"
                    className={`border rounded-lg p-2.5 w-full  placeholder:text-base placeholder:text-[#98A2B3]
                    ${
                      errors.username
                        ? 'border-red-500'
                        : value
                        ? 'border-green-500'
                        : 'border-[#DDD5DD]'
                    }`}
                  />
                )}
              </motion.div>

              {/* Error message */}
              <AnimatePresence mode="wait">
                {errors.username && (
                  <motion.p
                    key="username-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.username}
                  </motion.p>
                )}
              </AnimatePresence>
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
