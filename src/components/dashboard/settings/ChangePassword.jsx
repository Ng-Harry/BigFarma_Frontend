import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

const ChangePassword = () => {
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});

	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [touched, setTouched] = useState(false);

	// Password validation rules
	const rules = {
		uppercase: /[A-Z]/.test(formData.newPassword),
		number: /\d/.test(formData.newPassword),
		length: formData.newPassword.length >= 8,
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setTouched(true);
	};

	const handleDiscard = () => {
		setFormData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
		setTouched(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			rules.uppercase &&
			rules.number &&
			rules.length &&
			formData.newPassword === formData.confirmPassword
		) {
			alert("Password updated successfully!");
			handleDiscard();
		} else {
			alert("Please meet all password requirements.");
		}
	};

	const getStrengthColor = () => {
		const passed = Object.values(rules).filter(Boolean).length;
		return (
			["bg-red-500", "bg-yellow-400", "bg-green-500"][
				Math.min(passed - 1, 2)
			] || "bg-gray-200"
		);
	};

	return (
		<div className="w-full md:w-5/6 space-y-3 bg-white rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] p-6">
			<h2 className="text-lg font-semibold text-gray-800">
				Change your password
			</h2>
			<p className="text-gray-500 text-sm mb-6">
				Update password for enhanced account security.
			</p>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Current Password */}
				<div className="grid md:grid-cols-3">
					<div className="md:col-span-3">
						<label className="block text-sm font-medium text-gray-700">
							Current Password <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword.current ? "text" : "password"}
								name="currentPassword"
								value={formData.currentPassword}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 pr-10 focus:ring-green-600 focus:outline-none"
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										current: !prev.current,
									}))
								}
								className="absolute inset-y-0 right-2 flex items-center text-gray-500">
								{showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>
					{/* New Password */}
					<div className="md:col-span-3">
						<label className="block text-sm font-medium text-gray-700">
							New Password <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword.new ? "text" : "password"}
								name="newPassword"
								value={formData.newPassword}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 pr-10 focus:ring-green-600 focus:outline-none"
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										new: !prev.new,
									}))
								}
								className="absolute inset-y-0 right-2 flex items-center text-gray-500">
								{showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>
					{/* Confirm Password */}
					<div className="md:col-span-3">
						<label className="block text-sm font-medium text-gray-700">
							Confirm New Password <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword.confirm ? "text" : "password"}
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 pr-10 focus:ring-green-600 focus:outline-none"
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										confirm: !prev.confirm,
									}))
								}
								className="absolute inset-y-0 right-2 flex items-center text-gray-500">
								{showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>
				</div>

				{/* Password Strength */}
				{touched && (
					<>
						<div className="flex gap-2 mt-2">
							<div
								className={`h-1 flex-1 rounded ${
									rules.uppercase ? getStrengthColor() : "bg-gray-200"
								}`}></div>
							<div
								className={`h-1 flex-1 rounded ${
									rules.number ? getStrengthColor() : "bg-gray-200"
								}`}></div>
							<div
								className={`h-1 flex-1 rounded ${
									rules.length ? getStrengthColor() : "bg-gray-200"
								}`}></div>
						</div>

						<p
							className={`text-sm mt-2 ${
								Object.values(rules).every(Boolean)
									? "text-green-600"
									: Object.values(rules).filter(Boolean).length >= 2
									? "text-yellow-600"
									: "text-red-600"
							}`}>
							{Object.values(rules).every(Boolean)
								? "Strong password 💪"
								: Object.values(rules).filter(Boolean).length >= 2
								? "Moderate password — improve it for better security"
								: "Weak password. Must contain:"}
						</p>

						<ul className="text-sm space-y-1">
							<li className="flex items-center gap-2">
								{rules.uppercase ? (
									<CheckCircle className="text-green-600" size={16} />
								) : (
									<XCircle className="text-gray-400" size={16} />
								)}
								At least 1 uppercase
							</li>
							<li className="flex items-center gap-2">
								{rules.number ? (
									<CheckCircle className="text-green-600" size={16} />
								) : (
									<XCircle className="text-gray-400" size={16} />
								)}
								At least 1 number
							</li>
							<li className="flex items-center gap-2">
								{rules.length ? (
									<CheckCircle className="text-green-600" size={16} />
								) : (
									<XCircle className="text-gray-400" size={16} />
								)}
								At least 8 characters
							</li>
						</ul>
					</>
				)}

				{/* Buttons */}
				<div className="grid md:grid-cols-3">
					<div className="flex gap-4 md:col-span-3 mt-4">
						<button
							type="button"
							onClick={handleDiscard}
							className="border border-[#016130] text-[#016130] px-4 py-2 rounded-lg hover:bg-green-50 transition block w-full">
							Discard Changes
						</button>
						<button
							type="submit"
							className="bg-[#016130] text-white px-4 py-2 rounded-lg hover:bg-[#003F1F] transition block w-full">
							Save Changes
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;