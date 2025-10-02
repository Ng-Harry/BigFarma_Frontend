import React, { useState } from "react";
import fileIcon from "../../../../assets/icons/fileIcon.png";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { endpoints } from "../../../config/endpoints";
import { axios } from "../../../../lib/axios";
import axiosDefault from "axios";

const AboutFarm = ({ onNext }) => {
	const [formData, setFormData] = useState({
		farmName: "",
		location: "",
		size: "",
		farmType: "",
		experience: "",
		images: [],
	});

	const [imagePreviews, setImagePreviews] = useState([]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileUpload = (e) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			setFormData((prev) => ({
				...prev,
				images: [...prev.images, ...files],
			}));

			const previews = files.map((file) => URL.createObjectURL(file));
			setImagePreviews((prev) => [...prev, ...previews]);
		}
	};

	const removeImage = (index) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
		setImagePreviews((prev) => prev.filter((_, i) => i !== index));
	};

	// helper to convert file → base64
	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			formData.farmName &&
			formData.location &&
			formData.size &&
			formData.farmType &&
			formData.experience
		) {
			// Convert first image to base64 (if exists)
			let farmImageBase64 = null;
			if (formData.images.length > 0) {
				const file = formData.images[0];
				farmImageBase64 = await toBase64(file);
			}

			const payload = {
				farm_name: formData.farmName,
				farm_location: formData.location,
				farm_type: formData.farmType,
				farm_size: formData.size,
				years_experience: formData.experience,
				farm_image: farmImageBase64, // string | null
			};

			try {
				const res = await axios.put(
					endpoints().users.update_farmer_profile,
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
			<div className="max-w-2xl mx-auto bg-white p-8 mt-30 shadow-md rounded-lg overflow-y-scroll max-h-[90vh] w-full">
				<h2 className="text-2xl font-bold mb-2">Tell us about your farm</h2>
				<p className="text-gray-600 mb-6">
					Share a few details so buyers know more about where their produce
					comes from. The more accurate your farm profile, the better your
					visibility.
				</p>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Farm Name */}
					<div>
						<input
							type="text"
							name="farmName"
							placeholder="John Doe"
							value={formData.farmName}
							onChange={handleInputChange}
							className="w-full border rounded-lg px-4 py-2"
						/>
					</div>
					{/* Location */}
					<div>
						<input
							type="text"
							name="location"
							placeholder="Lagos, Nigeria"
							value={formData.location}
							onChange={handleInputChange}
							className="w-full border rounded-lg px-4 py-2"
						/>
					</div>
					{/* Size and Farm Type */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:space-x-4">
						<div className="flex">
							<input
								type="text"
								name="size"
								placeholder="How big is your farm?"
								value={formData.size}
								onChange={handleInputChange}
								className="flex-grow border rounded-l-lg px-4 py-2 w-45"
							/>
							<span className="border rounded-r-lg px-0 py-2 bg-gray-100 text-gray-600 ">
								<select name="sizeUnit" id="sizeUnit">
									<option value="sqm">sqm</option>
									<option value="hectares">hectares</option>
									<option value="acres">acres</option>
								</select>
							</span>
						</div>
						<div>
							<select
								name="farmType"
								value={formData.farmType}
								onChange={handleInputChange}
								className="w-full border rounded-lg px-4 py-2 text-gray-600">
								<option value="">What kind of farm do you run?</option>
								<option value="crop">Crop Farm</option>
							</select>
						</div>
					</div>
					{/* Years of Experience */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<input
								type="text"
								name="location"
								placeholder="Lagos, Nigeria"
								value={formData.location}
								onChange={handleInputChange}
								className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
							/>
						</div>
						<div>
							<input
								type="number"
								name="experience"
								placeholder="e.g, 5"
								value={formData.experience}
								onChange={handleInputChange}
								className="w-full border rounded-lg px-4 py-2"
							/>
						</div>
					</div>
					{/* Upload Images */}
					<div>
						<label className="block text-gray-700 mb-2">
							Upload a photo so buyers can see where your produce grows
						</label>
						<div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500">
							<input
								type="file"
								multiple
								onChange={handleFileUpload}
								className="hidden"
								id="fileUpload"
							/>
							<label
								htmlFor="fileUpload"
								className="cursor-pointer flex flex-col items-center">
								<div className="mb-3">
									<img src={fileIcon} alt="file" />
								</div>
								Drag and drop a file here, or{" "}
								<span className="ml-6 px-2 py-[0.2rem] bg-[#DDD5DD] rounded">
									browse
								</span>
							</label>
						</div>
					</div>
					{/* Image Previews */}
					{imagePreviews.length > 0 && (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
							{imagePreviews.map((src, index) => (
								<div key={index} className="relative">
									<img
										src={src}
										alt={`Farm.Image.${index + 1}`}
										className="w-full h-32 object-cover rounded-lg"
									/>
									<button
										type="button"
										onClick={() => removeImage(index)}
										className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow">
										✕
									</button>
									<p className="text-xs text-gray-600 mt-1">
										Farm.Image.{index + 1}
									</p>
								</div>
							))}
						</div>
					)}
					{/* Submit */}
					<button
						type="submit"
						className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-green-900 transition duration-200">
						Save Farm Details
					</button>
				</form>
			</div>
		</div>
	);
};

export default AboutFarm;
