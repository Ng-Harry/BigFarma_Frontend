import ResetBioData from "./AccountSettings";
import ChangePassword from "./ChangePassword";

const sidebar = [
	{
		Title: "Account Settings",
		Description: "Details about your personal information",
	},
	{
		Title: "Password & Security",
		Description: "Change your password anytime",
	},
	{
		Title: "Delete your account",
		Description: "Find how you can delete your account",
	},
];

const Main = ({ children }) => {
	return (
		<>
			<div>
				{children}
			</div>
		</>
	);
};

const AccountSettings = () => {
	return (
		<div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
			{/* Sidebar */}
			<div className="w-full md:w-1/3 space-y-3">
				{sidebar.map((data) => {
					return (
						<div
							key={data.Title}
							className="rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.15)] bg-white p-4 hover:border-[#016130] cursor-pointer transition">
							<h3 className="font-semibold text-lg text-gray-800">
								{data.Title}
							</h3>
							<p className="text-gray-500 text-sm">{data.Description}</p>
						</div>
					);
				})}
			</div>

			{/* Main Section */}
			<Main>
                {/* <ResetBioData /> */}
                <ChangePassword/>
			</Main>
		</div>
	);
};

export default AccountSettings;