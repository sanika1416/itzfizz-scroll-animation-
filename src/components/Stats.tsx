import React from 'react';

export interface StatItem {
  id: string;
  percentage: string;
  metric: string;
  description: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'perf',
    percentage: '85%',
    metric: 'Performance',
    description: 'Sub-second Core Web Vitals and streamlined runtime footprint.'
  },
  {
    id: 'eng',
    percentage: '92%',
    metric: 'Engagement',
    description: 'Elevated dwell time driven by interactive spatial storytelling.'
  },
  {
    id: 'growth',
    percentage: '76%',
    metric: 'Growth',
    description: 'Average increase in enterprise conversion across launched platforms.'
  }
];

interface StatsProps {
  className?: string;
  itemClassName?: string;
}

export const Stats: React.FC<StatsProps> = ({ className = '', itemClassName = '' }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 ${className}`}
      aria-label="Impact Key Metrics"
    >
      {STATS_DATA.map((item) => (
        <div
          key={item.id}
          data-stat-card
          className={`group relative p-5 sm:p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-colors duration-300 backdrop-blur-sm ${itemClassName}`}
        >
          {/* Subtle gradient glow on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex flex-col justify-between h-full space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                {item.percentage}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400/90 font-['JetBrains_Mono']">
                {item.metric}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {item.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 inline-block" />
              <span>Verified Client Benchmark</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
