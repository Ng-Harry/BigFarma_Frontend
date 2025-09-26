import { useState, useEffect } from "react";
import { FocusContext } from "./FocusContext";
import Cookies from "js-cookie";

// Provider
export const FocusProvider = ({ children }) => {
  const [focused, setFocused] = useState(false);
  const [role, setRole] = useState(null);

  // Load role from localStorage on mount
  useEffect(() => {
    const storedRole = Cookies.get("BIGFARMA_ROLE");
    if (storedRole) setRole(storedRole);
  }, []);

  // Always update both state and localStorage
  const updateRole = (newRole) => {
    setRole(newRole);
    Cookies.set("BIGFARMA_ROLE", newRole, { expires: 7 });
    localStorage.setItem("selectedRole", newRole);
  };

  return (
    <FocusContext.Provider
      value={{
        focused,
        setFocused,
        role,
        setRole: updateRole, // expose updateRole as setRole
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};