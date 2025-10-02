import { useEffect } from "react";
import Success from "../../../../assets/icons/success.svg";

const SuccessForm = ({ onNext }) => {

	useEffect(() => {
		// Redirect after 3 seconds
		const timer = setTimeout(() => {
			onNext();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [onNext]);

	return (
		<div className="fixed inset-0 w-full min-h-screen bg-black/50  z-50 flex items-center justify-center">
			<div className="flex flex-col items-center justify-center h-auto bg-white p-6 rounded-lg shadow-lg">
				<img
					src={Success}
					alt="Success"
					className="w-15 h-15 md:w-25 md:h-25"
				/>
				<div className="text-center mt-6">
					<span className="text-[32px] font-bold leading-tight">
						Thank You!
					</span>
					<p className="text-[18px] max-w-2xl font-normal pt-5 text-black">
						Your profile has been submitted for verification. We will notify you
						once you are verified.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SuccessForm;
