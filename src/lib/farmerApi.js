// src/services/farmerApi.js
import { axios } from "../lib/axios";
import { endpoints } from "../components/config/endpoints";
import Cookies from "js-cookie";
import axiosDefault from "axios";

const BASE_URL = "https://bigfarma-backend.onrender.com/api/v1";

export const farmerApi = {
	// Orders (your existing endpoints)
	getOrders: () => axios.get(`${BASE_URL}/orders/`),
	getProductOrders: (productId) =>
		axios.get(`${BASE_URL}/products/${productId}/orders`),
	getOrder: (orderId) => axios.get(`${BASE_URL}/orders/${orderId}`),
	updateOrderStatus: (orderId, statusData) =>
		axios.patch(`${BASE_URL}/orders/${orderId}/status`, statusData),

	// Products endpoints (new)
	getProducts: () =>
		axios.get(endpoints().farmerProducts.get_product, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("BIGFARMA_ACCESS_TOKEN")}`,
			},
		}),

	getProduct: (productId) => axios.get(`${BASE_URL}/products/${productId}/`),
	createProduct: (productData) => {
		const formData = new FormData();

		// Append basic fields
		Object.keys(productData).forEach((key) => {
			if (productData[key] !== undefined && productData[key] !== null) {
				if (key === "images" && Array.isArray(productData[key])) {
					// Handle multiple images
					productData[key].forEach((image) => {
						formData.append("images", image);
					});
				} else {
					formData.append(key, productData[key]);
				}
			}
		});

		return axios.post(`${BASE_URL}/products/create/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	updateProduct: (productId, productData) => {
		const formData = new FormData();

		Object.keys(productData).forEach((key) => {
			if (productData[key] !== undefined && productData[key] !== null) {
				if (key === "images" && Array.isArray(productData[key])) {
					productData[key].forEach((image) => {
						formData.append("images", image);
					});
				} else {
					formData.append(key, productData[key]);
				}
			}
		});

		return axios.patch(`${BASE_URL}/products/${productId}/update/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	deleteProduct: (productId) =>
		axios.delete(`${BASE_URL}/products/${productId}/delete/`),
	restockProduct: (productId, quantityData) =>
		axios.patch(`${BASE_URL}/products/${productId}/restock/`, quantityData),
	updateProductStatus: (productId, statusData) =>
		axios.patch(`${BASE_URL}/products/${productId}/update-status/`, statusData),
};

export default farmerApi;
