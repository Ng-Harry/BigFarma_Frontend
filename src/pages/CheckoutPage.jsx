import { useState } from "react";
import { useCart } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/shared/Input";

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    deliveryOption: "door-delivery",
    paymentOption: "flutterwave",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = getCartTotal();
  const deliveryFee = 1500;
  const taxRate = 0.075;
  const tax = subtotal * taxRate;
  const totalPayment = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 11-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.deliveryOption) {
      newErrors.deliveryOption = "Please select a delivery option";
    }

    if (!formData.paymentOption) {
      newErrors.paymentOption = "Please select a payment option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const orderData = {
      orderId: `BF-${Math.floor(Math.random() * 100000)}`,
      items: cartItems,
      customerInfo: formData,
      totals: {
        subtotal,
        deliveryFee,
        tax: Math.round(tax),
        total: Math.round(totalPayment),
      },
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("bigfarma-order", JSON.stringify(orderData));
    navigate("/payment-processing");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="">
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex">
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className={` ${errors.phoneNumber ? "border-red-500" : ""}`}
                        placeholder="8022222222"
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                    placeholder="Enter your full address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* Delivery & Payment Options */}
              <div className="pt-5">
                <h2 className="text-lg font-semibold mb-4">Delivery & Payment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="deliveryOption" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Option
                    </label>
                    <select
                      id="deliveryOption"
                      value={formData.deliveryOption}
                      onChange={(e) => handleInputChange("deliveryOption", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                        errors.deliveryOption ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select delivery option</option>
                      <option value="door-delivery">Door Delivery</option>
                      <option value="pickup">Pickup</option>
                    </select>
                    {errors.deliveryOption && <p className="text-red-500 text-sm mt-1">{errors.deliveryOption}</p>}
                  </div>

                  <div>
                    <label htmlFor="paymentOption" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Option
                    </label>
                    <select
                      id="paymentOption"
                      value={formData.paymentOption}
                      onChange={(e) => handleInputChange("paymentOption", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                        errors.paymentOption ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select payment option</option>
                      <option value="flutterwave">Flutterwave</option>
                      <option value="paystack">Paystack</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </select>
                    {errors.paymentOption && <p className="text-red-500 text-sm mt-1">{errors.paymentOption}</p>}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-sm text-gray-600">
                By placing an order you agree to BigFarma terms and refund policy
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-light sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="capitalize">
                      {item.name} x {item.cartQuantity}
                    </span>
                    <span>₦{(item.price * item.cartQuantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7.5%)</span>
                  <span>₦{Math.round(tax).toLocaleString()}</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total Payment</span>
                <span>₦{Math.round(totalPayment).toLocaleString()}</span>
              </div>

              {/* Action Buttons */}
              <div className=" gap-4 mt-6">
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full mb-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2 rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Checkout"}
                </button>
                <Link to="/cart" className="flex-1">
                  <button
                    type="button"
                    className="w-full bg-transparent border border-gray-300 hover:bg-gray-50 py-2 rounded-md"
                  >
                    Back to cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}