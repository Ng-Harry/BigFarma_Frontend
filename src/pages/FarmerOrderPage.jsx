import React from 'react';
import { Link } from 'react-router-dom';
import eggs from '../assets/ProductImages/categories/Egg image.png';
import onions from '../assets/ProductImages/onions.png';
import watermelon from '../assets/ProductImages/watermelon.png';
import carrot from '../assets/ProductImages/categories/Carrot image.png';
import rice from '../assets/ProductImages/rice.png';
import tomatoes from '../assets/ProductImages/tomatoes.png';
import vegetable from '../assets/ProductImages/categories/vegetables.png';
import cassava from '../assets/ProductImages/cassava.png';

const dummyOrders = [
  {
    id: '2745',
    productId: '123', // Match with orders data
    images: eggs,
    product: 'Eggs',
    productID: '#KP267400',
    price: 'N20,500',
    quantity: '5 Crates',
    orders: 20,
    status: 'Active',
  },
  {
    id: '2746',
    productId: '124', // Match with orders data
    images: onions,
    product: 'Onions',
    productID: '#TL651535',
    price: 'N50,000',
    quantity: '1 Bag',
    orders: 4,
    status: 'Active',
  },
  {
    id: '2747',
    productId: '125', // Match with orders data - Watermelon
    images: watermelon,
    product: 'Watermelon',
    productID: '#GVBVB576',
    price: 'N3000',
    quantity: '100 pcs',
    orders: 8,
    status: 'Active',
  },
  {
    id: '2748',
    productId: '126', // Carrot
    images: carrot,
    product: 'Carrot',
    productID: '#8D487441',
    price: 'N500',
    quantity: '250',
    orders: 0,
    status: 'Draft',
  },
  {
    id: '2749',
    productId: '127', // Rice
    images: rice,
    product: 'Rice',
    productID: '#TL449003',
    price: 'N2500',
    quantity: '10 Bags',
    orders: 1,
    status: 'Out of stock',
  },
  {
    id: '2750',
    productId: '128', // Tomatoes
    images: tomatoes,
    product: 'Tomatoes',
    productID: '#SF567789',
    price: 'N250',
    quantity: '250',
    orders: 5,
    status: 'Active',
  },
  {
    id: '2751',
    productId: '129', // Vegetable
    images: vegetable,
    product: 'Vegetable',
    productID: '#ER556723',
    price: 'N250',
    quantity: '250',
    orders: 2,
    status: 'Out of stock',
  },
  {
    id: '2752',
    productId: '130', // Cassava
    images: cassava,
    product: 'Cassava',
    productID: '#ER5588154',
    price: 'N250',
    quantity: '2 Baskets',
    orders: 0,
    status: 'Draft',
  },
];

const FarmerOrderPage = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-lg">
            {dummyOrders.length}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="filter" className="text-gray-600 font-medium">
            Filter:
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 min-w-[150px]"
          >
            <option>All</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Out of stock</option>
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
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
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
            {dummyOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={order.images}
                      alt={order.product}
                      className="w-10 h-10 rounded-lg object-cover mr-3"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {order.product}
                    </span>
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/farmer-orders/${order.productId}`}
                    className="text-blue-700 bg-blue-200 hover:text-blue-900 rounded-xl py-1 px-2 font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <span className="mr-2">←</span> Previous
        </button>

        <div className="flex space-x-1">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                page === 1
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Next <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default FarmerOrderPage;
