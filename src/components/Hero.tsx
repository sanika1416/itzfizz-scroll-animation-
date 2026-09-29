import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Layers, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Stats } from './Stats.tsx';
import { MagneticButton } from './MagneticButton.tsx';
import defaultHeroImage from '../assets/images/hero_digital_flagship_1790693348150.jpg';

// Register GSAP ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  customHeroImage?: string;
  onExploreClick?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  customHeroImage,
  onExploreClick,
  onOpenContact
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const tiltTargetRef = useRef<HTMLDivElement>(null);
  const mouseSheenRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const statsWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroImageSrc = customHeroImage || defaultHeroImage;

  useEffect(() => {
    // Accessibility check: Detect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Use gsap.context for scoped animations and leak-free React 19 unmounting
    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. INITIAL LOAD TIMELINE
      // Smooth entrance sequence: Headline letters -> Badge & Subhead -> Visual -> Stats -> Indicator
      // ----------------------------------------------------
      const loadTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Staggered headline entrance
      const letterElements = headlineRef.current?.querySelectorAll('.headline-letter');
      if (letterElements && letterElements.length > 0) {
        loadTl.fromTo(
          letterElements,
          {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 35,
            scale: prefersReducedMotion ? 1 : 0.96
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.035
          }
        );
      }

      // Badge & subhead entrance
      loadTl.fromTo(
        badgeRef.current,
        { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.45'
      );

      loadTl.fromTo(
        subheadRef.current,
        { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.35'
      );

      // Statistics sequential entrance (positioned right below subtitle and above main visual)
      const statCards = statsWrapperRef.current?.querySelectorAll('[data-stat-card]');
      if (statCards && statCards.length > 0) {
        loadTl.fromTo(
          statCards,
          {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          },
          '-=0.35'
        );
      }

      // Central visual entrance
      loadTl.fromTo(
        visualWrapperRef.current,
        {
          opacity: 0,
          scale: prefersReducedMotion ? 1 : 0.94,
          y: prefersReducedMotion ? 0 : 30
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out'
        },
        '-=0.4'
      );

      // Scroll indicator fade-in
      loadTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        '-=0.2'
      );

      // ----------------------------------------------------
      // 2. RESPONSIVE SCROLL-DRIVEN ANIMATION (GSAP matchMedia)
      // Desktop: Pinned cinematic timeline with 3D spatial transforms
      // Mobile: Graceful unpinned standard scroll behavior with zero CLS
      // ----------------------------------------------------
      if (!prefersReducedMotion && containerRef.current && scrollTargetRef.current) {
        // Prevent layout shift recalculations caused by mobile address bar resize events
        ScrollTrigger.config({ ignoreMobileResize: true });

        const mm = gsap.matchMedia();

        // Desktop & Tablet (>= 768px): Cinematic pinned scroll sequence
        mm.add('(min-width: 768px)', () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=135%',
              pin: true,
              scrub: 1.2, // Smooth interpolation with scroll velocity
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          scrollTl
            // Primary Visual Transform: Scale, translateY, translateX, rotateX, rotateZ
            .to(
              scrollTargetRef.current,
              {
                scale: 1.15,
                y: -48,
                x: -12,
                rotationX: 6,
                rotationZ: -1.6,
                transformOrigin: '50% 50%',
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 90px -10px rgba(245, 158, 11, 0.22)',
                ease: 'power1.inOut'
              },
              0
            )
            // Ambient background glow expansion matching visual zoom
            .to(
              glowRef.current,
              {
                scale: 1.4,
                opacity: 0.85,
                ease: 'power1.inOut'
              },
              0
            )
            // Headline moves up subtly and dims to keep focal focus on product
            .to(
              headlineRef.current,
              {
                y: -55,
                opacity: 0.18,
                ease: 'power1.inOut'
              },
              0
            )
            // Subheading parallax drift
            .to(
              subheadRef.current,
              {
                y: -35,
                opacity: 0.12,
                ease: 'power1.inOut'
              },
              0
            )
            // Stats glide upward and dim gracefully as the central visual expands
            .to(
              statsWrapperRef.current,
              {
                y: -28,
                opacity: 0.25,
                ease: 'power1.inOut'
              },
              0
            )
            // Scroll indicator exits early in the scroll cycle
            .to(
              scrollIndicatorRef.current,
              {
                opacity: 0,
                y: 15,
                ease: 'power1.out'
              },
              0
            );

          return () => {
            scrollTl.kill();
          };
        });

        // Mobile (< 768px): Graceful transition to standard unpinned scroll behavior
        // Prevents sticky scroll trap, dynamic URL bar jumps, and Cumulative Layout Shift (CLS)
        mm.add('(max-width: 767px)', () => {
          if (containerRef.current) {
            gsap.set(containerRef.current, { clearProps: 'transform,position,top,left,width,height' });
          }

          const mobileTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              pin: false, // Standard natural scroll: zero pin-spacer, zero layout shift
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          });

          mobileTl
            .to(
              scrollTargetRef.current,
              {
                scale: 1.04,
                y: -14,
                ease: 'power1.out'
              },
              0
            )
            .to(
              glowRef.current,
              {
                opacity: 0.45,
                scale: 1.15,
                ease: 'power1.out'
              },
              0
            );

          return () => {
            mobileTl.kill();
            if (containerRef.current) {
              gsap.set(containerRef.current, { clearProps: 'transform,position,top,left,width,height' });
            }
          };
        });
      }

      // ----------------------------------------------------
      // 3. SUBTLE GSAP MOUSE-FOLLOWER PARALLAX
      // Provides tactile spatial depth before scrolling
      // Operates on tiltTargetRef using ultra-performant gsap.quickTo
      // ----------------------------------------------------
      if (!prefersReducedMotion && canHover && tiltTargetRef.current && containerRef.current) {
        const tiltXTo = gsap.quickTo(tiltTargetRef.current, 'rotationX', {
          duration: 0.7,
          ease: 'power2.out'
        });
        const tiltYTo = gsap.quickTo(tiltTargetRef.current, 'rotationY', {
          duration: 0.7,
          ease: 'power2.out'
        });
        const shiftXTo = gsap.quickTo(tiltTargetRef.current, 'x', {
          duration: 0.9,
          ease: 'power2.out'
        });
        const shiftYTo = gsap.quickTo(tiltTargetRef.current, 'y', {
          duration: 0.9,
          ease: 'power2.out'
        });

        // QuickTo for subtle dynamic sheen spotlight
        const sheenXTo = mouseSheenRef.current
          ? gsap.quickTo(mouseSheenRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
          : null;
        const sheenYTo = mouseSheenRef.current
          ? gsap.quickTo(mouseSheenRef.current, 'y', { duration: 0.5, ease: 'power2.out' })
          : null;
        const sheenOpacityTo = mouseSheenRef.current
          ? gsap.quickTo(mouseSheenRef.current, 'opacity', { duration: 0.4, ease: 'power1.out' })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current || !tiltTargetRef.current) return;

          const rect = containerRef.current.getBoundingClientRect();
          // Normalized relative coordinate (-1 to 1) from viewport center
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const normX = (e.clientX - centerX) / (rect.width / 2);
          const normY = (e.clientY - centerY) / (rect.height / 2);

          // Subtle, restrained angles (max ~6 deg pitch and yaw)
          const targetRotX = -normY * 6;
          const targetRotY = normX * 7;
          const targetShiftX = normX * 10;
          const targetShiftY = normY * 8;

          tiltXTo(targetRotX);
          tiltYTo(targetRotY);
          shiftXTo(targetShiftX);
          shiftYTo(targetShiftY);

          // Move the subtle ambient sheen inside the card
          if (mouseSheenRef.current && sheenXTo && sheenYTo && sheenOpacityTo) {
            const cardRect = tiltTargetRef.current.getBoundingClientRect();
            const relX = e.clientX - cardRect.left;
            const relY = e.clientY - cardRect.top;
            sheenXTo(relX - 150);
            sheenYTo(relY - 150);
            sheenOpacityTo(0.18);
          }
        };

        const handleMouseLeave = () => {
          // Smoothly settle back to resting state
          tiltXTo(0);
          tiltYTo(0);
          shiftXTo(0);
          shiftYTo(0);
          if (sheenOpacityTo) {
            sheenOpacityTo(0);
          }
        };

        const containerEl = containerRef.current;
        containerEl.addEventListener('mousemove', handleMouseMove, { passive: true });
        containerEl.addEventListener('mouseleave', handleMouseLeave);

        // Register event listener cleanups in context
        return () => {
          containerEl.removeEventListener('mousemove', handleMouseMove);
          containerEl.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, containerRef);

    // Guaranteed cleanup on unmount
    return () => ctx.revert();
  }, [heroImageSrc]);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen md:min-h-[100dvh] w-full bg-[#08090E] overflow-x-hidden flex flex-col justify-between pt-20 pb-8 sm:pt-28 sm:pb-12 border-b border-white/[0.06]"
      aria-label="ITZFIZZ Digital Hero Section"
    >
      {/* Background Grid Pattern & Ambient Radial Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />
      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] h-[340px] sm:h-[620px] rounded-full bg-gradient-to-tr from-amber-500/12 via-sky-500/10 to-transparent blur-3xl pointer-events-none opacity-60 will-change-transform"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Top Header Group */}
        <div className="text-center max-w-5xl mx-auto space-y-4 pt-1 sm:pt-3">
          {/* Subtle Agency Discipline Label */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono tracking-widest text-[11px] uppercase">
              Creative Engineering & Digital Architecture
            </span>
          </div>

          {/* Main Headline: WELCOME ITZFIZZ */}
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-['Syne'] uppercase text-white leading-tight select-none py-1 will-change-transform"
            aria-label="WELCOME ITZFIZZ"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 gap-y-1">
              {/* Word 1: WELCOME */}
              <span className="inline-block whitespace-nowrap text-white font-extrabold tracking-[0.14em] sm:tracking-[0.22em] md:tracking-[0.26em] drop-shadow-sm">
                {'WELCOME'.split('').map((char, idx) => (
                  <span key={`w-${idx}`} className="headline-letter inline-block">
                    {char}
                  </span>
                ))}
              </span>

              {/* Word 2: ITZFIZZ */}
              <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-black tracking-[0.14em] sm:tracking-[0.22em] md:tracking-[0.26em] drop-shadow-sm">
                {'ITZFIZZ'.split('').map((char, idx) => (
                  <span key={`i-${idx}`} className="headline-letter inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </div>
          </h1>

          {/* Subheading: We design */}
          <p
            ref={subheadRef}
            className="text-base sm:text-xl md:text-2xl text-slate-200 max-w-xl mx-auto font-medium leading-relaxed text-balance will-change-transform pt-1"
          >
            <span className="text-white font-semibold">We design</span> digital experiences that create impact.
          </p>

          {/* Primary Action Buttons with GSAP Magnetic Tracking */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <MagneticButton
              onClick={onOpenContact}
              strength={0.4}
              textStrength={0.25}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-md shadow-lg shadow-black/40"
            >
              <span>Initiate Discovery</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
            <MagneticButton
              onClick={onExploreClick}
              strength={0.32}
              textStrength={0.2}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.1] active:scale-95 transition-all rounded-md"
            >
              <span>Explore Services</span>
            </MagneticButton>
          </div>

          {/* 3 Impact Key Metrics (85% Performance | 92% Engagement | 76% Growth) placed right above Main Visual */}
          <div ref={statsWrapperRef} className="w-full max-w-4xl mx-auto will-change-transform pt-3 pb-1 sm:pt-5 sm:pb-2">
            <Stats />
          </div>
        </div>

        {/* Central Visual Element */}
        <div
          ref={visualWrapperRef}
          className="my-4 sm:my-6 flex justify-center items-center w-full will-change-transform"
          style={{ perspective: 1200 }}
        >
          {/* ScrollTarget: Controlled smoothly by ScrollTrigger timeline */}
          <div
            ref={scrollTargetRef}
            className="relative w-full max-w-4xl will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* TiltTarget: Controlled smoothly by GSAP quickTo mouse follower */}
            <div
              ref={tiltTargetRef}
              className="relative w-full rounded-2xl bg-[#0F111A]/95 border border-white/[0.12] p-2.5 sm:p-4 shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:border-amber-400/40 overflow-hidden will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Subtle mouse-following light sheen */}
              <div
                ref={mouseSheenRef}
                className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-amber-400/25 via-white/10 to-transparent blur-2xl pointer-events-none opacity-0 will-change-transform"
              />

              {/* Mockup Chrome Header */}
              <div className="relative z-10 flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-2 sm:mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Clean System Metadata */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>itzfizz.engine / reactive-canvas</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-emerald-400">3D Spatial Tilt Active</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Central Media Canvas */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0A0B10] border border-white/[0.06] group">
                <img
                  src={heroImageSrc}
                  alt="ITZFIZZ flagship digital product interface showcasing reactive systems"
                  className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Measured contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E]/90 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Interactive HUD Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span className="font-semibold text-slate-200">Interactive 3D Viewport</span>
                  </div>
                  <MagneticButton
                    onClick={onOpenContact}
                    strength={0.3}
                    className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 hover:text-white transition-colors p-1"
                  >
                    <span>Explore Technical Archive</span>
                    <ExternalLink className="w-3 h-3" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Indicator matching diagram ↓ SCROLL */}
        <div
          ref={scrollIndicatorRef}
          className="pt-4 sm:pt-6 flex flex-col items-center justify-center text-center will-change-transform"
        >
          <MagneticButton
            onClick={onExploreClick}
            strength={0.2}
            className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to explore more agency services and capabilities"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400 group-hover:text-amber-400 transition-colors">
              ↓ SCROLL
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-amber-400 transition-colors">
              <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
