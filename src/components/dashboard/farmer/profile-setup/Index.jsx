import { useState } from "react";
import AboutFarm from "./AboutFarm";
import BioData from "./BioData";
import VerifyIdentity from "./VerifyIdentity";
import Success from "./Success";
import PendingVerification from "./PendingVerification";


export default function FarmerProfileSetup({ onComplete }) {
	const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
	const handleNext = (data) => {
		setFormData((prev) => ({ ...prev, ...data }));
		setStep((prev) => prev + 1);
	};

	return (
		<>
			{step === 1 && <BioData onNext={handleNext} />}
			{step === 2 && <VerifyIdentity onNext={handleNext} />}
			{step === 3 && <AboutFarm onNext={handleNext} />}
            {step === 4 && <Success onNext={handleNext} />}
            {step === 5 && <PendingVerification onNext={handleNext} />}

			{step > 5 && onComplete(formData)}
		</>
	);
}