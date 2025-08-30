import React, { useState } from "react";
import Dropdown from "@/components/shared/Dropdown";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { countries } from "../../lib/countries";
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import MobileBg from "../../assets/images/MobileSignup.png";
import DesktopBgSignUp from "../../assets/images/DesktopSignUp.jpg";
import { RegisterMutation, requestOtp } from "@/components/queries/auth/register";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    phone: false,
    password: false,
    confirmPassword: false,
    agree: false,
    country: null,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Country selection
  const updateCountry = (country) => {
    setDropdownOpen(false);
    setTouched((prev) => ({
      ...prev,
      country,
    }));
  };

  const handleDropdownToggle = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  setDropdownOpen(!dropdownOpen);
};

  const handleInputClick = () => {
    setFocused(!focused);
  };

  const validateForm = () => {
    const newErrors = {};
    const isPhoneValid = phoneNumber && phoneNumber.length >= 10;

    if (!isPhoneValid)
      newErrors.phone = "Please enter a valid phone number or email address.";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters!";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!agree) newErrors.agree = "You must agree to the terms.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
      setLoading(false);
    } else {
      setErrors({});

      let payload = {};
      const selectedRole = localStorage.getItem("selectedRole");

      if (!selectedRole) {
        toast.error("Please select a role before signing up.");
        setLoading(false);
        return;
      }

      if (phoneNumber.includes("@")) {
        payload = {
          email: phoneNumber,
          password,
          category: selectedRole,
        };
      } else {
        payload = {
          phone_number: phoneNumber,
          password,
          category: selectedRole,
        };
      }

      RegisterMutation(payload)
        .then(async (result) => {
          if (result.isSuccess) {
            if (result.token?.access_token) {
              Cookies.set("BIGFARMA_ACCESS_TOKEN", result.token.access_token);
            }
            toast.success(result.message || "Registration successful!");
            const userEmail = result.data?.user?.email || (phoneNumber.includes("@") ? phoneNumber : undefined);
            const userPhone = result.data?.user?.phone_number || (!phoneNumber.includes("@") ? phoneNumber : undefined);
            const otpPayload = {
              email: userEmail || "",
              phone: userPhone || "",
              medium: userEmail ? "email" : "phone",
              otp_type: "verification",
            };
            try {
              const otpResult = await requestOtp(otpPayload);
              if (!otpResult.isSuccess) {
                toast.error(otpResult.message || "Failed to send OTP.");
              }
            } catch (otpErr) {
              toast.error(otpErr?.message || "Failed to send OTP.");
            }
            navigate("/otp", { state: { email: userEmail || userPhone } });
          } else {
            setErrors({ form: result.message });
            toast.error(
              result.message ||
                `Registration failed (code: ${result.statusCode})`
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err?.message || "Registration failed. Please try again.");
          setLoading(false);
        });
    }
  };
  return (
    <div className="w-full h-screen  flex flex-col lg:flex-row items-center bg-white">
      {/* Left Image */}
      <div className="w-full lg:max-w-[35%] h-full flex items-center justify-center overflow-hidden">
        <img
          src={isMobile ? MobileBg : DesktopBgSignUp}
          alt="Sign Up"
          style={{ transformOrigin: "center" }}
          className="w-full h-screen lg:h-full md:h-[51.2rem] object-cover scale-150 md:scale-200 lg:scale-100 transition-transform duration-500"
        />
      </div>

      {/* Right form */}
      <div
        className="w-full absolute top-[50%] rounded-t-xl bg-white p-6  md:flex md:items-center md:justify-center 
            lg:relative lg:w-[65%] lg:h-full lg:rounded-tl-lg lg:rounded-bl-lg  
            lg:-ml-1 lg:z-10 lg:top-0"
      >
        <div className="w-full max-w-2xl flex flex-col justify-between bg-white py-3 space-y-4">
          <h3 className="text-[32px] font-bold">Create an account</h3>
          <p className="text-[18px] font-normal pt-5">
            Enter your details below to create your account and get started
          </p>

          <form onSubmit={handleSubmit} className="w-full h-auto mt-6">
            {/* Phone/Email */}
            <div>
              <label htmlFor="phoneOrEmail" className="block font-semibold text-base">
                Phone number or Email
              </label>
              <motion.div 
                className="flex items-center gap-2" initial={false}
                animate={{ marginLeft: focused ? "10px" : "0px" }}
                transition={{ duration: 0.4 }}>
                  <motion.div 
                  className="relative"
                  initial={false}
                  animate={{
                    opacity: focused ? 0 : 1,
                    x: focused ? -50 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  >
                    <Dropdown
                      countries={countries}
                      onSelect={updateCountry}
                      isOpen={dropdownOpen}
                      onToggle={handleDropdownToggle}
                    />
                  </motion.div>
              
                <motion.input
                  type="text"
                  value={phoneNumber}
                  onClick={handleInputClick}
                  name="PhoneOrEmail"
                  id="PhoneOrEmail"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    const newErrors = validateForm();
                    setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, phone: true });
                    const newErrors = validateForm();
                    setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
                  }}
                  initial={false}
                  animate={{
                    width: focused ? 670 : 625,
                    marginLeft: focused ? -57 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  placeholder="Your Phone number or Email"
                  className={`border p-3 rounded-lg placeholder:text-base placeholder:text-[#98A2B3] relative z-10 w-full cursor-pointer ${
                    touched.phone && errors.phone
                      ? "border-red-500"
                      : "border-[#DDD5DD]"
                  }`}
                />
              </motion.div>
              <AnimatePresence mode="wait">
                {touched.phone && errors.phone && (
                  <motion.p 
                    key="phone-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-red-600 text-xs mt-1">
                      {errors.phone}
                    </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="mt-5">
              <label htmlFor="password" className="font-semibold text-base">
                Password
              </label>
              <div className={`flex items-center rounded-lg px-3 border ${
                touched.password && errors.password ? "border-red-500" : "border-[#DDD5DD]"
              }`}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  id="password"
                  placeholder="Must be 8 characters"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    const newErrors = validateForm();
                    setErrors((prev) => ({
                      ...prev,
                      password: newErrors.password,
                    }));
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, password: true });
                    const newErrors = validateForm();
                    setErrors((prev) => ({
                      ...prev,
                      password: newErrors.password,
                    }));
                  }}
                  className="w-full p-3 bg-white focus focus:outline-none py-2 placeholder:text-base placeholder:text-[#98A2B3]"
                />
                <div
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <Eye /> : <EyeOff />}
                </div>
              </div>
              <AnimatePresence mode="wait">
                {touched.password && errors.password && (
                  <motion.p 
                    key="password-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-red-600 text-xs mt-1">
                      {errors.password}
                    </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password */}
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-base"
              >
                Confirm Password
              </label>
              <div className={`flex items-center rounded-lg px-3 border ${
                touched.confirmPassword && errors.confirmPassword ? "border-red-500" : "border-[#DDD5DD]"
              }`}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  id="confirmPassword"
                  placeholder="Repeat password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    const newErrors = validateForm();
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: newErrors.confirmPassword,
                    }));
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, confirmPassword: true });
                    const newErrors = validateForm();
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: newErrors.confirmPassword,
                    }));
                  }}
                  className="w-full p-3 bg-white focus:outline-none py-2 placeholder:text-base placeholder:text-[#98A2B3]"
                />
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? <Eye /> : <EyeOff />}
                </div>
              </div>
              <AnimatePresence mode="wait">
                {touched.confirmPassword && errors.confirmPassword && (
                  <motion.p 
                    key="confirmPassword-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-red-600 text-xs mt-1">
                      {errors.confirmPassword}
                    </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start justify-between gap-2 mt-5 font-medim text-sm">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  const newErrors = validateForm();
                  setErrors((prev) => ({ ...prev, agree: newErrors.agree }));
                }}
                onBlur={() => {
                  setTouched({ ...touched, agree: true });
                  const newErrors = validateForm();
                  setErrors((prev) => ({ ...prev, agree: newErrors.agree }));
                }}
                className="w-4 h-4 appearance-none border border[#FFA725] rounded checked:bg-[#FFA725] checked:after:content-['✔'] checked:after:text-white checked:after:text-xs checked:after:block checked:after:ml-[2px]"
              />
              <label
                htmlFor="agree"
                className="text-gray-500 text-sm font-medium"
              >
                By signing up, you acknowledge that you have read and agree to
                be bound by our{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFA725]"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target={{ transformOrigin: "center" }}
                  rel="noopener noreferrer"
                  className="text-[#FFA725]"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <AnimatePresence mode="wait">
                {touched.agree && errors.agree && (
                  <motion.p 
                    key="agree-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-red-600 text-xs mt-1">
                      {errors.agree}
                    </motion.p>
                )}
              </AnimatePresence>

            {/* Sign Up button */}
            <button
              type="submit"
              className="w-full h-12 cursor-pointer rounded-lg mt-4 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C]"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-3 flex items-center gap-5">
            {isMobile ? (
              <div className="w-full flex items-center justify-center">
                <hr className="flex-grow border-gray-300" />
                <span className=" text-xs mx-6"> Or Sign up with </span>
                <hr className="flex-grow border-gray-300" />
              </div>
            ) : (
              <>
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-xs">Or</span>
                <hr className="flex-grow border-gray-300" />
              </>
            )}
          </div>

          {/* Social buttons */}
          <div className="flex justify-center items-center gap-7 font-normal text-base">
            {isMobile ? (
              <div className="flex justify-center items-center gap-6 w-full mt-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#3C3C3C] rounded-full shadow-lg">
                  <FcGoogle className="text-2xl" />
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#3C3C3C] rounded-full shadow-lg">
                  <FaApple className="text-2xl text-black" />
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="w-[400px] h-12 flex items-center justify-center gap-3 border border-[#3C3C3C] rounded-lg"
                >
                  <FcGoogle className="text-lg mr-2" />
                  <span className="text-sm">
                    Sign up with <strong>Google</strong>
                  </span>
                </button>
                <button
                  type="button"
                  className="w-[400px] h-12 flex items-center justify-center gap-3 border border-[#3C3C3C] rounded-lg"
                >
                  <FaApple className="text-lg mr-2" />
                  <span className="text-sm">
                    Sign up with <strong>Apple</strong>
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Sign In link */}
          <p className="font-rubik text-center text-base font-normal mt-5">
            Already have an account?{" "}
            <Link
              to="/Sign-in"
              className="text-[#FFA725] cursor-pointer font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;