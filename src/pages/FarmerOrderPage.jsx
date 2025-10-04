// src/pages/FarmerOrderPage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFarmerOrder } from '../hooks/useFarmerOrder';

// Fallback images
import eggs from '../assets/ProductImages/categories/Egg image.png';
import onions from '../assets/ProductImages/onions.png';
import watermelon from '../assets/ProductImages/watermelon.png';
import carrot from '../assets/ProductImages/categories/Carrot image.png';
import rice from '../assets/ProductImages/rice.png';
import tomatoes from '../assets/ProductImages/tomatoes.png';
import vegetable from '../assets/ProductImages/categories/vegetables.png';
import cassava from '../assets/ProductImages/cassava.png';

const productImages = {
  Eggs: eggs,
  Onions: onions,
  Watermelon: watermelon,
  Carrot: carrot,
  Rice: rice,
  Tomatoes: tomatoes,
  Vegetable: vegetable,
  Cassava: cassava,
};

const FarmerOrderPage = () => {
  const [filter, setFilter] = useState('all');

  // Use TanStack Query to fetch orders
  const { data: apiOrders, isLoading, error, refetch } = useFarmerOrder();

  console.log(' API Orders Data:', apiOrders);

  // Transform API data to match your UI structure
  const transformedOrders = useMemo(() => {
    if (!apiOrders) return [];

    // Handle different possible response structures
    const ordersData = Array.isArray(apiOrders)
      ? apiOrders
      : apiOrders.orders || apiOrders.data || [];

    console.log(' Transforming orders:', ordersData);

    return ordersData.map((order, index) => {
      // Use product_id or generate a unique ID
      const productId = order.product_id
        ? `product-${order.product_id}`
        : `product-${index}`;

      // Get product name from API or use fallback
      const productName = order.product_name || `Product ${index + 1}`;

      // Get image - use API image or fallback
      const productImage =
        order.product_images && order.product_images[0]
          ? order.product_images[0]
          : productImages[productName] || watermelon;

      // Determine status for UI
      const status = mapOrderStatusToProductStatus(order.status);

      return {
        id: order.id?.toString() || `order-${index}`,
        productId: productId,
        images: productImage,
        product: productName,
        productID: order.order_number || `#ORDER${order.id || index}`,
        price: order.total_price
          ? `₦${order.total_price.toLocaleString()}`
          : '₦0',
        quantity: order.quantity_ordered || '1',
        orders: 1, // Each API order is one row
        status: status,
        // Keep original API data for reference
        originalData: order,
      };
    });
  }, [apiOrders]);

  // Filter orders based on selection
  const filteredOrders = useMemo(() => {
    return transformedOrders.filter((order) => {
      if (filter === 'all') return true;
      return order.status === filter;
    });
  }, [transformedOrders, filter]);

  // Map API order status to your UI product status
  const mapOrderStatusToProductStatus = (apiStatus) => {
    const statusMap = {
      pending: 'Active',
      confirmed: 'Active',
      shipped: 'Active',
      delivered: 'Active',
      cancelled: 'Out of stock',
      refunded: 'Out of stock',
    };

    return statusMap[apiStatus] || 'Active';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg mx-6">
        <div className="text-red-600 mb-4">
          <strong>Error loading orders:</strong>
          <br />
          {error.response?.data?.detail ||
            error.message ||
            'Failed to load orders'}
        </div>
        <button
          onClick={() => refetch()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
        <div className="mt-4 text-sm text-gray-600">
          <p>Make sure you are logged in as a farmer.</p>
          <p>API Response: {JSON.stringify(error.response?.data)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-lg">
            {filteredOrders?.length}{' '}
            {filteredOrders?.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="filter" className="text-gray-600 font-medium">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-200 min-w-[150px]"
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders?.length > 0 ? (
              filteredOrders?.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {apiOrders && apiOrders?.length === 0
                        ? 'No Orders Yet'
                        : 'No Orders Match Filter'}
                    </h3>
                    <p className="text-gray-500 mb-4 max-w-md text-center">
                      {apiOrders && apiOrders?.length === 0
                        ? "You don't have any orders at the moment. When customers place orders for your products, they will appear here."
                        : 'No orders match your current filter. Try changing the filter to see more orders.'}
                    </p>
                    {apiOrders && apiOrders?.length === 0 && (
                      <Link
                        to="/marketplace"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
                      >
                        Go to Marketplace
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* // Debug info - remove in production */}

      {/* {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <details>
            <summary className="cursor-pointer font-medium">
              Debug Info (API Response)
            </summary>
            <pre className="text-xs mt-2 overflow-auto">
              {JSON.stringify(apiOrders, null, 2)}
            </pre>
          </details>
        </div>
      )} */}
    </div>
  );
};

// Order Row Component
const OrderRow = ({ order }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={order.images}
            alt={order.product}
            className="w-10 h-10 rounded-lg object-cover mr-3"
            onError={(e) => {
              e.target.src = watermelon;
            }}
          />
          <div>
            <span className="text-sm font-medium text-gray-900 block">
              {order.product}
            </span>
            <span className="text-xs text-gray-500 block">
              {order.originalData.farm_name || 'Farm'}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.productID}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.orders}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            order.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : order.status === 'Draft'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {order.status}
        </span>
        <div className="text-xs text-gray-500 mt-1">
          {order.originalData.status}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link
          to={`/farmer-orders/${order.productId}`}
          state={{ order: order.originalData }}
          className="text-blue-700 bg-blue-200 hover:text-blue-900 rounded-xl py-1 px-2 font-medium"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default FarmerOrderPage;




