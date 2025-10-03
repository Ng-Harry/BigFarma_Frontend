'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Bell, Menu } from 'lucide-react';
import Input from '../shared/Input';
import Avatar from '../../assets/images/JohnDoe-avatar.jpg';
import { useCart } from '../../hooks';
import Cookies from 'js-cookie';
import { endpoints } from '../config/endpoints';
import { axios } from '../../lib/axios';
import { Link } from 'react-router-dom';

export default function DashboardHeader({ onMenuClick }) {
  const role = Cookies.get('BIGFARMA_ROLE');
  const { getCartCount } = useCart();
  const [profile, setProfile] = useState(null);
  const token = Cookies.get('BIGFARMA_ACCESS_TOKEN');

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          let response;
          if (role === 'farmer') {
            response = await axios.get(endpoints().users.get_farmer_profile, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data;
            setProfile(data);
          } else if (role === 'consumer') {
            response = await axios.get(endpoints().users.get_consumer_profile, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data;
            setProfile(data);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [role, token, setProfile]);

  console.log('Header profile:', profile?.first_name, profile?.full_name);
  console.log('Header profile2:', profile);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white border-b border-gray-200 h-20">
        <div className="flex items-center justify-between h-full px-4 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden focus:outline-none focus:ring-0"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden sm:block">
              <h1 className="text-lg font-medium text-gray-900">
                Hello, {profile?.full_name || profile?.first_name || 'Hi User'}{' '}
                <span className="text-red-500">👋</span>
              </h1>
              {role && (
                <p className="text-sm text-gray-600 capitalize">
                  {role === 'farmer' ? '🌱 Farmer' : '🛒 Consumer'}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="flex-1 w-xs mx-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={
                    role === 'farmer' ? 'search...' : 'search farm produce'
                  }
                  className={`pl-8 bg-gray-50 border-gray-200 focus:bg-white ${
                    role === 'farmer'
                      ? 'placeholder:font-bold placeholder:text-base'
                      : 'placeholder:font-normal placeholder:text-base text-[#98A2B3]'
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {role === 'consumer' && (
                <Link
                  to="/cart"
                  className="relative focus:outline-none focus:ring-0"
                >
                  <ShoppingCart className="h-5 w-5 text-[#8E8E93] border-none" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              )}
              <button className="relative focus:outline-none focus:ring-0">
                <Bell className="h-5 w-5 text-[#8E8E93]" />
                <span
                  className={`absolute top-0.5 right-0.5 h-2 w-2 ${
                    role === 'farmer' ? 'bg-[#FFA725]' : 'bg-green-500'
                  } rounded-full`}
                ></span>
              </button>

              <div className="flex items-center gap-2 ml-2">
                <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-gray-500 font-bold text-sm">
                  <img
                    src={profile?.profile_picture || Avatar}
                    alt="Avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>

                <div className="hidden md:block">
                  <span className="text-sm font-bold text-gray-900 block">
                    {profile?.full_name || profile?.first_name || 'Hi User'}
                  </span>
                  {role && (
                    <span className="text-xs text-gray-500 capitalize">
                      {role === 'farmer' ? 'Farmer' : 'Consumer'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
