import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollOptions {
  enabled?: boolean;
  isLocked?: boolean;
}

/**
 * Custom smooth inertia scrolling hook powered by Lenis.
 * Simulates the physical momentum and fluid damping of a high-performance graphics engine.
 */
export function useSmoothScroll({ enabled = true, isLocked = false }: SmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Initialize graphics-engine inertia physics
    const lenis = new Lenis({
      duration: 1.2, // Cinematic travel duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.92, // Weighted, mechanical feel
      touchMultiplier: 1.4,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Apply lenis class to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  // Handle modal lock
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLocked) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLocked]);

  return lenisRef;
}
