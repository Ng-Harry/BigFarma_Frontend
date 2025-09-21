import { preferences as preferenceOptions } from "../../../../lib/consumerPreference";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { axios } from "../../../../lib/axios";
import Cookies from "js-cookie";
import { endpoints } from "../../../config/endpoints";
import axiosDefault from "axios";

const ConsumerPreferences = ({ onNext }) => {
	const [selectedPreferences, setSelectedPreferences] = useState([]);

	const togglePreference = (id) => {
		setSelectedPreferences((prev) =>
			prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
		);
	};

	const handlePreferenceSubmit = async () => {
    try {
      const preferencesToSend = selectedPreferences.map(
				(id) => preferenceOptions.find((p) => p.id === id)?.label
			);

			const res = await axios.put(
				endpoints().users.update_consumer_profile,
				{ crop_preferences: preferencesToSend },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("BIGFARMA_ACCESS_TOKEN")}`,
					},
				}
			);
			const data = await res.data;
			if (res.status === 200 || res.status === 201) {
				toast.success(data.message || "Saved successfully!");
				onNext(data);
			} else {
				toast.error(data.message || "Network error. Please try again.");
			}
		} catch (error) {
      console.error("Error updating preferences:", error);
      if (axiosDefault.isAxiosError(error) && error.response) {
				return {
					isSuccess: false,
					statusCode: error.response.status.toString(),
					message:
						(error.response.data &&
							(error.response.data.detail || error.response.data.message)) ||
						"Profile setup failed",
					data: null,
				};
			}
			return {
				isSuccess: false,
				statusCode: "500",
				message: "unable to connect to the server",
				data: null,
			};
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
			<div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
				<h2 className="text-xl font-semibold mb-6">
					Choose your favorite product categories
				</h2>
				<div className="grid grid-cols-2 gap-4 mb-6">
					{preferenceOptions.map((cat) => (
						<button
							key={cat.id}
							type="button"
							onClick={() => togglePreference(cat.id)}
							className={`border rounded-lg p-4 flex items-center justify-center space-x-2 transition ${
								selectedPreferences.includes(cat.id)
									? "bg-green-100 border-green-600"
									: "bg-white hover:border-gray-400"
							}`}>
							<img src={cat.profileImage} alt={cat.label} />
							<span>{cat.label}</span>
						</button>
					))}
				</div>
				<button
					onClick={handlePreferenceSubmit}
					className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
					Continue
				</button>
			</div>
		</div>
	);
};

export default ConsumerPreferences;
