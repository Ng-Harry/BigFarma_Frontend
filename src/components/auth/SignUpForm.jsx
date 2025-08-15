import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Dropdown from "@/components/shared/Dropdown";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { countries } from "../../lib/countries";
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from 'lucide-react';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { control, handleSubmit, watch, updateCountry, formState: { errors } } = useForm({
    defaultValues: {
      contact: '',
      password: '',
      confirmPassword: '',
      agree: false
    }
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // country
  const handleSelect = (country) => {
    // console.log("selected", country);
    setDropdownOpen(false);
    updateCountry(country);
  };
  // dropdown ontoggle
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onSubmit = (data) => {
    navigate("/dashboard");
    console.log("Form submitted successfully:", data);
  };

  return (
    <div className="w-full h-screen flex items-center bg-white">
      <div className="max-w-[1440px] w-full grid md:grid-cols-12">
        
        {/* Left image */}
        <div className="h-full md:col-span-5">
          <img 
            src="/src/assets/images/imageSignUp.jpg" 
            alt="Sign Up" 
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right form */}
        <div className="md:col-span-7 flex items-center justify-center px-20 py-10 h-full">
          <div className="w-full max-w-md">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-5">Create an account</h3>
              <p className="text-[18px] font-normal pt-5">
                Enter your details below to create your account and get started
              </p>
            </div>
          
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-10">
              
              {/* Phone/Email */}
              <div>
                <label className="block font-semibold text-base mb-1">
                  Phone number or Email
                </label>
                <div className='flex'>
                  <Dropdown
                    countries={countries}
                    onSelect={handleSelect}
                    isOpen={dropdownOpen}
                    onToggle={handleDropdownToggle}
                  />
                  <input
                  type="text"
                  name="username"
                  placeholder="Your Phone number or Email"
                  className={`border p-2.5 rounded-lg placeholder:text-base placeholder:text-[#98A2B3] relative z-10 w-full cursor-pointer ${
                    errors.username ? "border-red-500" : "border-[#DDD5DD]"
                  }`}
                    
                  />

                </div>
                
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-base font-semibold mb-1">
                  Password
                </label>
                <div className={`flex items-center rounded-md px-3 focus:shadow-sm focus-within:outline-none border ${
                  errors.password
                    ? 'border-red-500 focus-within:border-red-500'
                    : 'border-gray-300 focus-within:border-gray-500'
                }`}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters.' }
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        placeholder="Must be 8 characters"
                        className="w-full py-2 bg-white focus:outline-none placeholder:text-base text-sm placeholder:text-[#98A2B3]"
                      />
                    )}
                  />
                  <div className="cursor-pointer text-gray-500" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <Eye /> : <EyeOff />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-base font-semibold mb-1">
                  Confirm Password
                </label>
                <div className={`flex items-center rounded-md px-3 border focus-within:outline-none ${
                  errors.confirmPassword
                    ? 'border-red-500 focus-within:border-red-500'
                    : 'border-gray-300 focus-within:border-gray-500'
                }`}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match'
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={confirmPasswordVisible ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Repeat password"
                        className="w-full py-2 bg-white focus:outline-none text-sm placeholder:text-base placeholder:text-[#98A2B3]"
                      />
                    )}
                  />
                  <div className="cursor-pointer  text-gray-500" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    {confirmPasswordVisible ? <Eye /> : <EyeOff />}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <Controller
                  name="agree"
                  control={control}
                  rules={{ required: 'You must agree to the terms.' }}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      {...field}
                      checked={field.value}
                      className="mt-1 accent-[#FFA725]"
                    />
                  )}
                />
                <label htmlFor="agree" className="text-xs text-gray-700 leading-snug">
                  By signing up, you acknowledge that you have read and agree to be bound by our{' '}
                  <a href="/terms" className="text-[#FFA725] underline">Terms & Conditions</a> and{' '}
                  <a href="/privacy" className="text-[#FFA725] underline">Privacy Policy</a>.
                </label>
              </div>
              {errors.agree && (
                <p className="text-red-500 text-xs mt-1">{errors.agree.message}</p>
              )}

              {/* Sign Up button */}
              <button 
                type="submit" 
                className="w-full h-12 rounded-lg mt-4 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C]"
              >
                Sign Up
              </button>

              {/* Divider */}
              <div className="flex items-center space-x-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-xs">Or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social buttons */}
              <div className="flex gap-3 font-normal text-base">
                <button type="button" className="flex items-center justify-center w-full border rounded-md py-2 hover:bg-gray-50">
                  <FcGoogle className="text-lg mr-2" /> 
                  <span className="text-sm">Sign up with <strong>Google</strong></span>
                </button>
                <button type="button" className="flex items-center justify-center w-full border rounded-md py-2 hover:bg-gray-50">
                  <FaApple className="text-lg mr-2" /> 
                  <span className="text-sm">Sign up with <strong>Apple</strong></span>
                </button>
              </div>

              {/* Sign In link */}
              <p className="font-rubik text-center text-base font-normal mt-5">
                Already have an account?{' '}
                <Link to="/Sign-in" className="text-[#FFA725] font-medium">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
