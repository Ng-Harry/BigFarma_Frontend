export const endpoints = () => {
  
  return {
    auth: {
      password_reset: `/auth/password-reset`,
      register: `/auth/register`,
      requestCode: `/auth/request-otp`,
      verify_otp: `/auth/verify-otp`,
      login: `/auth/login`,
      change_default_password: `/auth/change-default-password`,
      forgot_password: `/auth/forgot-password`,
      reset_password_request: `/auth/request-otp`,
      validateOtp: `/auth/validate-otp`,
      resend_otp: `/auth/resend-otp`,
    }
  };
};


