'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { fetchServices, type ServiceData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

// Fallback services for when API is not available
const FALLBACK_SERVICES: ServiceData[] = [
  { id: 1, name_pt: 'Limpeza a Seco', name_br: 'Limpeza a Seco', name_en: 'Dry Cleaning', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/shop-1746862-YKb6l9oDZZhkaBZq.jpg', is_active: true, requires_dimensions: false, sort_order: 1 },
  { id: 2, name_pt: 'Limpeza Tapetes', name_br: 'Limpeza Tapetes', name_en: 'Carpet Cleaning', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-mjEvGEGLEBFLDpMR.png', is_active: true, requires_dimensions: true, sort_order: 2 },
  { id: 3, name_pt: 'Limpeza Cortinados', name_br: 'Limpeza Cortinados', name_en: 'Curtain Cleaning', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-AVLpaLQD7vsx8l6k.png', is_active: true, requires_dimensions: false, sort_order: 3 },
  { id: 4, name_pt: 'Impermeabilização', name_br: 'Impermeabilização', name_en: 'Waterproofing', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-dJo6bowZXDtpVX64.png', is_active: true, requires_dimensions: false, sort_order: 4 },
  { id: 5, name_pt: 'Tinturaria', name_br: 'Tinturaria', name_en: 'Dyeing', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-YanyJngRg1SZkMw8.png', is_active: true, requires_dimensions: false, sort_order: 5 },
  { id: 6, name_pt: 'Edredões', name_br: 'Edredons', name_en: 'Comforters', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-Yg2Wy26Mx5uVWnM4.png', is_active: true, requires_dimensions: true, sort_order: 6 },
  { id: 7, name_pt: 'Packs', name_br: 'Pacotes', name_en: 'Packages', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-AE0or0gQ4eHpbexP.png', is_active: true, requires_dimensions: false, sort_order: 7 },
  { id: 8, name_pt: 'Arranjos Costura', name_br: 'Ajustes de Costura', name_en: 'Tailoring & Repairs', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-Y4LVvLa4yPfyR22Z.png', is_active: true, requires_dimensions: false, sort_order: 8 },
  { id: 9, name_pt: 'Roupa por Medida', name_br: 'Roupa Sob Medida', name_en: 'Custom Clothing', image_url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-mv0DJ0ZGQacj6Kyg.png', is_active: true, requires_dimensions: false, sort_order: 9 },
];

export default function HomePage() {
  const { lang, t, changeLang } = useLanguage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState<ServiceData[]>(FALLBACK_SERVICES);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setServices(FALLBACK_SERVICES));
  }, []);

  // Dynamic GSAP import (client-side only)
  useEffect(() => {
    let ctx: any;
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: '#manifesto-hero',
            start: 'bottom top',
            onEnter: () => gsap.to('.navbar', { backgroundColor: 'rgba(255,255,255,0.85)', borderColor: 'rgba(0,0,0,0.08)', backdropFilter: 'blur(20px)' }),
            onLeaveBack: () => gsap.to('.navbar', { backgroundColor: 'transparent', borderColor: 'transparent' }),
          });

          gsap.from('.philo-line', { y: 30, opacity: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out', delay: 0.2 });
          gsap.fromTo('.parallax-bg', { yPercent: -10 }, { scrollTrigger: { trigger: '#manifesto-hero', scrub: true }, yPercent: 10, ease: 'none' });
          gsap.from('.hero-text-split', { scrollTrigger: { trigger: '#cta-section', start: 'top 60%' }, y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' });
        }, mainRef.current!);
      });
    });
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-background min-h-screen relative text-textPrimary">
      <div className="noise-overlay" />
      <Navbar t={t} lang={lang} onChangeLang={changeLang} onOpenModal={() => setModalOpen(true)} />
      <HeroSection t={t} onOpenModal={() => setModalOpen(true)} />
      <ServicesGrid t={t} lang={lang} services={services} onOpenModal={() => setModalOpen(true)} />
      <CTASection t={t} onOpenModal={() => setModalOpen(true)} />
      <Footer t={t} onOpenModal={() => setModalOpen(true)} />
      <QuoteModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} t={t} lang={lang} services={services} />
    </div>
  );
}
