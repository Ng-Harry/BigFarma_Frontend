// src/components/RestockProductModal.jsx
import React, { useState } from 'react';

const RestockProductModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  isLoading,
}) => {
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity && !isNaN(quantity)) {
      onConfirm(product?.originalData?.id, quantity);
    }
  };

  const handleClose = () => {
    setQuantity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Restock Product
                </h3>
                <p className="text-sm text-gray-600">
                  Update quantity for {product?.product}
                </p>
              </div>
            </div>

            {/* Current Quantity */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Current Quantity</p>
              <p className="text-lg font-semibold text-gray-900">
                {product?.quantity}
              </p>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter new quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
                min="0"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the total quantity you want to set for this product
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !quantity}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Quantity'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockProductModal;
