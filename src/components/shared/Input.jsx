import React from "react"

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-[#01ae56] ${className}`}
      {...props}
    />
  )
}
