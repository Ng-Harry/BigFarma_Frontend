import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { endpoints } from "../../config/endpoints";
import { axios } from "../../../lib/axios";
import { toast } from "react-toastify";
import axiosDefault from "axios";
import LoadingSkeleton from "../../shared/LoadingSkeleton";

const ResetBioData = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		gender: "gender",
		address: "",
	});

	const [profileImage, setProfileImage] = useState(""); // will store base64 string
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(true);

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
					setProfileImage(data.profile_picture || "");
					setImagePreview(data.profile_picture || "");
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
					setProfileImage(data.profile_picture || "");
					setImagePreview(data.profile_picture || "");
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
				handleResetForm();
			} finally {
				setLoading(false);
			}
		};

		fetchProfileDetails();
	}, [role, token]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// ✅ Convert uploaded image to Base64
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			toast.error("Please upload a valid image file.");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			const base64String = reader.result; // backend expects string
			setProfileImage(base64String);
			setImagePreview(base64String);
		};
		reader.readAsDataURL(file);
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
		setProfileImage("");
		setImagePreview("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const farmerPayload = {
			full_name: `${formData.firstName} ${formData.lastName}`,
			home_address: formData.address,
			email: formData.email,
			phone: formData.phone,
			profile_picture: profileImage || null, // base64 string
		};

		const consumerPayload = {
			first_name: formData.firstName,
			last_name: formData.lastName,
			address: formData.address,
			profile_picture: profileImage || null, // base64 string
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
				setTimeout(() => window.location.reload(), 1200);
				handleResetForm();
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

	// Loader Skeleton
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="flex flex-col items-center">
					<div className="w-12 h-12 border-4 border-[#016130] border-t-transparent rounded-full animate-spin"></div>
					<p className="mt-3 text-green-700 font-medium">
						<LoadingSkeleton />
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Main Section */}
			<div className="w-full md:w-full space-y-3">
				{/* Upload Section */}
				<div className="flex items-center justify-between rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] p-4 bg-white">
					<div className="flex items-center gap-4">
						<img
							src={
								imagePreview ||
								"https://cdn-icons-png.flaticon.com/512/847/847969.png"
							}
							alt="Profile"
							className="w-16 h-16 rounded-full object-cover border"
						/>
						<div>
							<p className="font-semibold text-gray-800">Upload A New Photo</p>
							<p className="text-sm text-gray-500">
								{profileImage ? "Selected Image" : "Profile.pic.jpg"}
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
						className="border border-[#016130] text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition cursor-pointer"
						onClick={() => document.getElementById("fileInput").click()}>
						Update
					</button>
				</div>

				{/* Form Section */}
				<div className="rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] bg-white p-6">
					<h3 className="font-semibold text-lg text-gray-800 mb-4">
						Change User Information
					</h3>
					<form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								First Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className="mt-1 block w-full border border-[#016130] rounded-lg p-2 focus:ring-[#003F1F] focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Last Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className="mt-1 block w-full border border-[#016130] rounded-lg p-2 focus:ring-[#003F1F] focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full border border-[#016130] rounded-lg p-2 focus:ring-[#003F1F] focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Phone Number <span className="text-red-500">*</span>
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="w-full border border-[#016130] rounded-lg p-2 focus:ring-[#003F1F] focus:outline-none"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								Gender
							</label>
							<select
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								className="mt-1 block w-full border border-[#016130] rounded-lg p-2 focus:ring-[#003F1F] focus:outline-none">
								<option value="gender">Select Gender</option>
								<option>Female</option>
								<option>Male</option>
							</select>
						</div>

						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700">
								Address
							</label>
							<textarea
								name="address"
								rows="3"
								value={formData.address}
								onChange={handleChange}
								className="mt-1 block w-full border border-[#016130] rounded-lg p-2 focus:ring-[#003F1F] focus:outline-none"></textarea>
						</div>

						<div className="flex gap-4 md:col-span-2 mt-2">
							<button
								type="button"
								className="border border-[#016130] text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition cursor-pointer block w-full"
								onClick={handleResetForm}>
								Discard Changes
							</button>
							<button
								type="submit"
								className="bg-[#016130] text-white px-4 py-2 rounded-lg hover:bg-[#003F1F] transition cursor-pointer block w-full">
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ResetBioData;
