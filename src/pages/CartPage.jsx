import { useCart } from "@/hooks";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const deliveryFee = 1500;
  const taxRate = 0.075;
  const tax = subtotal * taxRate;
  const totalPayment = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some fresh produce to get started!</p>
            <Link to="/marketplace">
              <button className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-md">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Cart</h1>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm underline"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-primary">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg capitalize">{item.name}</h3>
                      <p className="text-[var(--color-primary)] font-semibold">₦{item.price}</p>
                      <p className="text-sm text-gray-600">
                        Available: {item.quantity || 'In stock'}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        Category: {item.category}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={item.cartQuantity <= 1}
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.cartQuantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={item.cartQuantity >= (parseInt(item.quantity?.split(" ")[0]) || 999)}
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">₦{(item.price * item.cartQuantity).toLocaleString()}</p>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-light sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Summary</h2>

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

              <div className="mt-6 space-y-3">
                <Link to="/checkout" className="w-full">
                  <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2 rounded-md">
                    Checkout
                  </button>
                </Link>
                <Link to="/marketplace" className="w-full">
                  <button className="w-full bg-transparent border border-gray-300 hover:bg-gray-50 py-2 rounded-md mt-3">
                    Continue Shopping
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