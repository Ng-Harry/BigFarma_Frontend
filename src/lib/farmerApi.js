// src/services/farmerApi.js
import { axios } from '../lib/axios';
import { endpoints } from '../components/config/endpoints';
import Cookies from 'js-cookie';
import axiosDefault from 'axios';

const token = Cookies.get('BIGFARMA_ACCESS_TOKEN');

export const farmerApi = {
  // Orders (your existing endpoints)
  getOrders: () =>
    axios.get(endpoints().farmerOrders.orders, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getProductOrders: (productId) =>
    axios.get(`${endpoints().farmerOrders.orders}/${productId}`, {
      headers: {
        Autorization: `Bearer ${token}`,
      },
    }),

  getOrder: (orderId) =>
    axios.get(`${endpoints().farmerOrders.orders}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateOrderStatus: (orderId, statusData) =>
    axios.patch(`${endpoints().farmerOrders}/${orderId}/status`, statusData, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  // Products endpoints (new)
  getProducts: () =>
    axios.get(endpoints().farmerProducts.get_product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // getProduct: (productId) => axios.get(`${BASE_URL}/products/${productId}/`),
  createProduct: (productData) => {
    const formData = new FormData();

    // Append basic fields
    Object.keys(productData).forEach((key) => {
      if (productData[key] !== undefined && productData[key] !== null) {
        if (key === 'images' && Array.isArray(productData[key])) {
          // Handle multiple images
          productData[key].forEach((image) => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, productData[key]);
        }
      }
    });

    return axios.post(endpoints().farmerProducts.create_product, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProduct: (productId, productData) => {
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (productData[key] !== undefined && productData[key] !== null) {
        if (key === 'images' && Array.isArray(productData[key])) {
          productData[key].forEach((image) => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, productData[key]);
        }
      }
    });

    return axios.put(
      `${endpoints().farmerProducts.update_product}/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  deleteProduct: (productId) => {
    return (
      axios.delete(`${endpoints().farmerProducts.delete_product}/${productId}`),
      {
        Authorization: `Bearer ${token}`,
      }
    );
  },

  restockProduct: (productId, quantityData) => {
    return (
      axios.put(
        `${endpoints().farmerProducts.update_product}/${productId}`,
        quantityData
      ),
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    );
  },

  updateProductStatus: (productId, statusData) => {
    return (
      axios.put(
        `${endpoints().farmerProducts.update_product}/${productId}`,
        statusData
      ),
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    );
  },
};

export default farmerApi;
