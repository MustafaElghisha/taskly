import { useRef, useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(onClickOutside: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseDown = (ev: MouseEvent) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  });

  return { ref };
};

export { useClickOutside };
