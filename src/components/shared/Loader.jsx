import { motion } from "framer-motion";

const LoaderSpinner = () => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<motion.div
				className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 border-4 border-gray-300 border-t-[#01ae56] rounded-full"
				animate={{ rotate: 360 }}
				transition={{
					repeat: Infinity,
					ease: "linear",
					duration: 1,
				}}
			/>
		</div>
	);
};

export default LoaderSpinner;
