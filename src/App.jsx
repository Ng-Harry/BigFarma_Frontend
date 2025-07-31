import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/landing-page-sections/Home";
// Page Auth
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import InputOtp from "./pages/InputOtp";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (  
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<InputOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
  );
};

export default App;
