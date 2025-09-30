import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { orders } from '../lib/farmerOrder';
import eggs from '../assets/ProductImages/categories/Egg image.png';
import onions from '../assets/ProductImages/onions.png';
import carrot from '../assets/ProductImages/categories/Carrot image.png';
import rice from '../assets/ProductImages/Rice.png';
import tomatoes from '../assets/ProductImages/tomatoes.png';
import vegetable from '../assets/ProductImages/categories/vegetables.png';
import cassava from '../assets/ProductImages/cassava.png';

const productDetailsMap = {
  123: {
    name: 'Eggs',
    status: 'Active',
    stock: 100,
    price: '₦20,500',
    image: eggs,
  },
  124: {
    name: 'Onions',
    status: 'Active',
    stock: 50,
    price: '₦50,000',
    image: onions,
  },
  125: {
    name: 'Watermelon (Pieces)',
    status: 'Active',
    stock: 100,
    price: '₦3000',
    image: '../assets/ProductImages/watermelon.png',
  },
  126: {
    name: 'Carrot',
    status: 'Draft',
    stock: 0,
    price: '₦500',
    image: carrot,
  },
  127: {
    name: 'Rice',
    status: 'Out of stock',
    stock: 0,
    price: '₦2,500',
    image: rice,
  },
  128: {
    name: 'Tomatoes',
    status: 'Active',
    stock: 250,
    price: '₦250',
    image: tomatoes,
  },
  129: {
    name: 'Vegetable',
    status: 'Out of stock',
    stock: 0,
    price: '₦250',
    image: vegetable,
  },
  130: {
    name: 'Cassava',
    status: 'Draft',
    stock: 0,
    price: '₦250',
    image: cassava,
  },
};

const ProductOrdersPage = () => {
  const { productId } = useParams();
  const productDetails = productDetailsMap[productId];

  // Filter orders for this product
  const productOrders = orders.filter((order) => order.productId === productId);

  if (!productDetails) {
    return (
      <div className="p-6">
        <p className="text-red-600">Product not found.</p>
        <Link
          to="/farmer-orders"
          className="text-green-600 underline mt-2 inline-block"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header with Back Button */}

            {/* Product Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {productDetails.image && (
                    <img
                      src={productDetails.image}
                      alt={productDetails.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {productDetails.name}
                    </h1>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          productDetails.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : productDetails.status === 'Draft'
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {productDetails.status}
                      </span>
                      <span className="text-sm text-gray-600">
                        {productDetails.stock} in stock
                      </span>
                      <span className="text-sm text-gray-600">·</span>
                      <span className="text-sm font-medium text-gray-900">
                        {productDetails.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center"></div>
                  </div>
                </div>
                <Link
                  to="/farmer-orders"
                  className="flex items-center text-green-700 font-medium hover:text-green-800 border border-green-700 px-4 py-1 rounded-lg transition-colors text-center"
                >
                  Back
                </Link>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Orders for this product
              </h2>

              <div className="space-y-4">
                {productOrders.length > 0 ? (
                  productOrders.map((order) => (
                    <div key={order.id}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-1 mb-3 sm:mb-0">
                          <span className="font-semibold text-gray-900 max-w-14 w-full">
                            Order {order.id}
                          </span>
                          <span
                            className={`max-w-4xl w-full py-1.5 rounded-full text-xs ml-1 font-medium ${order.statusColor}`}
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

                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 justify-between">
                          <div className="text-sm text-gray-600 text-right">
                            <span className="mr-1">Buyer:{order.buyer}</span>
                            <span className="mr-1">Qty:{order.qty}</span>
                            <span className="mr-1">{order.date}</span>
                          </div>

                          <Link
                            to={`/farmer-orders/${productId}/${order.id.replace(
                              '#',
                              ''
                            )}`}
                            className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors text-center"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No orders found for this product.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  Update order status as soon as items leave your farm.
                </li>
                <li className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  Encourage buyers to confirm delivery quickly to avoid delays.
                </li>
                <li className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  Use the issue button if there is a delivery dispute.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrdersPage;
