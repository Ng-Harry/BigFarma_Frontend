import ResetBioData from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const sidebar = [
	{
		Title: "Account Settings",
		Description: "Details about your personal information",
		path: "/settings/edit-profile",
	},
	{
		Title: "Password & Security",
		Description: "Change your password anytime",
		path: "/settings/change-password",
	},
	{
		Title: "Delete your account",
		Description: "Find how you can delete your account",
		path: "/settings/delete-account",
	},
];

export const MainAccountSettings = ({ children }) => {
	return (
		<>
			<div>{children}</div>
		</>
	);
};

const AccountSettings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
	const handleNavClick = (item) => {
		navigate(item.path);
	};

	const isPathActive = (itemPath) => {
		return location.pathname.startsWith(itemPath);
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
                            className={cn("rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] bg-white p-4 hover:border-[#016130] cursor-pointer transition", isActive ? "border-[#016130]" : "border-none")}>
                            
							<h3 className="font-semibold text-lg text-gray-800">
								{data.Title}
							</h3>
							<p className="text-gray-500 text-sm">{data.Description}</p>
						</div>
					);
				})}
			</div>

			{/* Main Section */}
			<MainAccountSettings>
				{/* {children } */}
				<ResetBioData />
				{/* <ChangePassword/> */}
			</MainAccountSettings>
		</div>
	);
};

export default AccountSettings;
