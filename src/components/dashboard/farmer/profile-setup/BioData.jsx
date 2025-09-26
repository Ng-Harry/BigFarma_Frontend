import React, { useState, useRef } from "react";
import customerPhoto from "../../../../assets/images/Customer-photo.png";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { endpoints } from "../../../config/endpoints";
import { axios } from "../../../../lib/axios";
import axiosDefault from "axios";

const ProfileForm = ({ onNext }) => {
	const [image, setImage] = useState(null);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		gender: "",
		address: "",
	});
	const fileInputRef = useRef(null);

	const handleImageUpload = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleEditClick = () => {
		fileInputRef.current.click(); // Programmatically open file dialog
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			formData.firstName &&
			formData.lastName &&
			formData.phone &&
			formData.email
		) {
			const payload = {
				full_name: `${formData.firstName} ${formData.lastName}`,
				home_address: formData.address,
				email: formData.email,
				phone: formData.phone,
				profile_picture: null,
				id_document: "string",
				farm_name: "string",
				farm_type: "crop",
				farm_image: null,
				farm_location: "string",
				farm_size: "0 acres",
				years_experience: 0,
			};

			try {
				const res = await axios.post(
					endpoints().users.create_farmer_profile,
					payload,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("BIGFARMA_ACCESS_TOKEN")}`,
						},
					}
				);

				const data = res.data;

				if (res.status === 200 || res.status === 201) {
					toast.success(data.message || "Saved successfully!");
					onNext(data);
				} else {
					toast.error(data.message || "Network error. Please try again.");
				}
			} catch (error) {
				console.error("Error:", error);
				if (axiosDefault.isAxiosError(error) && error.response) {
					toast.error(error.response.data?.message || "Profile setup failed");
				} else {
					toast.error("Unable to connect to the server");
				}
			}
		}
	};

	return (
		<div className="fixed inset-0 w-full min-h-screen bg-black/50  z-50 flex items-center justify-center">
			<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
				{/* Heading */}
				<h2 className="text-2xl font-semibold text-gray-900 text-left">
					Let's get to know you
				</h2>
				<p className="text-gray-600 text-left font-bold mt-2 mb-6 text-[12px]">
					Please provide your basic details to help us set up your account. This
					helps us keep our farmer community safe and trustworthy.
				</p>

				{/* Profile Image */}
				<div className="flex flex-col items-center mb-6">
					<img
						src={image || customerPhoto}
						alt="Profile"
						className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
					/>
					<input
						type="file"
						accept="image/*"
						className="hidden"
						ref={fileInputRef}
						onChange={handleImageUpload}
					/>
					<span
						className="text-green-700 mt-2 cursor-pointer hover:underline"
						onClick={handleEditClick}>
						Edit
					</span>
				</div>

				{/* Form Fields */}
				<form className="space-y-4" onSubmit={handleSubmit}>
					{/* First & Last Name */}
					<div className="grid grid-cols-2 gap-4 ">
						<input
							type="text"
							placeholder="First Name *"
							className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
							required
							value={formData.firstName}
							onChange={(e) =>
								setFormData({ ...formData, firstName: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Last Name *"
							className="w-full border border-gray-400  rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
							required
							value={formData.lastName}
							onChange={(e) =>
								setFormData({ ...formData, lastName: e.target.value })
							}
						/>
					</div>

					{/* Email & Phone */}
					<div className="grid grid-cols-2 gap-4">
						<input
							type="email"
							placeholder="Email"
							className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
						<div className="flex">
							<span className="px-3 flex items-center bg-gray-100 border border-gray-400 rounded-l-lg text-gray-700">
								🇳🇬
							</span>
							<input
								type="tel"
								placeholder="08022222222"
								className="w-full border border-gray-400 rounded-r-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
								required
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
							/>
						</div>
					</div>

					{/* Gender */}
					<div>
						<p className="text-gray-700 mb-2">Gender</p>
						<div className="flex gap-4">
							<label className="flex items-left text-left space-x-2 border border-gray-400 rounded-lg pl-4 pr-8 py-2 mr-7">
								<input
									type="radio"
									name="gender"
									className="accent-green-700 text-left"
									required
									checked={formData.gender === "male"}
									onChange={() => setFormData({ ...formData, gender: "male" })}
								/>
								<span>Male</span>
							</label>
							<label className="flex items-left space-x-2 border border-gray-400 rounded-lg px-6 py-2">
								<input
									type="radio"
									name="gender"
									className="accent-green-700 border rounded-r-lg"
									required
									checked={formData.gender === "female"}
									onChange={() =>
										setFormData({ ...formData, gender: "female" })
									}
								/>
								<span>Female</span>
							</label>
						</div>
					</div>

					{/* Address */}
					<textarea
						placeholder="123 Example Street, Ikeja, Lagos."
						className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
						required
						value={formData.address}
						onChange={(e) =>
							setFormData({ ...formData, address: e.target.value })
						}
					/>

					{/* Submit Button */}
					<div className="items-center">
						<button
							type="submit"
							className="w-fit mx-auto flex justify-center px-7 items-center bg-green-700 text-white rounded-lg py-3 hover:bg-green-900 cursor-pointer transition duration-200">
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default ProfileForm;
