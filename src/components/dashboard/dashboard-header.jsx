"use client"

import { Search, ShoppingCart, Bell, Menu } from "lucide-react"
import Input from "../shared/Input"
import Avatar from "../../assets/images/JohnDoe-avatar.jpg"
import { useFocus } from "../../hooks"
import Cookies from "js-cookie";

export default function DashboardHeader({ onMenuClick }) {
  const {role } = useFocus()
  // console.log(role)
  
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white border-b border-gray-200 h-20">
      <div className="flex items-center justify-between h-full px-4 lg:px-10">
        <div className="flex items-center gap-4">
          <button className="lg:hidden focus:outline-none focus:ring-0" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-medium text-gray-900">
              Hello, {Cookies.get('BIGFARMA_USERNAME')} <span className="text-red-500">👋</span>
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
        <div className="flex-1 w-xs mx-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"  />
            <Input
              type="text"
              placeholder={role === "farmer" ? "search..." : "search farm produce"}
              className={`pl-8 bg-gray-50 border-gray-200 focus:bg-white ${role === "farmer" ? "placeholder:font-bold placeholder:text-base" : "placeholder:font-normal placeholder:text-base text-[#98A2B3]"}`}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {role === "consumer" && (
            <button className="relative focus:outline-none focus:ring-0">
              <ShoppingCart className="h-5 w-5 text-[#8E8E93] border-none" />
            </button>
          )}
          <button className="relative focus:outline-none focus:ring-0">
            <Bell className="h-5 w-5 text-[#8E8E93]" />
            <span className={`absolute top-0.5 right-0.5 h-2 w-2 ${role === "farmer" ? "bg-[#FFA725]" : "bg-green-500"} rounded-full`}></span>
          </button>

          <div className="flex items-center gap-2 ml-2">
            <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-gray-500 font-bold text-sm">
              <img src={Avatar} alt="Avatar" className="h-full w-full rounded-full object-cover" />
            </div>
            <span className="hidden md:block text-sm font-bold text-gray-900">John Doe</span>
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}
