
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChangeEvent, DragEvent } from "react";
import fileIcon from "../../../../assets/icons/fileIcon.png"

const IdentityVerification = ({onNext}) => {
	const [file, setFile] = useState(null);
	const [dragActive, setDragActive] = useState(false);
	
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setFile(e.dataTransfer.files[0]);
			e.dataTransfer.clearData();
		}
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		if (file) {
			alert(`Uploading: ${file.name}`);
			const formDataToSend = new FormData();
			formDataToSend.append("identity_document", file);

			try {
				const response = await fetch("https://bigfarma-backend.onrender.com/api/v1/identity-verification", {
					method: "POST",
					body: formDataToSend,
				});
				const result = await response.json();
				if (response.ok) {
					alert("Identity document uploaded successfully!");
					onNext(result);
				} else {
					alert("Error uploading identity document: " + result.message);
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Network error while uploading identity document.");
			}
		} else {
			alert("Please select a file before uploading.");
		}
	};

	return (
		<div className="fixed inset-0 w-full min-h-screen bg-black/50  z-50 flex items-center justify-center">
			<div className="bg-[#FAFAFA] rounded-xl shadow-lg p-8 w-full max-w-xl">
				{/* Heading */}
				<h2 className="text-3xl font-semibold text-gray-900">
					Identity Verification
				</h2>
				<p className="mt-2 mb-6 font-bold text-black text-[12px]">
					Please upload a valid government-issued ID to confirm your identity.
					This helps us keep our marketplace safe and trustworthy for everyone.
				</p>

				{/* Drag & Drop Area */}
				<div
					className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer transition ${
						dragActive ? "border-green-600 bg-green-50" : "border-gray-300"
					}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}>
					<div className="mb-3">
						<img src={fileIcon} alt="file" />
					</div>

					<p className="font-bold text-black text-[12px]">
						Drag and drop a file here, or{" "}
						<label className="text-black   cursor-pointer">
							<span className="ml-6 px-2 py-[0.2rem] bg-[#DDD5DD] rounded">
								browse
							</span>
							<input
								type="file"
								className="hidden"
								onChange={handleFileChange}
							/>
						</label>
					</p>

					{file && (
						<p className="mt-3 text-green-700 font-medium">
							Selected: {file.name}
						</p>
					)}
				</div>

				{/* Upload Button */}
				<button
					onClick={handleUpload}
					className="w-full bg-green-700 text-white rounded-lg py-3 mt-6 hover:bg-green-800 cursor-pointer transition duration-200">
					Upload ID
				</button>
			</div>
		</div>
	);
};

export default IdentityVerification;
