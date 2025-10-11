import React from "react";

const DeleteAccount = () => {
	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete your account?")) {
			// Call your delete account API here
			alert("Your account has been scheduled for deletion.");
		}
	};

	return (
		<div className="w-full md:w-2/3 bg-white rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] p-6 space-y-4">
			<h2 className="text-lg font-semibold text-gray-800">
				Delete Your Account
			</h2>
			<p className="text-gray-600 text-sm">
				You’re about to start the process of deactivating your BigFarma account
				and your public profile will no longer be available on BigFarma.com
			</p>

			<div className="space-y-3">
				<div className="border rounded-lg p-3 text-gray-700 text-sm">
					You can restore your BigFarma account if it was accidentally
					wrongfully deactivated for up to 30 days after deactivation
				</div>

				<div className="border rounded-lg p-3 text-gray-700 text-sm">
					If you just want to change your name, you don’t need to deactivate
					your account, edit it in your{" "}
					<a href="/settings" className="text-green-700 font-medium underline">
						settings
					</a>
				</div>
			</div>

			<button
				onClick={handleDelete}
				className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition font-medium">
				Delete Account
			</button>
		</div>
	);
};

export default DeleteAccount;
