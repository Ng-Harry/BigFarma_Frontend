import Pending from "../../../../assets/icons/pending.png";

const PendingVerification = ({ onNext }) => {

    const handleDashboardRedirect = () => {
        onNext();
        alert("Redirecting to Dashboard...");
    }

    return (
			<div className="fixed inset-0 w-full min-h-screen bg-black/50  z-50 flex items-center justify-center">
				<div className="flex flex-col items-center justify-center h-auto bg-white p-6 rounded-lg shadow-lg">
					<img
						src={Pending}
						alt="Pending"
						className="w-15 h-15 md:w-25 md:h-25"
					/>
					<div className="text-center mt-6">
						<span className="text-[32px] font-bold leading-tight">
							Your account is almost ready!
						</span>
						<p className="text-[18px] max-w-2xl font-normal pt-5 text-black">
							We're verifying your details. Please check your email or SMS for a
							verification message. Once confirmed, you'll be able to add your
							products to the marketplace.
						</p>
					</div>
					<div className="mt-6">
						<button
							className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-200"
							onClick={handleDashboardRedirect}>
							Go to Dashboard
						</button>
					</div>
				</div>
			</div>
		);
};

export default PendingVerification;
