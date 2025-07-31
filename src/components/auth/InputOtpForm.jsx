"use client"

import { useState } from "react"
import { ChevronLeft, Check } from "lucide-react"
import Button from "@/components/shared/Button"
import OtpInput from "@/components/shared/OtpInput"
import { useNavigate } from "react-router-dom"

function InputOtpForm () {
  const [value, setValue] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const navigate = useNavigate()

  const handleVerify = () => {
    if (value.length === 6) setIsSuccess(true)
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setValue("")
    // Simulate async resend
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsResending(false)
    console.log("Resending code...")
  }

  const handleBack = () => {
    navigate("/")
  }

  const handleContinue = () => {
    navigate("/")
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[650px]">
          <div className="space-y-6 p-8 text-center">
            <div className="flex justify-center">
              <div className="w-28 h-28 bg-[#01AE5624] rounded-full flex items-center justify-center border border-[#003F1F]">
                <Check className="w-8 h-8 text-[#003F1F]" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-[32px] font-bold">Successful</h1>
              <p className="">Congratulations your account has been successfully created</p>
            </div>
            <Button
              onClick={handleContinue}
              className="w-[280px] mx-auto"
              variant="default"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center p-4">
      <div className="w-full max-w-[650px]">
        <div className="space-y-8 p-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-1 p-0 h-auto focus:outline-none focus:ring-0"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Button>
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-[32px] font-bold">Enter the verification code</h1>
              <p className="text-lg">
                We sent a reset link to <span className="font-medium">hello@bigfarma.com</span> enter 6 digits code that mentioned in the email
              </p>
            </div>
            <div className="flex justify-between">
              <OtpInput length={6} value={value} onChange={setValue} />
            </div>
            <Button
              onClick={handleVerify}
              className="w-full"
              variant="default"
              disabled={value.length !== 6}
            >
              Verify Code
            </Button>
            <div className="text-center">
              <span className="">{"Haven't gotten code yet? "}</span>
              <button
                variant="link"
                onClick={handleResendCode}
                className="text-[#ffa725] hover:text-[#ffa725] font-medium p-0 h-auto cursor-pointer"
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputOtpForm;