// src/context/FocusContext.jsx
import { createContext, useState } from "react";

// Create a context
const FocusContext = createContext();

// Provider
export const FocusProvider = ({ children }) => {
  const [focused, setFocused] = useState(false);
  return (
    <FocusContext.Provider value={[focused, setFocused]}>
      {children}
    </FocusContext.Provider>
  );
};

// Hook to consume the context
// export const useFocus = () => useContext(FocusContext);
