import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/landing-page-sections/Home';
// Page Auth
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import InputOtp from './pages/InputOtp';
import ResetPassword from './pages/ResetPassword';
import Success from './pages/Success';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<InputOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
