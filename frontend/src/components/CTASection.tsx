'use client';

import { ArrowRight } from 'lucide-react';
import type { Translations } from '@/lib/translations';

interface CTASectionProps {
  t: Translations;
  onOpenModal: () => void;
}

export default function CTASection({ t, onOpenModal }: CTASectionProps) {
  return (
    <section id="cta-section" className="relative min-h-[80vh] w-full flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxNXx8bHV4dXJ5JTIwZGFyayUyMHRleHR1cmV8ZW58MHx8fHwxNzI1MzExNjYwfDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1920"
          alt="Interior premium resort"
          className="w-full h-full object-cover block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-7xl w-full mx-auto">
        <h1 className="flex flex-col gap-2 mb-6">
          <span className="hero-text-split font-heading font-bold text-3xl md:text-5xl lg:text-7xl uppercase tracking-tighter text-dark">
            {t.ctaHeadline1}
          </span>
          <span className="hero-text-split font-heading font-light italic text-4xl md:text-6xl lg:text-7xl text-primary mt-[-10px]">
            {t.ctaHeadline2}
          </span>
        </h1>
        <div className="hero-text-split max-w-xl mb-10 text-textSecondary font-body text-lg md:text-xl leading-relaxed">
          {t.ctaDesc}
        </div>
        <button
          onClick={onOpenModal}
          className="hero-text-split magnetic-btn bg-dark text-white font-medium px-8 py-4 rounded-full text-lg w-auto inline-flex items-center gap-3 font-heading shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        >
          {t.ctaBtn} <ArrowRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </section>
  );
}
