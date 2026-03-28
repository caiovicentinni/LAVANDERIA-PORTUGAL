'use client';

import { ArrowRight } from 'lucide-react';
import type { Lang, Translations } from '@/lib/translations';
import type { ServiceData } from '@/lib/api';

interface ServicesGridProps {
  t: Translations;
  lang: Lang;
  services: ServiceData[];
  onOpenModal: () => void;
}

export default function ServicesGrid({ t, lang, services, onOpenModal }: ServicesGridProps) {
  const getServiceName = (s: ServiceData) => {
    if (lang === 'en') return s.name_en;
    if (lang === 'br') return s.name_br;
    return s.name_pt;
  };

  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-mono text-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">{t.navServices}</h2>
        <h3 className="font-heading text-4xl md:text-5xl text-dark font-bold">{t.servicesTitle}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 max-w-5xl mx-auto">
        {services.map(srv => (
          <div key={srv.id} onClick={onOpenModal} className="group flex flex-col items-center cursor-pointer">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-4 bg-gray-100 shadow-md">
              <img src={srv.image_url} alt={getServiceName(srv)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            <h4 className="font-heading text-sm sm:text-base font-bold text-dark underline decoration-1 underline-offset-4 group-hover:text-primary transition-colors text-center w-full">
              {getServiceName(srv)}
            </h4>
          </div>
        ))}
      </div>

      {/* B2B Banner */}
      <div className="mt-20 bg-surfaceDark rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative shadow-2xl">
        <div className="flex-1 relative z-10 w-full">
          <h4 className="font-mono text-primary text-xs uppercase tracking-[0.2em] mb-3 font-bold">B2B</h4>
          <h5 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">{t.b2bTitle}</h5>
          <p className="font-body text-white/70 mb-6 leading-relaxed max-w-lg text-lg">{t.b2bDesc}</p>
          <button onClick={onOpenModal} className="magnetic-btn bg-primary text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(37,170,225,0.35)]">
            {t.b2bBtn} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 w-full relative z-10">
          <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=500,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-m2WpE65pZku9JrX8.png" alt="Serviço Empresas" className="w-full h-[300px] rounded-2xl object-cover shadow-2xl scale-100 md:scale-110 transform md:-rotate-2" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-surfaceDark via-surfaceDark/90 to-transparent z-0" />
      </div>
    </section>
  );
}
