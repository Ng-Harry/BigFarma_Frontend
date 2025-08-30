import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Home from "./components/landing-page-sections/Home";
// Page Auth
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import InputOtp from "./pages/InputOtp";
import ResetPassword from "./pages/ResetPassword";
import RoleSelection from "./pages/RoleSelection";

import { DashboardPage } from "./pages";
import VerifyOtp from "./pages/VerifyOtp";
import Success from "./pages/Success";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* auth */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<InputOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/success" element={<Success />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
};

export default App;
