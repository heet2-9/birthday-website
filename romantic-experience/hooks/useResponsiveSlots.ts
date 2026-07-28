import { useState, useEffect } from "react";

export function useResponsiveSlots(): number {
  const [slotCountPerSide, setSlotCountPerSide] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlotCountPerSide(2); // Mobile: 2 per side (4 total)
      } else if (width < 1024) {
        setSlotCountPerSide(3); // Tablet: 3 per side (6 total)
      } else {
        setSlotCountPerSide(4); // Desktop: 4 per side (8 total)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return slotCountPerSide;
}
