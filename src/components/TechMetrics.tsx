import React from 'react';
import { Gauge, Cpu, Sparkles, Layers, Shield, Terminal } from 'lucide-react';

const METRIC_CARDS = [
  {
    icon: Gauge,
    title: 'Core Web Vitals Standard',
    metric: '99/100',
    caption: 'Lighthouse Performance Score',
    detail: 'Zero render-blocking scripts and surgical stylesheet splitting.'
  },
  {
    icon: Cpu,
    title: 'Interaction Fluidity',
    metric: '60 FPS',
    caption: 'Scrub-Synchronized Animation',
    detail: 'Hardware compositor acceleration without main-thread jank.'
  },
  {
    icon: Layers,
    title: 'Component Scalability',
    metric: '100%',
    caption: 'Strict Type-Safe Coverage',
    detail: 'Modular architecture primed for rapid enterprise expansion.'
  },
  {
    icon: Shield,
    title: 'Accessibility Compliance',
    metric: 'WCAG AA',
    caption: 'Universal Readability',
    detail: 'Reduced-motion awareness and semantic focus ring hierarchy.'
  }
];

export const TechMetrics: React.FC = () => {
  return (
    <section
      id="metrics-section"
      className="py-20 sm:py-28 bg-[#090A10] border-b border-white/[0.06] relative"
      aria-label="Engineering Standards and Benchmarks"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-medium">
            System Reliability · Quantitative Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Syne'] text-white tracking-tight">
            Engineered for performance under heavy concurrency.
          </h2>
          <p className="text-sm text-slate-400">
            Our build pipelines are calibrated against strict industry tolerances to ensure flawless visual delivery on any device.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRIC_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Syne'] text-base font-bold text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <span className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white block tabular-nums">
                    {card.metric}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                    {card.caption}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
