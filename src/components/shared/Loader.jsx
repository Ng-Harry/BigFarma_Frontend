import { motion } from "framer-motion";

const LoaderSpinner = () => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<motion.div
				className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full"
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
