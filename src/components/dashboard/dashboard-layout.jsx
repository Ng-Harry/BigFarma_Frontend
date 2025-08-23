"use client"

import { useState } from "react"
import DashboardHeader from "./dashboard-header"
import DashboardSidebar from "./dashboard-sidebar"

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent bg-opacity-50 backdrop-blur-sm transition-all duration-200 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-h-screen pt-28 p-10">{children}</main>
      </div>
    </div>
  )
}
