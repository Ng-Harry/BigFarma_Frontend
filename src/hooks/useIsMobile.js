import { useState, useEffect, useCallback } from "react";

const useIsMobile = (breakpoint = 768) => {
  // Check mobile only when window exists (SSR-safe)
  const checkIsMobile = useCallback(() => {
    return typeof window !== "undefined" && window.innerWidth < breakpoint;
  }, [breakpoint]);

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [checkIsMobile]);

  return isMobile;
};

export default useIsMobile;
