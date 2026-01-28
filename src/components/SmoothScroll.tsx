import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Global Lenis instance for access if needed
export const lenisContext: { instance: Lenis | null } = { instance: null };

const SmoothScroll = () => {
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisContext.instance = lenis;
        lenisRef.current = lenis;

        // RAF loop with proper cleanup
        function raf(time: number) {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        }

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            // Cancel RAF before destroying lenis
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
            lenis.destroy();
            lenisContext.instance = null;
        };
    }, []);

    return null;
};

export default SmoothScroll;
