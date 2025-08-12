import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { FocusProvider } from "./context/FocusContext.jsx";
import { queryClient } from "./lib/queryClient";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FocusProvider>
          <App />
        </FocusProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
