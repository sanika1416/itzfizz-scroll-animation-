import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton.tsx';
import showcaseImage from '../assets/images/agency_interface_showcase_1790693362442.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development',
    tagline: 'High-performance React/Next.js architectures and robust frontend systems.',
    description:
      'We build scalable, production-grade web applications utilizing modern component frameworks, TypeScript, and clean modular code that guarantees velocity, security, and sub-second load times.',
    deliverables: ['Production React / Vite Architectures', 'Modular TypeScript Component Systems', 'Edge-Optimized API Integrations']
  },
  {
    id: 'ui-ux',
    number: '02',
    title: 'UI/UX',
    tagline: 'Transforming passive scrolling into cinematic, tactile user journeys.',
    description:
      'Leveraging GSAP, ScrollTrigger, and GPU-accelerated compositing to craft memorable brand narratives, intuitive user interfaces, and engaging scroll-driven animations with zero jank.',
    deliverables: ['GSAP Scrub & Pinning Pipelines', 'Design Systems & Micro-Interactions', 'Accessible Reduced-Motion Compliance']
  },
  {
    id: 'performance',
    number: '03',
    title: 'Performance',
    tagline: 'Sub-second rendering, payload reduction, and Lighthouse 95+ score enforcement.',
    description:
      'Deep architectural profiling, asset payload reduction, and responsive rendering optimization that guarantee 90+ Lighthouse ratings across mobile and desktop devices.',
    deliverables: ['Sub-Second First Contentful Paint', 'Zero Layout Shift (CLS) Enforcement', 'Continuous Performance Auditing']
  },
  {
    id: 'digital-solutions',
    number: '04',
    title: 'Digital Solutions',
    tagline: 'Holistic performance engineering, analytics, and conversion growth.',
    description:
      'End-to-end digital solutions designed to maximize engagement: from Core Web Vitals optimization to seamless responsive design and high-conversion landing experiences.',
    deliverables: ['Conversion Architecture Optimization', 'Modular Component Refactoring', 'Enterprise Deployment Pipelines']
  }
];

interface ServicesProps {
  onOpenContact?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<string>('web-development');

  const sectionRef = useRef<HTMLElement>(null);
  const headerKickerRef = useRef<HTMLSpanElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const showcaseCardRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const bgGlowTopRef = useRef<HTMLDivElement>(null);
  const bgGlowBottomRef = useRef<HTMLDivElement>(null);

  const activeService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------------------------
      // 1. STAGGERED ENTRANCE REVEAL ON SCROLL INTO VIEW
      // Activates as cards enter the lower third of the viewport (start: 'top 82%')
      // ----------------------------------------------------------------------
      if (cardsGridRef.current) {
        const serviceCards = cardsGridRef.current.querySelectorAll('[data-service-card]');

        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true
          }
        });

        // Stagger left capability selector cards
        revealTl.fromTo(
          serviceCards,
          {
            opacity: 0,
            y: 45,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power3.out'
          }
        );

        // Reveal the main showcase card in tandem
        if (showcaseCardRef.current) {
          revealTl.fromTo(
            showcaseCardRef.current,
            {
              opacity: 0,
              y: 40,
              scale: 0.97
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out'
            },
            '-=0.6'
          );

          // Subtle stagger for the verified deliverables
          const deliverablePills = showcaseCardRef.current.querySelectorAll('[data-deliverable-item]');
          if (deliverablePills.length > 0) {
            revealTl.fromTo(
              deliverablePills,
              {
                opacity: 0,
                x: -12
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out'
              },
              '-=0.4'
            );
          }
        }
      }

      // ----------------------------------------------------------------------
      // 2. CONTINUOUS DEPTH PARALLAX SCRUB (Z-Plane Hierarchy)
      // ----------------------------------------------------------------------
      if (sectionRef.current) {
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true
          }
        });

        // Deep background glows drift gently
        if (bgGlowTopRef.current) {
          parallaxTl.to(bgGlowTopRef.current, { y: 70, ease: 'none' }, 0);
        }
        if (bgGlowBottomRef.current) {
          parallaxTl.to(bgGlowBottomRef.current, { y: -60, ease: 'none' }, 0);
        }

        // Section header elements move at differentiated velocities
        if (headerKickerRef.current) {
          parallaxTl.to(headerKickerRef.current, { y: -16, ease: 'none' }, 0);
        }
        if (headerTitleRef.current) {
          parallaxTl.to(headerTitleRef.current, { y: -42, ease: 'none' }, 0);
        }
        if (headerDescRef.current) {
          parallaxTl.to(headerDescRef.current, { y: -26, ease: 'none' }, 0);
        }
        if (rightTextRef.current) {
          parallaxTl.to(rightTextRef.current, { y: -20, ease: 'none' }, 0);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities-section"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#08090E] border-b border-white/[0.06] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background ambient lighting with parallax depth */}
      <div
        ref={bgGlowTopRef}
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] blur-3xl pointer-events-none rounded-full will-change-transform"
      />
      <div
        ref={bgGlowBottomRef}
        className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-sky-500/[0.04] blur-3xl pointer-events-none rounded-full will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Depth-Based Parallax */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span
              ref={headerKickerRef}
              className="inline-block font-mono text-xs uppercase tracking-widest text-amber-400 font-medium will-change-transform"
            >
              Core Capabilities · What We Build
            </span>
            <h2
              id="services-heading"
              ref={headerTitleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Syne'] text-white tracking-tight leading-tight will-change-transform"
            >
              Precision engineering meets high-impact creative direction.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-start gap-4 max-w-md">
            <p
              ref={headerDescRef}
              className="text-slate-400 text-sm sm:text-base leading-relaxed will-change-transform"
            >
              Every interface we construct is engineered from first principles—delivering tactile responsiveness, smooth frame rates, and memorable brand distinction.
            </p>
            <MagneticButton
              onClick={onOpenContact}
              strength={0.4}
              textStrength={0.25}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-md shadow-lg shadow-black/40 cursor-pointer whitespace-nowrap"
            >
              <span>Consult Engineering</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Interactive Capability Switcher with Staggered Viewport Entrance */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Staggered Numbered Service Cards */}
          <div className="lg:col-span-5 space-y-4">
            {SERVICES.map((service) => {
              const isActive = activeTab === service.id;
              return (
                <div
                  key={service.id}
                  data-service-card
                  className="will-change-transform"
                >
                  <button
                    onClick={() => setActiveTab(service.id)}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.05] border-amber-400/40 shadow-lg shadow-black/40'
                        : 'bg-white/[0.01] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.12]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-amber-400/80 font-bold tracking-wider">
                        {service.number}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? 'text-amber-400 translate-x-1' : 'text-slate-500'
                        }`}
                      />
                    </div>
                    <h3 className="font-['Syne'] text-lg sm:text-xl font-bold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">
                      {service.tagline}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Capability Spotlight & Media Preview Showcase Card */}
          <div
            ref={showcaseCardRef}
            className="lg:col-span-7 bg-[#0E1018] rounded-2xl border border-white/[0.1] p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden will-change-transform"
          >
            {/* Visual Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/[0.05] blur-3xl pointer-events-none" />

            <div ref={rightTextRef} className="space-y-6 will-change-transform">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                  Specialized Discipline {activeService.number}
                </span>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Deployment
                </span>
              </div>

              <div>
                <h4 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white mb-3">
                  {activeService.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block font-mono">
                  Verified Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      data-deliverable-item
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 will-change-transform"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Showcase Image Media Slot */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/[0.08] group">
              <img
                src={showcaseImage}
                alt="ITZFIZZ technical architecture and digital system showcase"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1018] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                <span>ITZFIZZ SYSTEM LAB</span>
                <span className="text-amber-400">PROD-ENV-OK</span>
              </div>
            </div>

            {/* Direct Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
              <span className="text-xs text-slate-400">
                Ready to elevate your digital flagship presence?
              </span>
              <MagneticButton
                onClick={onOpenContact}
                strength={0.4}
                textStrength={0.25}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-md cursor-pointer whitespace-nowrap shadow-lg shadow-black/30"
              >
                <span>Initiate Engagement</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
