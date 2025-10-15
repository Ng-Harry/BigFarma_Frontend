// // src/pages/FarmerOrderPage.jsx
// import React, { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import DataTablePage from '../components/dashboard/farmer/components/farmer-table/dataTable';
// import { useFarmerOrder } from '../hooks/useFarmerOrder';

// // Fallback images
// import eggs from '../assets/ProductImages/categories/Egg image.png';
// import onions from '../assets/ProductImages/onions.png';
// import watermelon from '../assets/ProductImages/watermelon.png';
// import carrot from '../assets/ProductImages/categories/Carrot image.png';
// import rice from '../assets/ProductImages/Rice.png';
// import tomatoes from '../assets/ProductImages/tomatoes.png';
// import vegetable from '../assets/ProductImages/categories/vegetables.png';
// import cassava from '../assets/ProductImages/cassava.png';

// const productImages = {
//   Eggs: eggs,
//   Onions: onions,
//   Watermelon: watermelon,
//   Carrot: carrot,
//   Rice: rice,
//   Tomatoes: tomatoes,
//   Vegetable: vegetable,
//   Cassava: cassava,
// };

// const [filter, setFilter] = useState('all');
//   const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

// const FarmerOrderPage = () => {
//   const { data: apiOrders, isLoading, error, refetch } = useFarmerOrder();

//   // Transform API data (same as your existing logic)
//   const transformedOrders = useMemo(() => {
//     if (!apiOrders) return [];

//     const ordersData = Array.isArray(apiOrders)
//       ? apiOrders
//       : apiOrders.orders || apiOrders.data || [];

//     return ordersData.map((order, index) => {
//       const productId = order.product_id
//         ? `product-${order.product_id}`
//         : `product-${index}`;

//       const productName = order.product_name || `Product ${index + 1}`;

//       const productImage =
//         order.product_images && order.product_images[0]
//           ? order.product_images[0]
//           : productImages[productName] || watermelon;

//       const status = mapOrderStatusToProductStatus(order.status);

//       return {
//         id: order.id?.toString() || `order-${index}`,
//         productId: productId,
//         images: productImage,
//         product: productName,
//         productID: order.order_number || `#ORDER${order.id || index}`,
//         price: order.total_price
//           ? `₦${order.total_price.toLocaleString()}`
//           : '₦0',
//         quantity: order.quantity_ordered || '1',
//         orders: 1,
//         status: status,
//         originalData: order,
//       };
//     });
//   }, [apiOrders]);

//   const mapOrderStatusToProductStatus = (apiStatus) => {
//     const statusMap = {
//       pending: 'Active',
//       confirmed: 'Active',
//       shipped: 'Active',
//       delivered: 'Active',
//       cancelled: 'Out of stock',
//       refunded: 'Out of stock',
//     };
//     return statusMap[apiStatus] || 'Active';
//   };

//   // Order Row Component
//   const OrderRow = ({ data: order }) => {
//     return (
//       <tr className="hover:bg-gray-50">
//         <td className="px-6 py-4 whitespace-nowrap">
//           <div className="flex items-center">
//             <img
//               src={order.images}
//               alt={order.product}
//               className="w-10 h-10 rounded-lg object-cover mr-3"
//               onError={(e) => {
//                 e.target.src = watermelon;
//               }}
//             />
//             <div>
//               <span className="text-sm font-medium text-gray-900 block">
//                 {order.product}
//               </span>
//               <span className="text-xs text-gray-500 block">
//                 {order.originalData.farm_name || 'Farm'}
//               </span>
//             </div>
//           </div>
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//           {order.productID}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//           {order.price}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//           {order.quantity}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//           {order.orders}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">
//           <span
//             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//               order.status === 'Active'
//                 ? 'bg-green-100 text-green-800'
//                 : order.status === 'Draft'
//                 ? 'bg-gray-100 text-gray-800'
//                 : 'bg-red-100 text-red-800'
//             }`}
//           >
//             {order.status}
//           </span>
//           <div className="text-xs text-gray-500 mt-1">
//             {order.originalData.status}
//           </div>
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//           <Link
//             to={`/farmer-orders/${order.productId}`}
//             state={{ order: order.originalData }}
//             className="text-blue-700 bg-blue-200 hover:text-blue-900 rounded-xl py-1 px-2 font-medium"
//           >
//             View
//           </Link>
//         </td>
//       </tr>
//     );
//   };

//   // Column configuration for orders
//   const orderColumns = [
//     { key: 'product', label: 'Product' },
//     { key: 'productID', label: 'Order Number' },
//     { key: 'price', label: 'Total Price' },
//     { key: 'quantity', label: 'Quantity' },
//     { key: 'orders', label: 'Orders' },
//     { key: 'status', label: 'Status' },
//     { key: 'actions', label: 'Action' },
//   ];

//   // Empty state for orders (your existing JSX)
//   const emptyOrdersState = (
//     <div className="flex flex-col items-center justify-center">
//       <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//         <svg
//           className="w-12 h-12 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//           />
//         </svg>
//       </div>
//       <h3 className="text-lg font-medium text-gray-900 mb-2">
//         {apiOrders && (Array.isArray(apiOrders) ? apiOrders.length === 0 : true)
//           ? 'No Orders Yet'
//           : 'No Orders Match Filter'}
//       </h3>
//       <p className="text-gray-500 mb-4 max-w-md text-center">
//         {apiOrders && (Array.isArray(apiOrders) ? apiOrders.length === 0 : true)
//           ? "You don't have any orders at the moment. When customers place orders for your products, they will appear here."
//           : 'No orders match your current filter. Try changing the filter to see more orders.'}
//       </p>
//       {apiOrders &&
//         (Array.isArray(apiOrders) ? apiOrders.length === 0 : true) && (
//           <Link
//             to="/my-products"
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
//           >
//             Go to My Products
//           </Link>
//         )}
//     </div>
//   );

//   return (

//     {/* Custom Header Section */}
//       <div className="p-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           {/* Left side - Title and Count */}
//           <div className="flex items-center space-x-4">
//             <h1 className="text-2xl font-bold">My Products</h1>
//             <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-lg">
//               {transformedProducts.length}{' '}
//               {transformedProducts.length === 1 ? 'Product' : 'Products'}
//             </span>
//           </div>

//           {/* Right side - Filter and Add Product Button */}
//           <div className="flex items-center space-x-4">

//             {/* Filter Section */}
//             <div className="flex items-center space-x-2">
//               <label className="text-gray-600 font-medium">Filter:</label>
//               <div className="relative">
//                 <button
//                   onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
//                   className="flex items-center space-x-2 border border-green-700 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-200 min-w-[120px]"
//                 >
//                   <img src={filterIcon} alt="Filter" className="w-4 h-4" />
//                   <span>{getCurrentFilterLabel()}</span>
//                   <svg
//                     className={`w-4 h-4 transition-transform ${
//                       isFilterDropdownOpen ? 'rotate-180' : ''
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isFilterDropdownOpen && (
//                   <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//                     <div className="py-1">
//                       {/* All Option with Icon */}
//                       <button
//                         onClick={() => handleFilterSelect('all')}
//                         className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${
//                           filter === 'all'
//                             ? 'bg-green-50 text-green-700'
//                             : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                       >
//                         <img src={filterIcon} alt="All" className="w-4 h-4" />
//                         <span>All</span>
//                       </button>

//                       {/* Other Filter Options */}
//                       {productFilterOptions
//                         .filter((option) => option.value !== 'all') // Exclude "All" since we already have it
//                         .map((option) => (
//                           <button
//                             key={option.value}
//                             onClick={() => handleFilterSelect(option.value)}
//                             className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${
//                               filter === option.value
//                                 ? 'bg-green-50 text-green-700'
//                                 : 'text-gray-700 hover:bg-gray-100'
//                             }`}
//                           >
//                             <span>{option.label}</span>
//                           </button>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Add Product Button*/}
//             {transformedProducts.length > 0 && (
//               <button
//                 onClick={() => setIsAddProductModalOpen(true)}
//                 className="flex items-center space-x-2 bg-green-800 hover:bg-green-700 text-white text-base px-5 py-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
//               >
//                 <span>Add Product</span>
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>

//       {/* Products Table */}
//       <DataTablePage
//         title=""
//         data={transformedProducts}
//         isLoading={isLoading}
//         error={error}
//         refetch={refetch}
//         filterOptions={productFilterOptions}
//         columns={productColumns}
//         emptyState={emptyProductsState}
//         type="products"
//         hideHeader={true}
//         currentFilter={filter}
//         onFilterChange={setFilter}
//       />
//     </div>
//   );
// };

// export default FarmerOrderPage;

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTablePage from '../components/dashboard/farmer/components/farmer-table/dataTable';
import { useFarmerOrder } from '../hooks/useFarmerOrder';

// Fallback images
import eggs from '../assets/ProductImages/categories/Egg image.png';
import onions from '../assets/ProductImages/onions.png';
import watermelon from '../assets/ProductImages/watermelon.png';
import carrot from '../assets/ProductImages/categories/Carrot image.png';
import rice from '../assets/ProductImages/Rice.png';
import tomatoes from '../assets/ProductImages/tomatoes.png';
import vegetable from '../assets/ProductImages/categories/vegetables.png';
import cassava from '../assets/ProductImages/cassava.png';
import filterIcon from '../assets/icons/filter.svg'; // 🔹 Make sure you have this icon or adjust path

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
  const { data: apiOrders, isLoading, error, refetch } = useFarmerOrder();

  const [filter, setFilter] = useState('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // 🔹 Helper function to map order status
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

  // 🔹 Transform API data
  const transformedOrders = useMemo(() => {
    if (!apiOrders) return [];

    const ordersData = Array.isArray(apiOrders)
      ? apiOrders
      : apiOrders.orders || apiOrders.data || [];

    return ordersData.map((order, index) => {
      const productId = order.product_id
        ? `product-${order.product_id}`
        : `product-${index}`;

      const productName = order.product_name || `Product ${index + 1}`;

      const productImage =
        order.product_images && order.product_images[0]
          ? order.product_images[0]
          : productImages[productName] || watermelon;

      const status = mapOrderStatusToProductStatus(order.status);

      return {
        id: order.id?.toString() || `order-${index}`,
        productId,
        images: productImage,
        product: productName,
        productID: order.order_number || `#ORDER${order.id || index}`,
        price: order.total_price
          ? `₦${order.total_price.toLocaleString()}`
          : '₦0',
        quantity: order.quantity_ordered || '1',
        orders: 1,
        status,
        originalData: order,
      };
    });
  }, [apiOrders]);

  // 🔹 Filter logic
  const filteredOrders = useMemo(() => {
    if (filter === 'all') return transformedOrders;
    return transformedOrders.filter((order) => order.status === filter);
  }, [filter, transformedOrders]);

  // 🔹 Filter options
  const productFilterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Out of Stock', value: 'Out of stock' },
  ];

  const getCurrentFilterLabel = () => {
    const found = productFilterOptions.find((opt) => opt.value === filter);
    return found ? found.label : 'Filter';
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
    setIsFilterDropdownOpen(false);
  };

  // 🔹 Table row UI
  const OrderRow = ({ data: order }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={order.images}
            alt={order.product}
            className="w-10 h-10 rounded-lg object-cover mr-3"
            onError={(e) => (e.target.src = watermelon)}
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
      <td className="px-6 py-4 text-sm text-gray-500">{order.productID}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {order.price}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{order.quantity}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{order.orders}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            order.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {order.status}
        </span>
        <div className="text-xs text-gray-500 mt-1">
          {order.originalData.status}
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium">
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

  // 🔹 Table column structure
  const orderColumns = [
    { key: 'product', label: 'Product' },
    { key: 'productID', label: 'Order Number' },
    { key: 'price', label: 'Total Price' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'orders', label: 'Orders' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Action' },
  ];

  // // 🔹 Empty state
  // const emptyOrdersState = (
  //   <div className="flex flex-col items-center justify-center py-10">
  //     <p className="text-gray-500 italic">No orders found.</p>
  //   </div>
  // );

  //Empty state for orders (your existing JSX)
  const emptyOrdersState = (
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
        {apiOrders && (Array.isArray(apiOrders) ? apiOrders.length === 0 : true)
          ? 'No Orders Yet'
          : 'No Orders Match Filter'}
      </h3>
      <p className="text-gray-500 mb-4 max-w-md text-center">
        {apiOrders && (Array.isArray(apiOrders) ? apiOrders.length === 0 : true)
          ? "You don't have any orders at the moment. When customers place orders for your products, they will appear here."
          : 'No orders match your current filter. Try changing the filter to see more orders.'}
      </p>
      {apiOrders &&
        (Array.isArray(apiOrders) ? apiOrders.length === 0 : true) && (
          <Link
            to="/my-products"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Go to My Products
          </Link>
        )}
    </div>
  );

  // ✅ MAIN RETURN
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-lg">
            {filteredOrders.length}{' '}
            {filteredOrders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="flex items-center space-x-2 border border-green-700 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-200 min-w-[120px]"
          >
            <img src={filterIcon} alt="Filter" className="w-4 h-4" />
            <span>{getCurrentFilterLabel()}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isFilterDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                {productFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterSelect(option.value)}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      filter === option.value
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <DataTablePage
        title=""
        data={filteredOrders}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        columns={orderColumns}
        emptyState={emptyOrdersState}
        hideHeader={true}
        RowComponent={OrderRow}
      />
    </div>
  );
};

export default FarmerOrderPage;
