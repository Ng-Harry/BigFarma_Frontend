import React, { useMemo, useState } from 'react';
import DataTablePage from '../farmer/components/farmer-table/dataTable';
import {
  useFarmerProducts,
  useDeleteFarmerProduct,
  useRestockFarmerProduct,
} from '../../../hooks/useFarmerProducts';
import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';
import RestockProductModal from './RestockProductModal';
import { toast } from 'react-toastify';

// Fallback images
import eggs from '../../../assets/ProductImages/categories/Egg image.png';
import onions from '../../../assets/ProductImages/onions.png';
import watermelon from '../../../assets/ProductImages/watermelon.png';
import carrot from '../../../assets/ProductImages/categories/Carrot image.png';
import rice from '../../../assets/ProductImages/Rice.png';
import tomatoes from '../../../assets/ProductImages/tomatoes.png';
import vegetable from '../../../assets/ProductImages/categories/vegetables.png';
import cassava from '../../../assets/ProductImages/cassava.png';

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

const MyProducts = () => {
  const { data: apiProducts, isLoading, error, refetch } = useFarmerProducts();
  const deleteMutation = useDeleteFarmerProduct();
  const restockMutation = useRestockFarmerProduct();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log('API Products Data:', apiProducts);

  // Transform API data for the table
  const transformedProducts = useMemo(() => {
    if (!apiProducts) return [];

    // Handle different response structures
    const productsData = Array.isArray(apiProducts)
      ? apiProducts
      : apiProducts.results || apiProducts.data || [];

    return productsData.map((product, index) => ({
      id: product.id?.toString() || `product-${index}`,
      product: product.name || `Product ${index + 1}`,
      image:
        (product.images?.length >= 2
          ? `${product.images[0]},${product.images[1]}`
          : product.images?.[0]) ||
        product.image ||
        product.image_url ||
        productImages[product.name] ||
        watermelon,

      productID: product.code || `#${product.id || index}`,
      price: product.price
        ? `₦${parseFloat(product.price).toLocaleString()}`
        : '₦0',
      quantity: `${product.quantity || '0'} ${product.unit || ''}`.trim(),
      status: product.status || 'Draft',
      originalData: product,
    }));
  }, [apiProducts]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleRestockClick = (product) => {
    setSelectedProduct(product);
    setIsRestockModalOpen(true);
  };

  const handleDeleteConfirm = (productId) => {
    deleteMutation.mutate(productId, {
      onSuccess: () => {
        toast.success('Product Deleted Successfully');
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        refetch(); // Refresh the list instead of reloading the page
      },
      onError: (error) => {
        toast.error(`Failed to delete product: ${error.message}`);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      },
    });
  };

  const handleRestockConfirm = (productId, quantity) => {
    restockMutation.mutate(
      { productId, quantity: parseInt(quantity) },
      {
        onSuccess: () => {
          toast.success('Product restocked successfully');
          setIsRestockModalOpen(false);
          setSelectedProduct(null);
          refetch();
        },
        onError: (error) => {
          toast.error(`Failed to restock: ${error.message}`);
          setIsRestockModalOpen(false);
          setSelectedProduct(null);
        },
      }
    );
  };

  const handleProductAdded = () => {
    setIsAddProductModalOpen(false);
    refetch();
  };

  // Column configuration for products
  const productColumns = [
    {
      key: 'product',
      label: 'Product',
      render: (item) => (
        <div className="flex items-center">
          <img
            src={item.image}
            alt={item.product}
            className="w-10 h-10 rounded-lg object-cover mr-3"
            onError={(e) => {
              e.target.src = watermelon;
            }}
          />
          <span className="text-sm font-medium text-gray-900">
            {item.product}
          </span>
        </div>
      ),
    },
    {
      key: 'productID',
      label: 'Product Code',
    },
    {
      key: 'price',
      label: 'Price',
      render: (item) => (
        <span className="font-medium text-gray-900">{item.price}</span>
      ),
    },
    {
      key: 'quantity',
      label: 'Quantity',
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            item.status === 'active' || item.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : item.status === 'draft' || item.status === 'Draft'
              ? 'bg-gray-100 text-gray-800'
              : item.status === 'out_of_stock' || item.status === 'Out of stock'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      render: (item) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleRestockClick(item)}
            className="text-blue-700 bg-blue-200 hover:text-blue-900 rounded-xl py-1 px-2 font-medium text-sm"
          >
            Restock
          </button>
          <button
            onClick={() => handleDeleteClick(item)}
            className="text-red-700 bg-red-200 hover:text-red-900 rounded-xl py-1 px-2 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Filter options for products
  const productFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'out_of_stock', label: 'Out of stock' },
    { value: 'pending', label: 'Pending' },
  ];

  // Empty state for products
  const emptyProductsState = (
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No Products Yet
      </h3>
      <p className="text-gray-500 mb-4 max-w-md text-center">
        You haven't added any products yet. Start by adding your first product
        to sell on the marketplace.
      </p>
      <button
        onClick={() => setIsAddProductModalOpen(true)}
        className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
      >
        Add New Product
      </button>
    </div>
  );

  return (
    <>
      <DataTablePage
        title="My Products"
        data={transformedProducts}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        filterOptions={productFilterOptions}
        columns={productColumns}
        emptyState={emptyProductsState}
        type="products"
      />

      {/* Add Product Button - Floating Action Button */}
      {transformedProducts.length > 0 && (
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={() => handleDeleteConfirm(selectedProduct?.originalData?.id)}
        product={selectedProduct}
        isLoading={deleteMutation.isLoading}
      />

      {/* Restock Product Modal */}
      <RestockProductModal
        isOpen={isRestockModalOpen}
        onClose={() => {
          setIsRestockModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleRestockConfirm}
        product={selectedProduct}
        isLoading={restockMutation.isLoading}
      />
    </>
  );
};

export default MyProducts;
