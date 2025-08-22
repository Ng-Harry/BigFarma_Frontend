"use client";

import { cn } from "@/lib/utils";
import brandLogo from "../../assets/images/brand-logo.png";

import {
  LayoutDashboard,
  Store,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowLeftRight,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Marketplace", icon: Store, active: false },
  { name: "Group Buy", icon: Users, active: false },
  { name: "My Orders", icon: ShoppingBag, active: false },
  { name: "Investment", icon: TrendingUp, active: false },
  { name: "Transaction", icon: ArrowLeftRight, active: false },
  { name: "Settings", icon: Settings, active: false },
  { name: "Logout", icon: LogOut, active: false },
];

export default function DashboardSidebar({ isOpen, onClose }) {
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="mt-6 px-4">
            <img
              src={brandLogo}
              alt="brand logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 mt-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    item.active
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "text-neutral-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full border-r border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="mt-6 px-4">
            <img
              src={brandLogo}
              alt="brand logo"
              className="h-10 w-auto object-contain"
            />
          </div>
            <button onClick={onClose} className="focus:outline-none focus:ring-0">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-colors",
                    item.active
                      ? "bg-[#C9F4DE] text-[#016130] border border-green-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={onClose}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
