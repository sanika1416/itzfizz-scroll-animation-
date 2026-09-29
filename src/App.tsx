/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { TechMetrics } from './components/TechMetrics.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleExploreClick = () => {
    const target = document.getElementById('capabilities-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Fixed GSAP Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Top Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Scroll-Driven Hero Section (Occupies first viewport, pinned on scroll, GSAP scrub) */}
        <Hero
          onExploreClick={handleExploreClick}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* What We Build / Core Capabilities Section */}
        <Services onOpenContact={() => setIsContactOpen(true)} />

        {/* Engineering Benchmarks & Quantitative Tech Cards */}
        <TechMetrics />
      </main>

      {/* Simple Agency Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Project Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
