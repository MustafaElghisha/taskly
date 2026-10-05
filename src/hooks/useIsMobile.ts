import { useEffect, useState } from "react";

const useIsMobile = (mobileBreakPoint = 640) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(width < ${mobileBreakPoint}px)`);

    const handleChange = () => {
      setIsMobile(mql.matches);
    };

    handleChange();

    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, [mobileBreakPoint]);

  return !!isMobile;
};

export { useIsMobile };
