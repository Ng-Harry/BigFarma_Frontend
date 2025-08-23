"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/shared/Button";

export function RoleSelectionForm() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("selectedRole", selectedRole);
      navigate("/sign-up");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto md:p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-2">
          Welcome to BigFarma
        </h1>
        <p className="text-custom-color text-lg w-full md:max-w-lg mx-auto">
          Before we proceed, tell us who you are. This helps us personalize your
          experience
        </p>
      </div>

      <div className="flex flex-col md:flex-row  justify-between gap-6 mb-12 w-full">
        {/* Farmer Card */}
        <div
          className={`relative cursor-pointer transition-all duration-200 w-full md:w-1/2 h-[350px] pt-8 ${
            selectedRole === "farmer"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-white"
          }`}
          onClick={() => handleRoleSelect("farmer")}
        >
          <div className="p-6 flex flex-col justify-center">
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 rounded-full border border-[var(--color-primary)] bg-white"></div>
            </div>
            <div className="mb-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center drop-shadow-xl `}
              >
                <img
                  src="/src/assets/svgs/farmer.svg"
                  alt="Farmer Icon"
                  className={`w-12 h-12 ${
                    selectedRole === "farmer" ? "text-white" : "text-white"
                  }`}
                />
              </div>
            </div>

            <h3
              className={`text-3xl font-semibold mb-3 ${
                selectedRole === "farmer"
                  ? "text-white"
                  : "text-[var(--color-primary)]"
              }`}
            >
              I'm a Farmer
            </h3>
            <p
              className={`text-base ${
                selectedRole === "farmer"
                  ? "text-green-100"
                  : "text-[var(--color-primary)]"
              }`}
            >
              I want to list and manage my farm products
            </p>
          </div>
        </div>

        {/* Consumer Card */}
        <div
          className={`relative cursor-pointer transition-all duration-200 w-full md:w-1/2 h-[350px] pt-8 ${
            selectedRole === "consumer"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-white"
          }`}
          onClick={() => handleRoleSelect("consumer")}
        >
          <div className="p-6 flex flex-col justify-center">
            {/* Radio button indicator */}
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 rounded-full border border-[var(--color-primary)] bg-white"></div>
            </div>

            <div className="mb-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center drop-shadow-xl `}
              >
                <img
                  src={
                    selectedRole === "consumer"
                      ? "/src/assets/svgs/light-cart.svg"
                      : "/src/assets/svgs/cart.svg"
                  }
                  alt="Consumer Icon"
                  className="w-12 h-12"
                />
              </div>
            </div>

            <h3
              className={`text-3xl font-semibold mb-3 ${
                selectedRole === "consumer"
                  ? "text-white"
                  : "text-[var(--color-primary)]"
              }`}
            >
              I'm a Consumer
            </h3>
            <p
              className={`text-base ${
                selectedRole === "consumer" ? "text-green-100" : "text-gray-600"
              }`}
            >
              I want to explore and purchase farm produce
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-[200px] py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
            selectedRole
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
