import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton.tsx';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090E]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 text-white font-bold tracking-tight text-xl transition-opacity hover:opacity-90"
          aria-label="ITZFIZZ Digital Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
          <span className="font-['Syne'] tracking-[0.18em] text-lg sm:text-xl font-extrabold uppercase">
            ITZFIZZ
          </span>
        </a>

        {/* Zone 2: 4 clean text navigation links matching layout */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
          aria-label="Primary Navigation"
        >
          <button
            onClick={() => scrollToSection('hero-section')}
            className="hover:text-white transition-colors cursor-pointer text-left font-medium"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('capabilities-section')}
            className="hover:text-white transition-colors cursor-pointer text-left font-medium"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('metrics-section')}
            className="hover:text-white transition-colors cursor-pointer text-left font-medium"
          >
            About
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <MagneticButton
            onClick={onOpenContact}
            strength={0.3}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-slate-900 bg-white hover:bg-slate-200 active:scale-95 transition-all rounded-md shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-amber-400 rounded-md"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0D0F17] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="py-2 text-left hover:text-amber-400 transition-colors font-medium"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('capabilities-section')}
              className="py-2 text-left hover:text-amber-400 transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('metrics-section')}
              className="py-2 text-left hover:text-amber-400 transition-colors font-medium"
            >
              About
            </button>
          </nav>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-colors"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
