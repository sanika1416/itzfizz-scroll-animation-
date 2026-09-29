import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (progressBarRef.current) {
        // Use GPU compositor-accelerated scaleX from 0 to 1 across the full page scroll
        gsap.fromTo(
          progressBarRef.current,
          {
            scaleX: 0,
            transformOrigin: 'left center'
          },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.2, // Ultra-responsive smooth scrub tracking
              invalidateOnRefresh: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-white/[0.04]"
      aria-hidden="true"
    >
      <div
        ref={progressBarRef}
        className="w-full h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.6)] will-change-transform"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
    </div>
  );
};
