import { endpoints } from '@/components/config/endpoints';
import { axios } from '@/lib/axios';
import axiosDefault from 'axios';

const RegisterMutation = async (payload) => {
  try {
    const response = await axios.post(
      endpoints().auth.register,
      payload
    );

    return {
      isSuccess: response.status === 201 || response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message,
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: (error.response.data && (error.response.data.detail || error.response.data.message)) || "Registration failed",
        metaData: null,
        data: null,
      };
    }

    return {
      isSuccess: false,
      statusCode: "500",
      message: "An error occurred while connecting to the server",
      metaData: null,
      data: null,
    };
  }
};

const requestOtp = async ({ email, otp_type = "email" }) => {
  try {
    const response = await axios.post(
      endpoints().auth.requestCode,
      { email, otp_type }
    );
    return {
      isSuccess: response.status === 201 || response.status === 200,
      statusCode: response.status.toString(),
      message: response.data.message,
      metaData: response.data.metaData || null,
      data: response.data.data,
    };
  } catch (error) {
    if (axiosDefault.isAxiosError(error) && error.response) {
      return {
        isSuccess: false,
        statusCode: error.response.status.toString(),
        message: (error.response.data && (error.response.data.detail || error.response.data.message)) || "OTP request failed",
        metaData: null,
        data: null,
      };
    }
    return {
      isSuccess: false,
      statusCode: "500",
      message: "An error occurred while connecting to the server",
      metaData: null,
      data: null,
    };
  }
};

export { RegisterMutation, requestOtp };
