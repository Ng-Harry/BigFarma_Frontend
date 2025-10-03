import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../hooks/useFarmerOrder'; // Your TanStack Query hook
import { MessageCircle, Headphones, AlertTriangle } from 'lucide-react';

const SingleOrderPage = () => {
  const { productId, orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  // Use TanStack Query to fetch the specific order
  const { data: apiOrder, isLoading, error } = useOrder(orderId);

  // Transform API data when it's loaded
  useEffect(() => {
    if (apiOrder) {
      console.log(' Single Order API Response:', apiOrder);

      // Transform API data to match your UI structure
      const transformedOrder = {
        id: apiOrder.id?.toString() || orderId,
        buyer:
          apiOrder.farmer_name || apiOrder.consumer_name || 'Unknown Buyer',
        qty: apiOrder.quantity_ordered || '1',
        date: apiOrder.created_at
          ? new Date(apiOrder.created_at).toLocaleDateString()
          : 'N/A',
        status: getOrderStatus(apiOrder.status),
        statusColor: getStatusColor(apiOrder.status),
        originalData: apiOrder,
      };

      setOrderData(transformedOrder);
    }
  }, [apiOrder, orderId]);

  // Helper function to map API status to your UI status
  const getOrderStatus = (apiStatus) => {
    const statusMap = {
      pending: 'Pending',
      confirmed: 'Awaiting Confirmation',
      shipped: 'Shipping In Progress',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      refunded: 'Refunded',
    };
    return statusMap[apiStatus] || 'Pending';
  };

  // Helper function to get status color
  const getStatusColor = (apiStatus) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      confirmed: 'bg-purple-100 text-purple-700 border border-purple-200',
      shipped: 'bg-blue-100 text-blue-700 border border-blue-200',
      delivered: 'bg-green-100 text-green-700 border border-green-200',
      cancelled: 'bg-red-100 text-red-700 border border-red-200',
      refunded: 'bg-gray-100 text-gray-700 border border-gray-200',
    };
    return (
      colorMap[apiStatus] ||
      'bg-yellow-100 text-yellow-700 border border-yellow-200'
    );
  };

  // Get product details from API data
  const getProductDetails = () => {
    if (!apiOrder) return { name: 'Loading...', price: '₦0' };

    return {
      name: apiOrder.product_name || 'Unknown Product',
      price: apiOrder.total_price
        ? `₦${apiOrder.total_price.toLocaleString()}`
        : '₦0',
    };
  };

  const productDetails = getProductDetails();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg mb-4">
            Error loading order: {error.message}
          </p>
          <Link
            to={`/farmer-orders/${productId}`}
            className="text-green-700 hover:text-green-800 font-medium border border-green-800 px-4 py-2 rounded-lg"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // Order not found state
  if (!orderData && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg mb-4">
            Order not found.
          </p>
          <Link
            to={`/farmer-orders/${productId}`}
            className="text-green-800 hover:text-green-700 font-medium border border-green-800 px-4 py-2 rounded-lg"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Order {apiOrder?.order_number || `#${orderId}`}
                  </h1>
                  <div className="flex gap-x-2 items-center mt-2">
                    <div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${orderData?.statusColor}`}
                      >
                        {orderData?.status}
                      </span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      <div className="flex">
                        <p className="text-gray-600 font-medium">
                          Buyer: {orderData?.buyer}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-600 font-medium">
                          Qty: {orderData?.qty}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-400 font-medium">
                          {orderData?.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Product:{' '}
                      <span className="font-medium">{productDetails.name}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Price:{' '}
                      <span className="font-medium">
                        {productDetails.price}
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/farmer-orders/${productId}`}
                  className="text-green-700 hover:text-green-800 font-medium border border-green-800 px-4 py-2 rounded-lg"
                >
                  Back
                </Link>
              </div>

              {/* Divider */}
              <div className="w-full h-[0.2px] bg-gray-400"></div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <button className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Mark as Shipped
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Update Status
                </button>
              </div>

              {/* Order Details from API */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    Order Information
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Order Number:</span>
                    <span className="text-sm font-medium">
                      {apiOrder?.order_number}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Order Date:</span>
                    <span className="text-sm font-medium">
                      {apiOrder?.created_at
                        ? new Date(apiOrder.created_at).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Estimated Delivery:
                    </span>
                    <span className="text-sm font-medium">
                      {apiOrder?.estimated_delivery_date
                        ? new Date(
                            apiOrder.estimated_delivery_date
                          ).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    Delivery Information
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Delivery Address:
                    </span>
                    <span className="text-sm font-medium text-right max-w-xs">
                      {apiOrder?.delivery_address || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Contact Phone:
                    </span>
                    <span className="text-sm font-medium">
                      {apiOrder?.contact_phone || 'N/A'}
                    </span>
                  </div>
                  {apiOrder?.delivery_notes && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Delivery Notes:
                      </span>
                      <span className="text-sm font-medium text-right max-w-xs">
                        {apiOrder.delivery_notes}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Policy Card */}
              <div className="p-3 mt-6 bg-gray-50 rounded-lg">
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

          {/* Sidebar - 1/4 width */}
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
                    {orderData?.buyer}
                  </p>
                </div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="text-gray-900 font-medium text-right text-sm">
                    {apiOrder?.contact_phone || '+234 800 555 6666'}
                  </p>
                </div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-gray-900 font-medium text-right text-sm max-w-xs">
                    {apiOrder?.delivery_address || 'Lekki Phase 1, Lagos.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <button className="bg-transparent hover:border-green-700 border border-green-800 text-green-800 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Customer
                </button>
                <button className="bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                  <Headphones className="w-4 h-4 mr-2" />
                  Contact Support
                </button>
                {orderData?.status.includes('Issue') && (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Resolve Issue
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Product:</span>
                  <span className="text-sm font-medium">
                    {productDetails.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="text-sm font-medium">{orderData?.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <span className="text-sm font-medium">
                    {apiOrder?.total_price
                      ? `₦${(
                          apiOrder.total_price / parseInt(orderData?.qty || 1)
                        ).toLocaleString()}`
                      : 'N/A'}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {productDetails.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
