"use client"

import { Search, ShoppingCart, Bell, Menu } from "lucide-react"
import Input from "../shared/Input"

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white border-b border-gray-200 h-20">
      <div className="flex items-center justify-between h-full px-4 lg:px-10">
        <div className="flex items-center gap-4">
          <button className="lg:hidden focus:outline-none focus:ring-0" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-medium text-gray-900">
              Hello, John Doe <span className="text-yellow-500">👋</span>
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="search farm produce"
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">

          <button className="relative focus:outline-none focus:ring-0">
            <ShoppingCart className="h-5 w-5 text-gray-600 border-none" />
          </button>

          <button className="relative focus:outline-none focus:ring-0">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 ml-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
              JD
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-900">John Doe</span>
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}
