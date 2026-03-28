'use client';

import { ArrowRight } from 'lucide-react';
import type { Translations } from '@/lib/translations';

interface HeroSectionProps {
  t: Translations;
  onOpenModal: () => void;
}

export default function HeroSection({ t, onOpenModal }: HeroSectionProps) {
  return (
    <section id="manifesto-hero" className="relative h-[100dvh] w-full flex items-center justify-center px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1604335398980-ededcadcc37d?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxMXx8bGF1bmRyeSUyMHNlcnZpY2V8ZW58MHx8fHwxNzMwNDc2Mjc2fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1920"
          alt="Lavanderia"
          className="parallax-bg w-full h-[150%] object-cover opacity-40 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90" />
      </div>
      <div className="relative z-10 max-w-4xl w-full text-center py-24">
        <p className="philo-line font-mono text-sm tracking-widest text-primary font-bold mb-8 uppercase">{t.heroLead}</p>
        <h2 className="philo-line font-heading font-light italic text-4xl md:text-6xl lg:text-7xl text-dark mb-6 leading-tight">
          {t.heroT1}<span className="text-primary font-bold not-italic font-heading">{t.heroTFreedom}</span>{t.heroTAnd}<span className="text-primary font-bold not-italic font-heading">{t.heroTTime}</span>{t.heroTFor}{t.heroYou}.
        </h2>
        <p className="philo-line font-body text-xl text-textSecondary max-w-2xl mx-auto mb-10">
          {t.heroDesc}{t.heroAcc}.
        </p>
        <button
          onClick={onOpenModal}
          className="philo-line magnetic-btn bg-primary text-white font-medium px-8 py-4 rounded-full text-lg w-auto inline-flex items-center gap-3 font-heading shadow-[0_4px_20px_rgba(37,170,225,0.35)] hover:shadow-[0_4px_30px_rgba(37,170,225,0.5)]"
        >
          {t.heroBtn} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
