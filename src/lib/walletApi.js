import { axios } from "../lib/axios";
// import { endpoints } from "../components/config/endpoints";
import Cookies from "js-cookie";


const BASE_URL = "https://bigfarma-backend.onrender.com/api/v1";

// export const walletApi = async () => {
//     const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
//     const res = await axios.get(`${BASE_URL}/wallet/dashboard`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//     });
//     return res.data;
// }
export const walletApi = async () => {
  try {
    const token = Cookies.get("BIGFARMA_ACCESS_TOKEN");
    console.log("Token:", token);

    const res = await axios.get(`${BASE_URL}/wallet/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Wallet response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Wallet API error:", error.response || error.message);
    throw error; 
  }
};