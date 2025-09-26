import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { FocusProvider } from "./context/FocusProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import { queryClient } from "./lib/queryClient";
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FocusProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FocusProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
