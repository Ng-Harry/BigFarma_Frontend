import { useState } from "react";
import { endpoints } from "../../config/endpoints";
import { axios } from "../../../lib/axios";
import { toast } from "react-toastify";
import axiosDefault from "axios";
import Cookies from "js-cookie";

import DeleteAccountModal from "./DeleteAccountModal";
import SuccessModal from "./Success"



const DeleteAccount = () => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
	 

	const handleDelete = async () => {
		try {
			const response = await axios.delete(endpoints().users.profile,
				{
					headers: {
						Authorization: `Bearer ${token}`
					},
				});
			
			if (response?.status === 200 || response?.status === 201) {
				toast.success("Account Deleted Successfully");
				setIsDeleteModalOpen(false);
				setIsSuccessModalOpen(true);
				
			} else {
				toast.error("Network error. Please try again.");
			}

			
		} catch (error) {
			console.error(`${error}: Could not delete account`);
			if (axiosDefault.isAxiosError(error) && error.response) {
				toast.error(error.response.data?.message || "Account Deletion failed");
			} else {
				toast.error("Unable to connect to the server");
			}
		}
		
	};

	

	return (
		<>
			<div className="w-full md:w-[600px] bg-white rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] p-4 space-y-4">
				<h2 className="text-lg font-semibold text-gray-800">
					Delete Your Account
				</h2>
				<p className="text-gray-600 text-sm">
					You’re about to start the process of deactivating your BigFarma
					account and your public profile will no longer be available on
					BigFarma.com
				</p>

				<div className="space-y-3">
					<div className="border p-3 text-gray-700 text-sm">
						You can restore your BigFarma account if it was accidentally
						wrongfully deactivated for up to 30 days after deactivation
					</div>

					<div className="border p-3 text-gray-700 text-sm">
						If you just want to change your name, you don’t need to deactivate
						your account, edit it in your{" "}
						<a href="/settings" className="text-[#016130] font-medium">
							settings
						</a>
					</div>
				</div>

				<button
					onClick={() => setIsDeleteModalOpen(true)}
					className="w-full bg-[#016130] text-white py-2 rounded-lg hover:bg-[#003F1F] transition font-medium cursor-pointer">
					Delete Account
				</button>
			</div>
			{/* Delete Account Modal */}
			<DeleteAccountModal
				isOpen={isDeleteModalOpen}
				onClose={() => {
					setIsDeleteModalOpen(false);
				}}
				onConfirm={handleDelete}
			/>
			{/* Delete Successful Modal */}
			<SuccessModal
				message={`Congratulations your account has been successfully deleted`}
				isOpen={isSuccessModalOpen}
				path={`/`}
			/>
		</>
	);
};

export default DeleteAccount;
