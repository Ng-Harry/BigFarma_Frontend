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
import { RegisterMutation } from "@/components/queries/auth/register";
import Cookies from "js-cookie";
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
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	// Country selection
	const updateCountry = (country) => {
		setDropdownOpen(false);
		setTouched((prev) => ({
			...prev,
			country,
		}));
	};

	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen);
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
		const newErrors = validateForm();

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			toast.error("Please fix the errors in the form.");
		} else {
			setErrors({});
			let payload = {};
			if (phoneNumber.includes("@")) {
				payload = { email: phoneNumber, password };
			} else {
				payload = { phone: phoneNumber, password };
			}

			RegisterMutation(payload)
				.then((result) => {
					if (result.isSuccess) {
						if (result.token?.access_token) {
							Cookies.set("BIGFARMA_ACCESS_TOKEN", result.token.access_token);
						}
						toast.success(result.message || "Registration successful!");
						const userEmail = result.data?.user?.email || phoneNumber;
						navigate("/otp", { state: { email: userEmail } });
					} else {
						setErrors({ form: result.message });
						toast.error(
							result.message ||
								`Registration failed (code: ${result.statusCode})`
						);
					}
				})
				.catch((err) => {
					toast.error(err?.message || "Registration failed. Please try again.");
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
            lg:-ml-1 lg:z-10 lg:top-0">
				<div className="w-full max-w-2xl flex flex-col justify-between bg-white py-3 space-y-4">
					<h3 className="text-[32px] font-bold">Create an account</h3>
					<p className="text-[18px] font-normal pt-5">
						Enter your details below to create your account and get started
					</p>

					<form onSubmit={handleSubmit} className="w-full h-auto mt-6">
						{/* Phone/Email */}
						<div>
							<label className="block font-semibold text-base">
								Phone number or Email
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
										const newErrors = validateForm();
										setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
									}}
									onBlur={() => {
										setTouched({ ...touched, phone: true });
										const newErrors = validateForm();
										setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
									}}
									placeholder="Your Phone number or Email"
									className={`border mb-3 p-2.5 rounded-lg placeholder:text-base placeholder:text-[#98A2B3] relative z-10 w-full cursor-pointer ${
										touched.phone && errors.phone
											? "border-red-500"
											: "border-[#DDD5DD]"
									}`}
								/>
							</div>
							{touched.phone && errors.phone && (
								<p className="text-red-600 text-xs mt-1">{errors.phone}</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label htmlFor="password" className="font-semibold text-base">
								Password
							</label>
							<div className="flex items-center border border-gray-300 rounded-md px-3">
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
									className={`w-full mb-3 bg-white focus:outline-none py-2 ${
										touched.password && errors.password ? "border-red-500" : ""
									}`}
								/>
								<div
									className="cursor-pointer text-gray-500"
									onClick={() => setPasswordVisible(!passwordVisible)}>
									{passwordVisible ? <Eye /> : <EyeOff />}
								</div>
							</div>
							{touched.password && errors.password && (
								<p className="text-red-600 text-xs mt-1">{errors.password}</p>
							)}
						</div>

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="font-semibold text-base">
								Confirm Password
							</label>
							<div className="flex items-center border border-gray-300 rounded-md px-3">
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
									className={`w-full mb-3 bg-white focus:outline-none py-2 ${
										touched.confirmPassword && errors.confirmPassword
											? "border-red-500"
											: ""
									}`}
								/>
								<div
									className="text-gray-500 cursor-pointer"
									onClick={() =>
										setConfirmPasswordVisible(!confirmPasswordVisible)
									}>
									{confirmPasswordVisible ? <Eye /> : <EyeOff />}
								</div>
							</div>
							{touched.confirmPassword && errors.confirmPassword && (
								<p className="text-red-600 text-xs mt-1">
									{errors.confirmPassword}
								</p>
							)}
						</div>

						{/* Terms & Conditions */}
						<div className="flex items-start justify-between gap-2 mt-4 font-medim text-sm">
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
								className="text-gray-500 text-sm font-medium">
								By signing up, you acknowledge that you have read and agree to
								be bound by our{" "}
								<a
									href="/terms"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#FFA725]">
									Terms & Conditions
								</a>{" "}
								and{" "}
								<a
									href="/privacy"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#FFA725]">
									Privacy Policy
								</a>
								.
							</label>
						</div>
						{touched.agree && errors.agree && (
							<p className="text-red-600 text-xs mt-1">{errors.agree}</p>
						)}

						{/* Sign Up button */}
						<button
							type="submit"
							className="w-full h-12 cursor-pointer rounded-lg mt-4 font-normal text-[22px] bg-[#DDD5DD] text-[#3C3C3C]">
							Sign Up
						</button>
					</form>

					{/* Divider */}
					<div className="mt-3 flex items-center gap-5">
						{isMobile ? (
							<div className="w-full flex items-center justify-center">
								<hr className="flex-grow border-gray-300" />
								<span className=" text-xs"> Or Sign up with </span>
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
									className="w-[400px] h-12 flex items-center justify-center gap-3 border border-[#3C3C3C] rounded-lg">
									<FcGoogle className="text-lg mr-2" />
									<span className="text-sm">
										Sign up with <strong>Google</strong>
									</span>
								</button>
								<button
									type="button"
									className="w-[400px] h-12 flex items-center justify-center gap-3 border border-[#3C3C3C] rounded-lg">
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
							className="text-[#FFA725] cursor-pointer font-medium">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
