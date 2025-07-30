import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/landing-page-sections/Home";
// Page Auth
import SignIn from "./pages/Auth/SignIn";

const App = () => {
  return (  
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
  );
};

export default App;
