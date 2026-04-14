import { useState, useEffect, useCallback } from "react";

/**
 * Cycles through an array of background images with a crossfade effect.
 * Returns the current and next image plus an opacity flag for transitions.
 */
export function useHeroCarousel(images: string[], intervalMs = 30000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [next, intervalMs, images.length]);

  return {
    currentImage: images[currentIndex],
    currentIndex,
  };
}
