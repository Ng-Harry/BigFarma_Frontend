import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";


const App = () => {
  return (
    <div className="w-full h-screen bg-[var(--color-neutral-light)] md:bg-[url('./assets/images/Background-Image.png')] bg-contain bg-center">
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
};

export default App;
