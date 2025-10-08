import React, { useState } from "react";

const AccountSettings = () => {
	const [formData, setFormData] = useState({
		firstName: "John",
		lastName: "Doe",
		email: "John Doe",
		phone: "08022222222",
		gender: "Female",
		address: "123 Example Street, Ikeja, Lagos.",
	});

	const [profileImage, setProfileImage] = useState("/profile.pic.jpg");
	const [imagePreview, setImagePreview] = useState("/profile.pic.jpg");

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

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Changes saved successfully!");
		console.log("Submitted data:", formData);
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
					<p className="text-gray-500 text-sm">
						Change your password at anytime
					</p>
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
								{profileImage.name || "Profile.pic.jpg"}
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
						className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
						onClick={() => document.getElementById("fileInput").click()}>
						Update
					</button>
				</div>

				{/* Form Section */}
				<div className="border rounded-xl p-6 bg-white shadow-sm">
					<h3 className="font-semibold text-lg text-gray-800 mb-4">
						Change User Information here
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
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
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
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
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
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Phone Number <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center gap-2">
								<span className="px-3 py-2 border border-green-700 rounded-lg text-gray-600">
									🇳🇬 +234
								</span>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									className="flex-1 border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Gender
							</label>
							<select
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none">
								<option>Female</option>
								<option>Male</option>
								<option>Other</option>
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
								className="mt-1 block w-full border border-green-700 rounded-lg p-2 focus:ring-green-600 focus:outline-none"></textarea>
						</div>

						<div className="flex justify-end gap-3 md:col-span-2 mt-2">
							<button
								type="button"
								className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition">
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
