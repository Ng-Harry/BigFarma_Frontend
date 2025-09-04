import { useState, useEffect } from "react";
import { FocusContext } from "./FocusContext";

// Provider
export const FocusProvider = ({ children }) => {
  const [focused, setFocused] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole) setRole(storedRole);

     
  }, []);
  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("selectedRole", newRole);
  };

  return (
    <FocusContext.Provider value={{focused, setFocused, role, setRole:updateRole}}>
      {children}
    </FocusContext.Provider>
  );
};
