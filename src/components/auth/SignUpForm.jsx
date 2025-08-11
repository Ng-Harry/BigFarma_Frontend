import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import DesktopBgSignUp from '../../assets/images/DesktopSignUp.jpg';

const SignUpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    phone: false,
    password: false,
    confirmPassword: false,
    agree: false
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (value) => setPhoneNumber(value);

  const validateForm = () => {
    const newErrors = {};
    const isPhoneValid = phoneNumber && phoneNumber.length >= 10;

    if (!isPhoneValid) newErrors.phone = 'Please enter a valid phone number.';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!agree) newErrors.agree = 'You must agree to the terms.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', { phoneNumber, password });
      // TODO: Add submit logic
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        {/* Left Image */}
        <div className="hidden md:block">
          <img src={DesktopBgSignUp} alt="Sign Up" className="h-full w-full object-cover" />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Create an account</h3>
          <p className="text-gray-600 mb-6">Enter your details below to create your account and get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone or Email */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number or Email</label>
              <PhoneInput 
                country={'ng'}
                value={phoneNumber}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, phone: true })}
                placeholder="Your email or phone number"
                inputProps={{ name: 'phone', required: true }}
                inputStyle={{ width: '100%', height: '40px', borderRadius: '0.375rem', border: '1px solid #D1D5DB', padding: '0.5rem' }}
                containerClass="w-full"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  id="password"
                  placeholder="Must be 8 characters"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  className="w-full bg-white focus:outline-none py-2"
                />
                <div className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  id="confirmPassword"
                  placeholder="Repeat password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                  className="w-full bg-white focus:outline-none py-2"
                />
                <div className="cursor-pointer" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </div>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                onBlur={() => setTouched({ ...touched, agree: true })}
                className="mt-1 accent-purple-600"
              />
              <label htmlFor="agree" className="text-xs leading-snug">
                By signing up, you agree to our{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  Privacy Policy
                </a>.
              </label>
            </div>
            {touched.agree && errors.agree && (
              <p className="text-red-600 text-xs mt-1">{errors.agree}</p>
            )}

            {/* submit button section */}
            <button type="submit" className="w-full bg-gray-400 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
              Sign Up
            </button>

            {/* Divider section */}
            <div className="flex items-center justify-center space-x-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-gray-400 text-xs">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">
              <button type="button" className="flex items-center justify-center w-full border rounded-md py-2 hover:bg-gray-50">
                <FcGoogle className="text-xl mr-2" /> <span className="text-sm">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center w-full border rounded-md py-2 hover:bg-gray-50">
                <FaApple className="text-xl mr-2" /> <span className="text-sm">Apple</span>
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-xs text-center mt-4">
              Already have an account?{' '}
              <Link to="/SignInForm" className="text-purple-600 font-semibold">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
 