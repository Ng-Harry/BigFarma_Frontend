// src/components/DeleteProductModal.jsx
import React from 'react';

const DeleteProductModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{' '}
              <strong>"{product?.product}"</strong>? This action cannot be
              undone and all product data will be permanently removed.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="px-6 py-2 border border-red-700 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-transparent hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
