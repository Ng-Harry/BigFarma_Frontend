import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { orders } from '../lib/farmerOrder';

const productDetailsMap = {
  123: { name: 'Eggs', price: '₦20,500' },
  124: { name: 'Onions', price: '₦50,000' },
  125: { name: 'Watermelon (Pieces)', price: '₦3000' },
  126: { name: 'Carrot', price: '₦500' },
  127: { name: 'Rice', price: '₦2,500' },
  128: { name: 'Tomatoes', price: '₦250' },
  129: { name: 'Vegetable', price: '₦250' },
  130: { name: 'Cassava', price: '₦250' },
};

const SingleOrderPage = () => {
  const { productId, orderId } = useParams();

  // Find the order
  const order = orders.find(
    (o) => o.productId === productId && o.id.replace('#', '') === orderId
  );

  const productDetails = productDetailsMap[productId];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg mb-4">
            Order not found.
          </p>
          <Link
            to={`/farmer-orders/${productId}`}
            className="text-green-700 hover:text-green-800 font-medium border border-green-800 px-4 scroll-py-1.5 rounded-lg"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Order {order.id}
                  </h1>
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}
                      >
                        {Array.isArray(order.status) ? (
                          <div className="text-center">
                            <div>{order.status[0]}</div>
                            <div>{order.status[1]}</div>
                          </div>
                        ) : (
                          order.status
                        )}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex">
                        <p className="text-gray-600 font-medium">
                          {' '}
                          Buyer: {order.buyer}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-600 font-medium">
                          {' '}
                          Qty: {order.qty}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-400 font-medium">
                          {order.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/farmer-orders/${productId}`}
                  className="text-green-700 hover:text-green-800 font-medium border border-green-800 px-4 scroll-py-1.5 rounded-lg"
                >
                  Back
                </Link>
              </div>

              {/* Divider */}
              <div class="w-full h-[0.2px] bg-gray-400"></div>

              <button className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors mt-8">
                Marked as Shipped
              </button>

              {/* Delivery Policy Card */}
              <div className="p-3 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Delivery and Confirmation Policy
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    Update status when items leave your farm
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    System sends reminder after 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    Auto-complete after 5 days if no issue
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Buyer Contact Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Buyer Contact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900 font-medium text-sm">
                    {order.buyer}
                  </p>
                </div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="text-gray-900 font-medium text-right text-sm">
                    +234 800 555 6666
                  </p>
                </div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-gray-900 font-medium text-right text-sm">
                    Lekki Phase 1, Lagos.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row  gap-3 mt-4">
                <button className="bg-transparent hover:border-green-700 border border-green-800 text-green-800 py-2 px-1 rounded-md text-sm font-medium transition-colors">
                  Message Customer
                </button>
                <button className="bg-green-800 hover:bg-green-700 text-white  py-2 px-1 rounded-md text-sm font-medium transition-colors">
                  Contact Support
                </button>
                {order.status.includes('Delivery Issue') && (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-1 py-2 rounded-md text-sm font-medium transition-colors">
                    Resolve Issue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
