import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Cursor tracking multiplier for button (default: 0.38)
  textStrength?: number; // Inner text parallax multiplier (default: 0.25)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.38,
  textStrength = 0.25,
  ...buttonProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !canHover || !buttonRef.current || !containerRef.current) return;

    const containerEl = containerRef.current;
    const buttonEl = buttonRef.current;
    const textEl = textRef.current;
    const glowEl = glowRef.current;

    // Use gsap.quickTo for high-performance 60fps tracking
    const xTo = gsap.quickTo(buttonEl, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(buttonEl, 'y', { duration: 0.35, ease: 'power3.out' });

    const textXTo = textEl ? gsap.quickTo(textEl, 'x', { duration: 0.35, ease: 'power3.out' }) : null;
    const textYTo = textEl ? gsap.quickTo(textEl, 'y', { duration: 0.35, ease: 'power3.out' }) : null;

    const handleMouseEnter = () => {
      gsap.to(buttonEl, {
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = buttonEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from button center
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Magnetic pull toward cursor
      const deltaX = distX * strength;
      const deltaY = distY * strength;

      xTo(deltaX);
      yTo(deltaY);

      if (textXTo && textYTo) {
        textXTo(deltaX * textStrength);
        textYTo(deltaY * textStrength);
      }

      // Specular highlight following cursor
      if (glowEl) {
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        gsap.to(glowEl, {
          x: relX - 40,
          y: relY - 40,
          opacity: 0.45,
          duration: 0.2,
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      // Elastic spring back to neutral
      gsap.to(buttonEl, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'elastic.out(1.15, 0.4)',
        overwrite: 'auto'
      });

      if (textEl) {
        gsap.to(textEl, {
          x: 0,
          y: 0,
          duration: 0.75,
          ease: 'elastic.out(1.15, 0.4)',
          overwrite: 'auto'
        });
      }

      if (glowEl) {
        gsap.to(glowEl, {
          opacity: 0,
          duration: 0.3,
          overwrite: 'auto'
        });
      }
    };

    containerEl.addEventListener('mouseenter', handleMouseEnter);
    containerEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    containerEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      containerEl.removeEventListener('mouseenter', handleMouseEnter);
      containerEl.removeEventListener('mousemove', handleMouseMove);
      containerEl.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([buttonEl, textEl, glowEl]);
    };
  }, [strength, textStrength]);

  return (
    <div
      ref={containerRef}
      className="inline-block relative p-3 -m-3 touch-manipulation"
    >
      <button
        ref={buttonRef}
        className={`relative inline-flex items-center justify-center overflow-hidden will-change-transform cursor-pointer select-none ${className}`}
        {...buttonProps}
      >
        {/* Subtle internal cursor-following ambient reflection glow */}
        <span
          ref={glowRef}
          className="absolute w-20 h-20 rounded-full bg-amber-300/40 blur-xl pointer-events-none opacity-0 will-change-transform"
          aria-hidden="true"
        />
        <span
          ref={textRef}
          className="relative z-10 inline-flex items-center gap-1.5 will-change-transform pointer-events-none"
        >
          {children}
        </span>
      </button>
    </div>
  );
};
