import ResetBioData from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount"
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebar = [
	{
		Title: "Account Settings",
		Description: "Details about your personal information",
		path: "edit-profile",
	},
	{
		Title: "Password & Security",
		Description: "Change your password anytime",
		path: "change-password",
	},
	{
		Title: "Delete your account",
		Description: "Find how you can delete your account",
		path: "delete-account",
	},
];

const AccountSettings = () => {
    const [path, setPath] = useState("edit-profile");

	const handleNavClick = (item) => {
		setPath(item.path);
	};

	const isPathActive = (itemPath) => {
		return itemPath === path;
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
			{/* Sidebar */}
			<div className="w-full md:w-1/3 space-y-3">
				{sidebar.map((data) => {
					const isActive = isPathActive(data.path);
					return (
						<div
							key={data.Title}
							onClick={() => handleNavClick(data)}
							className={cn(
								"rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] bg-white p-4 hover:border-[#016130] cursor-pointer transition",
								isActive ? "border border-[#016130]" : "border-none"
							)}>
							<h3 className="font-semibold text-lg text-gray-800">
								{data.Title}
							</h3>
							<p className="text-gray-500 text-sm">{data.Description}</p>
						</div>
					);
				})}
			</div>

			{/* Main Section */}
			<div>
                {path === "edit-profile" && <ResetBioData />}
                {path === "change-password" && <ChangePassword />}
                {path === "delete-account" && <DeleteAccount />}
            </div>
		</div>
	);
};

export default AccountSettings;
