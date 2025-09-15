import { useState } from "react";
import AccountSetup from "./AccountSetup";
import Welcome from "./Welcome";
import ConsumerPreferences from "./ConsumerPreferences";
import SetupSuccessful from "./SetupSuccessful";

export default function ConsumerProfileSetup({ onComplete }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const handleNext = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };
    const handleSkip = () => setStep((prev) => prev + 1);

    return (
        <>
            {step === 1 && <Welcome onNext={handleNext} />}
            {step === 2 && <AccountSetup onNext={handleNext} onSkip={handleSkip}/>}
            {step === 3 && <ConsumerPreferences onNext={handleNext} />}
            {step === 4 && <SetupSuccessful onNext={handleNext} />}

            {step > 4 && onComplete(formData)}
        </>
    );
}