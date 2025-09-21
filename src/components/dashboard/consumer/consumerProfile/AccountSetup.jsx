import React, { useState, useRef } from "react";
import { countries } from "../../../../lib/countries";
import Dropdown from "@/components/shared/Dropdown";
import joy from "/src/assets/images/review-joy.jpg";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { endpoints } from "../../../config/endpoints";
import { axios } from "../../../../lib/axios";
import axiosDefault from "axios";

export default function AccountSetup({ onSkip, onNext }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });

  // Profile image state
  const [profileImage, setProfileImage] = useState(joy);
  const fileInputRef = useRef(null);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Country selection
  const updateCountry = (country) => {
    setDropdownOpen(false);
    setForm((prev) => ({ ...prev, country }));
  };

  const handleDropdownToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDropdownOpen((prev) => !prev);
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Opens the hidden file input
  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.firstName && form.lastName && form.phone && form.email) {
      const dataToSend = new FormData();
      dataToSend.append("first_name", form.firstName);
      dataToSend.append("last_name", form.lastName);
      dataToSend.append("address", form.address);
      dataToSend.append("email", form.email);
      dataToSend.append("phone", form.phone);
      if (fileInputRef.current?.files[0]) {
      dataToSend.append("profile_picture", fileInputRef.current.files[0]);
      }else {
        dataToSend.append("profile_picture", null);
      }
      dataToSend.append("crop_preferences", "string");

    
      try {
              const res = await axios.post(
                endpoints().users.create_consumer_profile,
                dataToSend,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("BIGFARMA_ACCESS_TOKEN")}`,
                  },
                }
              );
              const data = await res.data;
            
              if (res.status === 200 || res.status === 201) {
                toast.success(data.message || 'Saved successfully!');
                onNext(data);
              } else {
                toast.error(data.message || 'Network error. Please try again.');
              }
            } catch (error) {
              console.error("Error:", error);
              if (axiosDefault.isAxiosError(error) && error.response) {
                return {
                  isSuccess: false,
                  statusCode: error.response.status.toString(),
                  message:
                    (error.response.data &&
                      (error.response.data.detail || error.response.data.message)) ||
                    "Profile setup failed",
                  data: null,
                };
              }
              return {
                isSuccess: false,
                statusCode: "500",
                message: "unable to connect to the server",
                data: null,
              };
            }
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg w-full flex items-center justify-center">
        <div>
          <div className="mb-4">
            <img
              src={profileImage}
              alt="avatar"
              className="w-28 h-28 rounded-full mx-auto mb-2 object-cover border-4 border-gray-300"
            />
            <p
              className="text-green-600 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit} className="text-left space-y-4">
            {/* Name section */}
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="flex gap-1">
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First Name
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  required
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  required
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Email and phone number */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex gap-2">
                  <Dropdown
                    countries={countries}
                    onSelect={updateCountry}
                    isOpen={dropdownOpen}
                    onToggle={handleDropdownToggle}
                  />
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="08022222222"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Gender selection */}
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <div className="flex space-x-4">
                <label className="flex items-center w-[35%] border border-gray-200 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-green-600">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="accent-green-700 mr-2"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center w-[35%] border border-gray-200 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-green-600">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="accent-green-700 mr-2"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Address section */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Example Street, Ikeja, Lagos."
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-center items-center gap-6 pt-2">
              <button
                type="button"
                className="text-green-600 font-medium"
                onClick={onSkip}
              >
                Skip
              </button>
              <button
                type="submit"
                className="bg-[#DDD5DD] text-black hover:text-white hover:bg-[#003F1F] px-6 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
