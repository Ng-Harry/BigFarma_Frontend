import React, { useRef } from "react"

export default function OtpInput({ value, onChange, length = 6, className = "" }) {
  const inputsRef = useRef([])

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "")
    let newValue = value.split("")
    newValue[idx] = val
    newValue = newValue.join("").slice(0, length)
    onChange(newValue)
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  return (
    <div className={`flex gap-2 md:gap-6 justify-center ${className}`}>
      {[...Array(length)].map((_, i) => (
        <input
          key={i}
          ref={el => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          className="w-12 h-12 text-lg border-2 border-[#DDD5DD] rounded-lg text-center focus:border-[#016130] focus:outline-none"
        />
      ))}
    </div>
  )
}
