import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      endpoints().auth.login,
      { email, password }
    );
    return {
      isSuccess: response.status === 200 || response.status === 201,
      statusCode: response.status.toString(),
      message: response.data.message,
      token: response.data.token,
      user: response.data.user,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: (error.response.data && (error.response.data.detail || error.response.data.message)) || "Login failed",
        data: null,
      };
    }
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An error occurred while connecting to the server",
      data: null,
    };
  }
};

export { login };
