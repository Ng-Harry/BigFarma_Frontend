import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/shared";

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem("bigfarma-order");
    if (!savedOrder) {
      navigate("/marketplace");
      return;
    }

    try {
      const order = JSON.parse(savedOrder);
      setOrderData(order);
      const timer = setTimeout(() => {
        localStorage.removeItem("bigfarma-order");
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error parsing order data:", error);
      navigate("/marketplace");
    }
  }, [navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const deliveryText = orderData.customerInfo.deliveryOption === "door-delivery" ? "Door delivery" : "Pickup";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-light text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed</h1>
            <p className="text-gray-600">
              Thank you {orderData.customerInfo.firstName}, Your produce will be delivered soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{orderData.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total paid</p>
                <p className="font-semibold">₦{orderData.totals.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Delivery</p>
                <p className="font-semibold">{deliveryText}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold capitalize">{orderData.customerInfo.paymentOption}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-3">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium capitalize">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.cartQuantity} {item.quantity?.split(" ").slice(1).join(" ") || "units"}
                    </p>
                  </div>
                  <p className="font-semibold">₦{(item.price * item.cartQuantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{orderData.totals.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₦{orderData.totals.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₦{orderData.totals.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₦{orderData.totals.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-4">Delivery Information</h3>
            <div className="space-y-2">
              <p>
                <span className="text-gray-600">Name:</span> {orderData.customerInfo.firstName}{" "}
                {orderData.customerInfo.lastName}
              </p>
              <p>
                <span className="text-gray-600">Phone:</span> +234{orderData.customerInfo.phoneNumber}
              </p>
              {orderData.customerInfo.email && (
                <p>
                  <span className="text-gray-600">Email:</span> {orderData.customerInfo.email}
                </p>
              )}
              <p>
                <span className="text-gray-600">Address:</span> {orderData.customerInfo.address}
              </p>
              <p>
                <span className="text-gray-600">Delivery Method:</span> {deliveryText}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link to="/marketplace">
            <Button className=" px-8 py-3 rounded-md">
              Back To Market
            </Button>
          </Link>

          {/* Additional Info */}
          <div className="mt-6 text-sm text-gray-600">
            <p>You will receive SMS updates about your order status.</p>
            <p className="mt-1">Expected delivery: 2-5 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}