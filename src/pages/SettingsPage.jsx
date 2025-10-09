// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { endpoints } from "../components/config/endpoints";
// import { axios } from "../lib/axios";
// import { toast } from "react-toastify";
// import axiosDefault from "axios";

// const AccountSettings = () => {
// 	const [firstname, setFirstname] = useState("");
// 	const [lastname, setLastname] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [phone, setPhone] = useState("");
// 	const [address, setAddress] = useState("");
// 	const [profileImage, setProfileImage] = useState(null);
// 	const [imagePreview, setImagePreview] = useState(null);

// 	const [formData, setFormData] = useState({
// 		firstName: firstname,
// 		lastName: lastname,
// 		email: email,
// 		phone: phone,
// 		gender: "gender",
// 		address: address,
// 	});

// 	const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
// 	const role = Cookies.get("BIGFARMA_ROLE");

// 	useEffect(() => {
// 		const fetchProfileDetails = async () => {
// 			if (token) {
// 				try {
// 					let response;
// 					if (role === "farmer") {
// 						response = await axios.get(endpoints().users.get_farmer_profile, {
// 							headers: {
// 								"Content-Type": "application/json",
// 								Authorization: `Bearer ${token}`,
// 							},
// 						});
// 						const data = await response.data;
// 						setFirstname(data.full_name.split(" ")[0]);
// 						setLastname(data.full_name.split(" ")[1]);
// 						setEmail(data.email);
// 						setPhone(data.phone);
// 						setAddress(data.home_address);
// 						setProfileImage(data.profile_picture);
// 						setImagePreview(data.profile_picture);
// 					} else if (role === "consumer") {
// 						response = await axios.get(endpoints().users.get_consumer_profile, {
// 							headers: {
// 								Authorization: `Bearer ${token}`,
// 							},
// 						});
// 						const data = await response.data;
// 						setFirstname(data.first_name);
// 						setLastname(data.last_name);
// 						setEmail(data.email);
// 						setPhone(data.phone);
// 						setAddress(data.address);
// 						setProfileImage(data.profile_picture);
// 						setImagePreview(data.profile_picture);
// 					}
// 				} catch (error) {
// 					console.error("Error fetching profile:", error);
// 					handleResetForm();
// 				}
// 			} else {
// 				handleResetForm();
// 			}
// 		};
// 		fetchProfileDetails();
// 	}, [role, token]);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleImageChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			const imageUrl = URL.createObjectURL(file);
// 			setImagePreview(imageUrl);
// 			setProfileImage(file);
// 		}
// 	};

// 	const handleResetForm = () => {
// 		setFirstname(null);
// 		setLastname(null);
// 		setEmail(null);
// 		setPhone(null);
// 		setAddress(null);
// 		setProfileImage(null);
// 		setImagePreview(null);
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		const farmerPayload = {
// 			full_name: `${formData.firstName} ${formData.lastName}`,
// 			home_address: formData.address,
// 			email: formData.email,
// 			phone: formData.phone,
// 			profile_picture: profileImage || null,
// 		};

// 		const consumerPayload = {
// 			first_name: formData.firstName,
// 			last_name: formData.lastName,
// 			address: formData.address,
// 			profile_picture: profileImage || null,
// 			email: formData.email,
// 			phone: formData.phone,
// 		};

// 		try {
// 			let response;
// 			if (role === "farmer") {
// 				response = await axios.put(
// 					endpoints().users.update_farmer_profile,
// 					farmerPayload,
// 					{
// 						headers: {
// 							"Content-Type": "application/json",
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);
// 				const data = await response.data;
// 				if (response.status === 200 || response.status === 201) {
// 					toast.success(data.message || "Changes Saved Successfully");
// 					window.location.reload();
// 				} else {
// 					toast.error(data.message || "Network error. Please try again.");
// 				}
// 			} else if (role === "consumer") {
// 				response = await axios.put(
// 					endpoints().users.update_consumer_profile,
// 					consumerPayload,
// 					{
// 						headers: {
// 							"Content-Type": "application/json",
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);
// 				const data = await response.data;
// 				if (response.status === 200 || response.status === 201) {
// 					toast.success(data.message || "Changes Saved Successfully");
// 					window.location.reload();
// 				} else {
// 					toast.error(data.message || "Network error. Please try again.");
// 				}
// 			}
// 		} catch (error) {
// 			console.error("Error:", error);
// 			if (axiosDefault.isAxiosError(error) && error.response) {
// 				toast.error(error.response.data?.message || "Profile setup failed");
// 			} else {
// 				toast.error("Unable to connect to the server");
// 			}
// 		}

// 		console.log("Submitted data:", formData);
// 	};

// 	return (
// 		<div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
// 			{/* Sidebar */}
// 			<div className="w-full md:w-1/3 space-y-3">
// 				<div className="border rounded-xl p-4 hover:border-green-700 cursor-pointer transition">
// 					<h3 className="font-semibold text-lg text-gray-800">
// 						Account Settings
// 					</h3>
// 					<p className="text-gray-500 text-sm">
// 						Details about your personal information
// 					</p>
// 				</div>

// 				<div className="border rounded-xl p-4 hover:border-green-700 cursor-pointer transition">
// 					<h3 className="font-semibold text-lg text-gray-800">
// 						Password & Security
// 					</h3>
// 					<p className="text-gray-500 text-sm">
// 						Change your password at anytime
// 					</p>
// 				</div>

// 				<div className="border rounded-xl p-4 hover:border-green-700 cursor-pointer transition">
// 					<h3 className="font-semibold text-lg text-gray-800">
// 						Delete your account
// 					</h3>
// 					<p className="text-gray-500 text-sm">
// 						Find how you can delete your account
// 					</p>
// 				</div>
// 			</div>

// 			{/* Main Section */}
// 			<div className="w-full md:w-2/3 space-y-6">
// 				{/* Upload Section */}
// 				<div className="flex items-center justify-between border rounded-xl p-4">
// 					<div className="flex items-center gap-4">
// 						<img
// 							src={imagePreview}
// 							alt="Profile"
// 							className="w-16 h-16 rounded-full object-cover border"
// 						/>
// 						<div>
// 							<p className="font-semibold text-gray-800">Upload A New Photo</p>
// 							<p className="text-sm text-gray-500">
// 								{profileImage?.name || "Profile.pic.jpg"}
// 							</p>
// 							<input
// 								type="file"
// 								id="fileInput"
// 								accept="image/*"
// 								className="hidden"
// 								onChange={handleImageChange}
// 							/>
// 						</div>
// 					</div>
// 					<button
// 						className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition"
// 						onClick={() => document.getElementById("fileInput").click()}>
// 						Update
// 					</button>
// 				</div>

// 				{/* Form Section */}
// 				<div className="border rounded-xl p-6 bg-white shadow-sm">
// 					<h3 className="font-semibold text-lg text-gray-800 mb-4">
// 						Change User Information here
// 					</h3>
// 					<form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
// 						<div>
// 							<label className="block text-sm font-medium text-gray-700">
// 								First Name <span className="text-red-500">*</span>
// 							</label>
// 							<input
// 								type="text"
// 								name="firstName"
// 								value={formData.firstName}
// 								onChange={handleChange}
// 								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
// 							/>
// 						</div>

// 						<div>
// 							<label className="block text-sm font-medium text-gray-700">
// 								Last Name <span className="text-red-500">*</span>
// 							</label>
// 							<input
// 								type="text"
// 								name="lastName"
// 								value={formData.lastName}
// 								onChange={handleChange}
// 								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
// 							/>
// 						</div>

// 						<div>
// 							<label className="block text-sm font-medium text-gray-700">
// 								Email
// 							</label>
// 							<input
// 								type="email"
// 								name="email"
// 								value={formData.email}
// 								onChange={handleChange}
// 								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
// 							/>
// 						</div>

// 						<div>
// 							<label className="block text-sm font-medium text-gray-700">
// 								Phone Number <span className="text-red-500">*</span>
// 							</label>
// 							<div className="flex items-center gap-2">
// 								{/* <span className="px-3 py-2 border border-green-700 rounded-lg text-gray-600">
// 									🇳🇬 +234
// 								</span> */}
// 								<input
// 									type="tel"
// 									name="phone"
// 									value={formData.phone}
// 									onChange={handleChange}
// 									className="flex-1 border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
// 								/>
// 							</div>
// 						</div>

// 						<div>
// 							<label className="block text-sm font-medium text-gray-700">
// 								Gender
// 							</label>
// 							<select
// 								name="gender"
// 								value={formData.gender}
// 								onChange={handleChange}
// 								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none">
// 								<option value="gender">Select Gender</option>
// 								<option>Female</option>
// 								<option>Male</option>
// 							</select>
// 						</div>

// 						<div className="md:col-span-2">
// 							<label className="block text-sm font-medium text-gray-700">
// 								Address
// 							</label>
// 							<textarea
// 								name="address"
// 								rows="3"
// 								value={formData.address}
// 								onChange={handleChange}
// 								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"></textarea>
// 						</div>

// 						<div className="flex justify-end gap-3 md:col-span-2 mt-2">
// 							<button
// 								type="button"
// 								className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition"
// 								onClick={handleResetForm}>
// 								Discard Changes
// 							</button>
// 							<button
// 								type="submit"
// 								className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
// 								Save Changes
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AccountSettings;


import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { endpoints } from "../components/config/endpoints";
import { axios } from "../lib/axios";
import { toast } from "react-toastify";
import axiosDefault from "axios";

const AccountSettings = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		gender: "gender",
		address: "",
	});

	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
	const role = Cookies.get("BIGFARMA_ROLE");

	useEffect(() => {
		const fetchProfileDetails = async () => {
			if (!token) return handleResetForm();

			try {
				let response;
				if (role === "farmer") {
					response = await axios.get(endpoints().users.get_farmer_profile, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});
					const data = response.data;
					const [firstName, lastName] = data.full_name?.split(" ") || ["", ""];

					setFormData({
						firstName,
						lastName,
						email: data.email || "",
						phone: data.phone || "",
						address: data.home_address || "",
						gender: data.gender || "gender",
					});
					setProfileImage(data.profile_picture);
					setImagePreview(data.profile_picture);
				} else if (role === "consumer") {
					response = await axios.get(endpoints().users.get_consumer_profile, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const data = response.data;
					setFormData({
						firstName: data.first_name || "",
						lastName: data.last_name || "",
						email: data.email || "",
						phone: data.phone || "",
						address: data.address || "",
						gender: data.gender || "gender",
					});
					setProfileImage(data.profile_picture);
					setImagePreview(data.profile_picture);
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
				handleResetForm();
			}
		};
		fetchProfileDetails();
	}, [role, token]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImagePreview(imageUrl);
			setProfileImage(file);
		}
	};

	const handleResetForm = () => {
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			gender: "gender",
			address: "",
		});
		setProfileImage(null);
		setImagePreview(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const farmerPayload = {
			full_name: `${formData.firstName} ${formData.lastName}`,
			home_address: formData.address,
			email: formData.email,
			phone: formData.phone,
			profile_picture: profileImage || null,
		};

		const consumerPayload = {
			first_name: formData.firstName,
			last_name: formData.lastName,
			address: formData.address,
			profile_picture: profileImage || null,
			email: formData.email,
			phone: formData.phone,
		};

		try {
			let response;
			if (role === "farmer") {
				response = await axios.put(
					endpoints().users.update_farmer_profile,
					farmerPayload,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} else if (role === "consumer") {
				response = await axios.put(
					endpoints().users.update_consumer_profile,
					consumerPayload,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}

			if (response?.status === 200 || response?.status === 201) {
				toast.success("Changes Saved Successfully");
				setTimeout(() => window.location.reload(), 1200); // reload smoothly after toast
			} else {
				toast.error("Network error. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			if (axiosDefault.isAxiosError(error) && error.response) {
				toast.error(error.response.data?.message || "Profile update failed");
			} else {
				toast.error("Unable to connect to the server");
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
			{/* Sidebar */}
			<div className="w-full md:w-1/3 space-y-3">
				<div className="border rounded-xl p-4 hover:border-green-700 cursor-pointer transition">
					<h3 className="font-semibold text-lg text-gray-800">
						Account Settings
					</h3>
					<p className="text-gray-500 text-sm">
						Details about your personal information
					</p>
				</div>

				<div className="border rounded-xl p-4 hover:border-green-700 cursor-pointer transition">
					<h3 className="font-semibold text-lg text-gray-800">
						Password & Security
					</h3>
					<p className="text-gray-500 text-sm">Change your password anytime</p>
				</div>

				<div className="border rounded-xl p-4 hover:border-green-700 cursor-pointer transition">
					<h3 className="font-semibold text-lg text-gray-800">
						Delete your account
					</h3>
					<p className="text-gray-500 text-sm">
						Find how you can delete your account
					</p>
				</div>
			</div>

			{/* Main Section */}
			<div className="w-full md:w-2/3 space-y-6">
				{/* Upload Section */}
				<div className="flex items-center justify-between border rounded-xl p-4">
					<div className="flex items-center gap-4">
						<img
							src={imagePreview}
							alt="Profile"
							className="w-16 h-16 rounded-full object-cover border"
						/>
						<div>
							<p className="font-semibold text-gray-800">Upload A New Photo</p>
							<p className="text-sm text-gray-500">
								{profileImage?.name || "Profile.pic.jpg"}
							</p>
							<input
								type="file"
								id="fileInput"
								accept="image/*"
								className="hidden"
								onChange={handleImageChange}
							/>
						</div>
					</div>
					<button
						type="button"
						className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition"
						onClick={() => document.getElementById("fileInput").click()}>
						Update
					</button>
				</div>

				{/* Form Section */}
				<div className="border rounded-xl p-6 bg-white shadow-sm">
					<h3 className="font-semibold text-lg text-gray-800 mb-4">
						Change User Information
					</h3>
					<form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
						{/* First Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								First Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
							/>
						</div>

						{/* Last Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Last Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
							/>
						</div>

						{/* Phone */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Phone Number <span className="text-red-500">*</span>
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
							/>
						</div>

						{/* Gender */}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Gender
							</label>
							<select
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none">
								<option value="gender">Select Gender</option>
								<option>Female</option>
								<option>Male</option>
							</select>
						</div>

						{/* Address */}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								Address
							</label>
							<textarea
								name="address"
								rows="3"
								value={formData.address}
								onChange={handleChange}
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"></textarea>
						</div>

						{/* Buttons */}
						<div className="flex justify-end gap-3 md:col-span-2 mt-2">
							<button
								type="button"
								className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition"
								onClick={handleResetForm}>
								Discard Changes
							</button>
							<button
								type="submit"
								className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
