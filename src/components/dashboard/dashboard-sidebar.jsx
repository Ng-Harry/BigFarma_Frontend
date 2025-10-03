'use client';

import { cn } from '@/lib/utils';
import brandLogo from '../../assets/images/brand-logo.png';
import Cookies from 'js-cookie';

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
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Marketplace', icon: Store, path: '/marketplace' },
  { name: 'Group Buy', icon: Users, path: '/group-buy' },
  { name: 'My Orders', icon: ShoppingBag, path: '/orders' },
  { name: 'Investment', icon: TrendingUp, path: '/investment' },
  { name: 'Transaction', icon: ArrowLeftRight, path: '/transactions' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Logout', icon: LogOut, path: '/sign-in' },
];

export default function DashboardSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get('BIGFARMA_ACCESS_TOKEN');

  const handleNavClick = (item) => {
    if (item.name === 'Logout') {
      navigate('/sign-in');
    } else if (item.name === 'My Orders') {
      const userRole = Cookies.get('BIGFARMA_ROLE');
      const ordersPath = userRole === 'farmer' ? '/farmer-orders' : '/orders';
      navigate(ordersPath);
    } else {
      navigate(item.path);
    }
  };

  const isPathActive = (itemPath) => {
    if (!itemPath || itemPath === '/sign-in') return false;

    // Special handling for "My Orders" - both consumer and farmer order paths
    if (itemPath === '/orders') {
      return (
        location.pathname.startsWith('/orders') ||
        location.pathname.startsWith('/farmer-orders')
      );
    }

    // Default behavior for all other paths
    return location.pathname.startsWith(itemPath);
  };

  return (
    <>
      {/* Desktop sidebar */}
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
              const isActive = isPathActive(item.path);
              return (
                <button
                  key={item.name}
                  className={cn(
                    'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'text-neutral-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
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
            <button
              onClick={onClose}
              className="focus:outline-none focus:ring-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isPathActive(item.path);
              return (
                <button
                  key={item.name}
                  className={cn(
                    'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#C9F4DE] text-[#016130] border border-green-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => {
                    onClose?.();
                    handleNavClick(item);
                  }}
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
