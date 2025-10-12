import React from "react";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null; // hide modal when not open

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-full  md:w-[500px] space-y-3 px-10 py-20 text-center">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">
					Are you sure you want to delete your account?
				</h2>

				<div className="flex justify-between gap-2 mt-6">
					<button
						onClick={onClose}
						className="px-12 py-2 border border-[#016130] text-[#016130] rounded-md hover:bg-[#003F1F] transition">
						No, Go Back
					</button>

					<button
						onClick={onConfirm}
						className="px-12 py-2 bg-[#016130] text-white rounded-md hover:bg-[#003F1F] transition">
						Delete Account
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAccountModal;
