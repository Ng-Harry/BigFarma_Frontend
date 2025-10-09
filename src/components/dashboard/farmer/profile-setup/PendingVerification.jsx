import { useState, useEffect } from "react";
import Pending from "../../../../assets/icons/pending.png";
import LoaderSpinner from "../../../../components/shared/Loader";

const PendingVerification = ({ onNext }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		
		const loaderTimer = setTimeout(() => {
			setLoading(true);
		}, 1500);

		// after loading, redirect
		const redirectTimer = setTimeout(() => {
			onNext();
			setLoading(false);
		}, 3000);

		return () => {
			clearTimeout(loaderTimer);
			clearTimeout(redirectTimer);
		};
	}, [onNext]);

	return (
		<>
			{!loading && (
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
								We're verifying your details. Please check your email or SMS for
								a verification message. Once confirmed, you'll be able to add
								your products to the marketplace.
							</p>
						</div>
					</div>
				</div>
			)}
			{loading && <LoaderSpinner />}
		</>
	);
};

export default PendingVerification;
