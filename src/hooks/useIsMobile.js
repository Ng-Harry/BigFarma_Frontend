import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  // Check mobile only when window exists (SSR-safe)
  const checkIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth < breakpoint;

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());

    window.addEventListener("resize", handleResize);

    // Proper cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;