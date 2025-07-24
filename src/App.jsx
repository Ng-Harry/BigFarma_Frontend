import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import FAQs from "./components/FAQs";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";

const App = () => {
  return (
    <div className="w-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/faqs" element={<FAQs />}/>
        <Route path="/testimonials" element={<Testimonials />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
      </Routes>
    </div>
  );
};

export default App;
