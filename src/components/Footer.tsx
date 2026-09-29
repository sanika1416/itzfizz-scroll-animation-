import React, { useState } from 'react';
import { ArrowUpRight, Check, Send } from 'lucide-react';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05060A] text-slate-400 border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white font-extrabold text-xl group cursor-pointer text-left"
              aria-label="Back to top"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              <span className="font-['Syne'] tracking-[0.2em] text-xl uppercase">
                ITZFIZZ DIGITAL
              </span>
            </button>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pioneering next-generation web platforms, scroll-driven interactive narratives, and high-performance digital systems for progressive technology organizations.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>Studio & Engineering Lab</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Available for select briefs</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#hero-section"
                  className="hover:text-amber-400 transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#capabilities-section"
                  className="hover:text-amber-400 transition-colors"
                >
                  Capabilities & Disciplines
                </a>
              </li>
              <li>
                <a
                  href="#metrics-section"
                  className="hover:text-amber-400 transition-colors"
                >
                  Technical Benchmarks
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Start an Engagement
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Inquiry & Dispatch */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold block">
              Dispatch & Insights
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive quarterly deep dives on GSAP motion engineering, frontend performance patterns, and system design.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Submit newsletter subscription"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] font-mono text-emerald-400 block">
                  ✓ Dispatch confirmed. Thank you.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} ITZFIZZ DIGITAL. Built for Web Development Internship Evaluation.
          </div>
          <div className="flex items-center gap-4">
            <span>GSAP 3 + ScrollTrigger</span>
            <span aria-hidden="true">·</span>
            <span>React 19 + Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
