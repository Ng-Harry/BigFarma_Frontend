import Success from "../../../assets/icons/success.svg";
import { useNavigate } from "react-router-dom";


const SuccessModal = ({message, isOpen, path}) => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate(path);
    }
    if (!isOpen) return null;
    return (
			<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
				<div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
					<img
						src={Success}
						alt="Success"
						className="w-12 h-12 md:w-30 md:h-30 mx-auto"
					/>
					<div className="text-center mt-6">
						<span className="text-[32px] font-bold leading-tight">
							Successful
						</span>
						<p className="text-[12px] font-normal pt-5">{message}</p>
					</div>
					<button
						onClick={goHome}
						className="px-18 py-3 rounded-lg mt-8 font-normal text-[22px] bg-[#016130] text-white hover:bg-[#003F1F] cursor-pointer transition-all duration-300">
						Continue
					</button>
				</div>
			</div>
		);
}

export default SuccessModal;