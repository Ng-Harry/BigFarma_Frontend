// src/services/farmerApi.js
import { axios } from '../lib/axios'; // Use your existing axios instance that handles auth

const BASE_URL = 'https://bigfarma-backend.onrender.com/api/v1';

export const farmerApi = {
  // Get all orders for the farmer
  getOrders: () => axios.get(`${BASE_URL}/orders/`),

  // Get orders for a specific product
  getProductOrders: (productId) =>
    axios.get(`${BASE_URL}/products/${productId}/orders`),

  // Get single order details
  getOrder: (orderId) => axios.get(`${BASE_URL}/orders/${orderId}`),

  // Update order status
  updateOrderStatus: (orderId, statusData) =>
    axios.patch(`${BASE_URL}/orders/${orderId}/status`, statusData),
};

export default farmerApi;
