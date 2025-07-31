import React from "react"

const base =
  "inline-flex items-center justify-center gap-[3px] rounded-[8px] py-3 opacity-100 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rotate-0"

const variants = {
  default: "bg-[#016130] text-white hover:bg-[#016130]/80",
  ghost: "bg-transparent text-gray-700 hover:text-gray-900",
  link: "bg-transparent text-orange-500 hover:text-orange-600 underline p-0 h-auto",
}

export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${base} ${variants[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
