import { useState } from 'react';
import Data from './Data';
import { useEffect } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
// ==================== Images  ====================
import onions from '../../../../../assets/ProductImages/onions.png';
import tomatoes from '../../../../../assets/ProductImages/tomatoes.png';
import pepper from '../../../../../assets/ProductImages/pepper.png';
import plantain from '../../../../../assets/ProductImages/plantain.png';

const products = [
  {
    id: '101',
    images: onions,
    product: 'Onions',
    quantity: '2 Boxes',
    price: 10000,
    location: 'Lagos',
  },
  {
    id: '102',
    images: tomatoes,
    product: 'Tomatoes',
    quantity: '1 Box',
    price: 10000,
    location: 'Jos',
  },
  {
    id: '103',
    images: pepper,
    product: 'Pepper',
    quantity: '1 Bag',
    price: 10000,
    location: 'Kaduna',
  },
  {
    id: '104',
    images: plantain,
    product: 'Plantain',
    quantity: '2 Bags',
    price: 10000,
    location: 'Kaduna',
  },
];

const PendingOrders = ({ ordersData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full lg:border border-grey-200 rounded-lg overflow-hidden">
      <table className="w-full bg-[#EFEFEF]">
        <thead className="">
          <tr className="text-left text-lg *:px-6 *:py-2.5 border-b border-grey-200 hidden lg:table-row">
            <th>Product Name</th>
            <th>Product I.D</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Orders</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <LoadingSkeleton key={index} itemKey={index} />
          ))
        ) : ordersData.length === 0 ? (
          <tr colSpan={7}>
            <td>No recent order</td>
          </tr>
        ) : (
          ordersData.map((product) => (
            <tr
              key={product.id}
              className="table-row cursor-pointer text-sm *:px-4 lg:*:px-6 *:py-2 lg:*:py-3 lg:py-0 border-t border-grey-200 bg-white font-bold"
            >
              <Data
                props={product}
                onViewDetails={() => handleSelectedProduct(product)}
              />
            </tr>
          ))
        )}
      </table>

      {/* Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white p-8  rounded-lg shadow-lg w-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={selectedProduct.images}
                alt={selectedProduct.product}
                className="w-12 h-12"
              />
              <p className="font-medium">{selectedProduct.product}</p>
            </div>
            <p>
              <strong>Quantity:</strong> {selectedProduct.quantity}
            </p>
            <p>
              <strong>Price:</strong> #{selectedProduct.price?.toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {selectedProduct.location}
            </p>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
