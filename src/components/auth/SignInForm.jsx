import bgSignIn from "../../assets/images/imageSignUp.jpg";
import { countries } from "../../lib/countries";
import Dropdown from "@/components/shared/Dropdown";
import { EyeOff, Eye } from "lucide-react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import googleIcon from "../../assets/icons/google.png";
import supportIcon from "../../assets/icons/Support_Icon .png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import Support from "./Support";

const SignInForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const Navigate = useNavigate();

  const { loginData, errors, updateField, updateCountry, handleSubmit } =
    useForm();

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
  // focus on input
  const handleInputClick = () => {
    setFocused(!focused);
  };
  const handleUpdateField = (field, value) => {
    updateField(field, value);
  };

  const handleFormSubmit = async (e) => {
    const data = await handleSubmit(e);
    if (data) {
      Navigate("/dashboard");
      console.log("Form submitted successfully:", data);
      // alert("Login successful! Check console for data.");
    } else {
      if (errors.submit) {
        console.log(`Login failed: ${errors.submit}`);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="max-w-[35%] h-full">
        <img src={bgSignIn} alt="" className="h-full w-full object-cover" />
      </div>

      {/* form */}
      <div className="w-[65%] h-full border-2 border-white rounded-bl-lg rounded-tl-lg -ml-3 bg-white flex items-center justify-center">
        <div className="w-[40rem] h-[40rem] flex flex-col justify-between">
          <div>
            <span className="text-[32px] font-bold leading-tight">
              Welcome Back!
            </span>
            <p className="text-[18px] font-normal pt-5">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="w-full h-auto mt-10" onSubmit={handleFormSubmit}>
            {/* phone no or email */}
            <div>
              <label htmlFor="username" className="font-semibold text-base">
                Phone No or Email
              </label>

              <motion.div
                className="flex items-center gap-2 relative"
                initial={false}
                animate={{ marginLeft: focused ? "10px" : "0px" }}
                transition={{ duration: 0.4 }}
              >
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
                    onSelect={handleSelect}
                    isOpen={dropdownOpen}
                    onToggle={handleDropdownToggle}
                  />
                </motion.div>

                <motion.input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={(e) =>
                    handleUpdateField("username", e.target.value)
                  }
                  onClick={handleInputClick}
                  placeholder="Your Phone number or Email"
                  initial={false}
                  animate={{
                    width: focused ? 680 : 600,
                    marginLeft: focused ? -50 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`border p-2.5 rounded-lg placeholder:text-base placeholder:text-[#98A2B3] relative z-10 cursor-pointer ${
                    errors.username ? "border-red-500" : "border-[#DDD5DD]"
                  }`}
                />
              </motion.div>
              {/* Animation for username error */}
              <AnimatePresence mode="wait">
                {errors.username && (
                  <motion.p
                    key="password-error"
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

            {/* password */}
            <div className="flex flex-col gap-1 mt-4 relative">
              <label htmlFor="password" className="font-semibold text-base">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleUpdateField("password", e.target.value)}
                placeholder="Must be 8 characters"
                className={`w-[630px] p-2.5 rounded-lg placeholder:text-base placeholder:tracking-tight placeholder:text-[#98A2B3] ${
                  errors.password ? "border-red-500" : "border-[#DDD5DD]"
                } border`}
              />
              {/* Password toggle to show/hide */}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5.5 top-10 text-gray-500 cursor-pointer"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
              {/* Animation for password error */}
              <AnimatePresence mode="wait">
                {errors.password && (
                  <motion.p
                    key="password-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* remember me */}
            <div className="flex items-center justify-between gap-2 mt-4 text-[#FFA725] text-sm font-medium">
              <div className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={(e) =>
                    handleUpdateField("rememberMe", e.target.checked)
                  }
                  className="w-4 h-4 appearance-none border border[#FFA725] rounded checked:bg-[#FFA725] checked:after:content-['✔'] checked:after:text-white checked:after:text-xs checked:after:block checked:after:ml-[2px]"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span>
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </span>
            </div>

            {/* sign in button */}
            <button
              type="submit"
              className="w-[630px] h-12 rounded-lg mt-4 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C]"
            >
              Sign In
            </button>
          </form>

          {/* divider */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <p className="w-[18rem] border-[0.5px] opacity-50 text-[#00000066]"></p>
            <span>or</span>
            <p className="w-[18rem] border-[0.5px] opacity-50 text-[#00000066]"></p>
          </div>

          {/* social media buttons */}
          <div className="flex items-center justify-center gap-7.5 mt-5 font-normal text-base">
            <div className="w-[300px] h-12 flex items-center justify-center gap-2 border border-[#3C3C3C] rounded-lg">
              <img src={googleIcon} alt="" className="w-[24px] h-[24px]" />
              <button>
                Sign in with <strong>Google</strong>
              </button>
            </div>
            <div className="w-[300px] h-12 flex items-center justify-center gap-2 border border-[#3C3C3C] rounded-lg">
              <FaApple className="text-2xl text-black" />
              <button>
                Sign in with <strong>Apple</strong>
              </button>
            </div>
          </div>

          {/* sign up and support */}
          <div className="flex flex-col">
            <p className="font-rubik text-center text-base font-normal mt-5">
              Don't have an account?{" "}
              <NavLink to="/sign-up" className="text-[#FFA725] font-medium">
                Sign Up
              </NavLink>
            </p>
            <div className=" relative self-end">
              <img
                src={supportIcon}
                alt="supportIcon"
                className="w-[40px] h-[40px] self-end"
                onClick={() => setShowSupport(true)}
              />
              <Support
                show={showSupport}
                onClose={() => setShowSupport(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
