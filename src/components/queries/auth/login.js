import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';
import Cookies from 'js-cookie';

const login = async ({ login, password }) => {
  try {
    const response = await axios.post(
      endpoints().auth.login,
      { login, password }
    );
    if (response.data.access_token) {
      Cookies.set('BIGFARMA_ACCESS_TOKEN', response.data.access_token);
      // Cookies.set('BIGFARMA_ROLE', response.data.user_category);
    }
     const role =
				response.data.user?.user_category ||
				response.data.data?.user?.user_category ||
				null;
			if (role) {
				Cookies.set("BIGFARMA_ROLE", role);
			}
    return {
      isSuccess: response.status === 200 || response.status === 201,
      statusCode: response.status.toString(),
      message: response.data.message,
      token: response.data.access_token,
      user: response.data.user,
      data: response.data.data,
      role: role,
      // role: response.data.user?.user_category || response.data.data?.user?.user_category || null, 
      
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
