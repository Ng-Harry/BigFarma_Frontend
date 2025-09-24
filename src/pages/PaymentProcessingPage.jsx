import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks";

export default function PaymentProcessingPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const orderData = localStorage.getItem("bigfarma-order");
    if (!orderData) {
      navigate("/cart");
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearCart();
          navigate("/order-confirmation");
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [navigate, clearCart]);

  return (
    <div className=" flex items-center justify-center p-4 mt-32">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-neutral-light text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Redirecting to Flutterwave</h1>
            <p className="text-gray-600 mt-2">Please do not close this window. Processing Payment...</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-500">Connecting to secure payment gateway...</p>
        </div>
      </div>
    </div>
  );
}