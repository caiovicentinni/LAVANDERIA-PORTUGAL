import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Navigation } from 'lucide-react';
import ModalOrcamento from './components/ModalOrcamento';

gsap.registerPlugin(ScrollTrigger);

const translations = {
  pt: {
    navServices: 'Serviços',
    navQuote: 'Orçamento',
    heroLead: 'A maioria da indústria foca apenas em lavar e entregar roupas...',
    heroT1: 'Nós focamos em ',
    heroTFreedom: 'liberdade',
    heroTAnd: ' e ',
    heroTTime: 'tempo',
    heroTFor: ' para ',
    heroYou: 'si',
    heroDesc: 'Da lavanderia tradicional e limpeza de tapetes à impermeabilização e tinturaria de alto nível. Um atendimento impecável para a sua empresa ou ',
    heroAcc: 'alojamento local',
    heroBtn: 'Fazer Orçamento',
    servicesTitle: 'Tudo o que precisas, num só lugar.',
    sSeco: 'Limpeza a Seco',
    sTapetes: 'Limpeza Tapetes',
    sCortinas: 'Limpeza Cortinados',
    sImper: 'Impermeabilização',
    sTinta: 'Tinturaria',
    sEdredoes: 'Edredões',
    sPacks: 'Packs',
    sCostura: 'Arranjos Costura',
    sMedida: 'Roupa por Medida',
    b2bTitle: 'Soluções à medida para Empresas',
    b2bDesc: 'Restaurantes, alojamentos locais, clínicas, ginásios e salões. Recolha, lavagem premium e entrega com planos recorrentes.',
    b2bBtn: 'Fale Connosco',
    ctaDesc: 'Nós não limpamos apenas as suas peças. Nós restauramos o seu valor através de procedimentos premium B2B, B2C e self-service de vanguarda 7h-23h.',
    ctaBtn: 'Orçamento via Whatsapp',
    ctaHeadline1: 'De Portugal para o Mundo',
    ctaHeadline2: 'a precisão encontra a comodidade.',
    footerDesc: 'Sua lavanderia de Portugal para o mundo, focada em conforto, restauro têxtil avançado e extrema comodidade empresarial e residencial.',
    sysOp: 'Sistema Operacional 24/7',
    fRoutes: 'Rotas',
    fAgenda: 'Agendamento',
    fContact: 'Contactos',
    fLocation: 'Portugal',
    mTitle1: 'O que precisa lavar?',
    mSub1: 'Selecione o serviço ideal para um orçamento focado.',
    mBtn1: 'Continuar pedindo',
    mTitle2: 'Detalhes do Pedido',
    mSub2: 'Ajuda-nos a avaliar especificidades para um orçamento 100% preciso.',
    mUpload: 'Opcional: Faça o upload da foto do tapete',
    mLength: 'Comprimento (m)',
    mWidth: 'Largura (m)',
    mCep: 'Código Postal / CEP',
    mDetails: 'Detalhes da Peça (Qtd, Tecido)',
    mDetailsPlaceholder: 'Descreva brevemente o que precisa...',
    mBack: 'Voltar',
    mNext: 'Continuar',
    mTitle3: 'Quase finalizado',
    mSub3: 'Precisamos dos seus dados para enviar o orçamento personalizado de forma profissional.',
    mName: 'Nome',
    mLast: 'Sobrenome',
    mEmail: 'E-mail',
    mWpp: 'WhatsApp com DDD/Cód. País',
    mSubmit: 'Solicitar Orçamento'
  },
  br: {
    navServices: 'Serviços',
    navQuote: 'Orçamento',
    heroLead: 'A maioria da indústria foca apenas em lavar e entregar roupas...',
    heroT1: 'Nós focamos em ',
    heroTFreedom: 'liberdade',
    heroTAnd: ' e ',
    heroTTime: 'tempo',
    heroTFor: ' para ',
    heroYou: 'você',
    heroDesc: 'Da lavanderia tradicional e limpeza de tapetes à impermeabilização e tinturaria de alto nível. Um atendimento impecável para a sua empresa ou ',
    heroAcc: 'hospedagem local',
    heroBtn: 'Fazer Orçamento',
    servicesTitle: 'Tudo o que você precisa, num só lugar.',
    sSeco: 'Limpeza a Seco',
    sTapetes: 'Limpeza Tapetes',
    sCortinas: 'Limpeza Cortinados',
    sImper: 'Impermeabilização',
    sTinta: 'Tinturaria',
    sEdredoes: 'Edredons',
    sPacks: 'Pacotes',
    sCostura: 'Ajustes de Costura',
    sMedida: 'Roupa Sob Medida',
    b2bTitle: 'Soluções sob medida para Empresas',
    b2bDesc: 'Restaurantes, hospedagens locais, clínicas, academias e salões. Coleta, lavagem premium e entrega com planos recorrentes.',
    b2bBtn: 'Fale Conosco',
    ctaDesc: 'Nós não limpamos apenas as suas peças. Nós restauramos o seu valor através de procedimentos premium B2B, B2C e self-service de vanguarda 7h-23h.',
    ctaBtn: 'Orçamento via Whatsapp',
    ctaHeadline1: 'Do Brasil para o Mundo',
    ctaHeadline2: 'a precisão encontra a comodidade.',
    footerDesc: 'Sua lavanderia para o mundo, focada em conforto, restauro têxtil avançado e extrema comodidade empresarial e residencial.',
    sysOp: 'Sistema Operacional 24/7',
    fRoutes: 'Rotas',
    fAgenda: 'Agendamento',
    fContact: 'Contatos',
    fLocation: 'Portugal & Brasil',
    mTitle1: 'O que precisa lavar?',
    mSub1: 'Selecione o serviço ideal para um orçamento rápido.',
    mBtn1: 'Continuar pedindo',
    mTitle2: 'Detalhes do Pedido',
    mSub2: 'Ajuda a gente a entender melhor seu pedido para um orçamento preciso.',
    mUpload: 'Opcional: Envie uma foto do tapete',
    mLength: 'Comprimento (m)',
    mWidth: 'Largura (m)',
    mCep: 'CEP',
    mDetails: 'Detalhes da Peça (Qtd, Tecido)',
    mDetailsPlaceholder: 'Descreva brevemente o que precisa...',
    mBack: 'Voltar',
    mNext: 'Continuar',
    mTitle3: 'Quase lá',
    mSub3: 'Precisamos dos seus dados para enviar o seu orçamento personalizado.',
    mName: 'Nome',
    mLast: 'Sobrenome',
    mEmail: 'E-mail',
    mWpp: 'WhatsApp com DDD',
    mSubmit: 'Solicitar Orçamento'
  },
  en: {
    navServices: 'Services',
    navQuote: 'Get a Quote',
    heroLead: 'Most of the industry focuses only on washing and delivering clothes...',
    heroT1: 'We focus on ',
    heroTFreedom: 'freedom',
    heroTAnd: ' and ',
    heroTTime: 'time',
    heroTFor: ' for ',
    heroYou: 'you',
    heroDesc: 'From traditional laundry and carpet cleaning to top-tier waterproofing and dyeing. Impeccable service for your business or ',
    heroAcc: 'vacation rental',
    heroBtn: 'Get a Quote',
    servicesTitle: 'Everything you need, in one place.',
    sSeco: 'Dry Cleaning',
    sTapetes: 'Carpet Cleaning',
    sCortinas: 'Curtain Cleaning',
    sImper: 'Waterproofing',
    sTinta: 'Dyeing',
    sEdredoes: 'Comforters',
    sPacks: 'Packages',
    sCostura: 'Tailoring & Repairs',
    sMedida: 'Custom Clothing',
    b2bTitle: 'Tailored Solutions for Businesses',
    b2bDesc: 'Restaurants, vacation rentals, clinics, gyms, and salons. Premium collection, washing, and delivery with recurring plans.',
    b2bBtn: 'Contact Us',
    ctaDesc: 'We don\'t just clean your garments. We restore their value through premium B2B, B2C vanguard procedures and 7am-11pm self-service.',
    ctaBtn: 'Quote via WhatsApp',
    ctaHeadline1: 'From Portugal to the World',
    ctaHeadline2: 'precision meets convenience.',
    footerDesc: 'Your laundry service from Portugal to the world, focused on comfort, advanced textile restoration, and extreme convenience for businesses & homes.',
    sysOp: 'Operating System 24/7',
    fRoutes: 'Routes',
    fAgenda: 'Scheduling',
    fContact: 'Contact Us',
    fLocation: 'Worldwide',
    mTitle1: 'What do you need washed?',
    mSub1: 'Select the ideal service for a tailored quote.',
    mBtn1: 'Continue',
    mTitle2: 'Order Details',
    mSub2: 'Help us assess specifics for a 100% accurate quote.',
    mUpload: 'Optional: Upload a photo of the carpet',
    mLength: 'Length (m)',
    mWidth: 'Width (m)',
    mCep: 'Zip / Postal Code',
    mDetails: 'Item Details (Qty, Fabric)',
    mDetailsPlaceholder: 'Briefly describe what you need...',
    mBack: 'Back',
    mNext: 'Continue',
    mTitle3: 'Almost done',
    mSub3: 'We need your details to send the customized professional quote.',
    mName: 'First Name',
    mLast: 'Last Name',
    mEmail: 'Email',
    mWpp: 'WhatsApp with Country Code',
    mSubmit: 'Request Quote'
  }
};

const EdsonLogo = ({ className }) => (
  <svg viewBox="0 0 290 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 25C15 16.7157 21.7157 10 30 10H40C48.2843 10 55 16.7157 55 25C55 33.2843 48.2843 40 40 40H30C21.7157 40 15 33.2843 15 25Z" stroke="#25AAE1" strokeWidth="4"/>
    <circle cx="35" cy="25" r="5" fill="#25AAE1"/>
    <path d="M22 30C26 35 32 38 48 30" stroke="#25AAE1" strokeWidth="3" strokeLinecap="round"/>
    <text x="70" y="34" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="800" fill="#1A1A1A" letterSpacing="-0.5">Edson</text>
    <text x="150" y="34" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="300" fill="#25AAE1" letterSpacing="0">Lavanderia</text>
  </svg>
);

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [lang, setLang] = useState('pt');
  const mainRef = useRef(null);
  
  const t = translations[lang];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Navbar Transition 
      ScrollTrigger.create({
        trigger: "#manifesto-hero",
        start: "bottom top",
        onEnter: () => gsap.to(".navbar", { backgroundColor: "rgba(255,255,255,0.85)", borderColor: "rgba(0,0,0,0.08)", backdropFilter: "blur(20px)" }),
        onLeaveBack: () => gsap.to(".navbar", { backgroundColor: "transparent", borderColor: "transparent" })
      });

      // Split Text Manifesto Reveal 
      gsap.from(".philo-line", {
        y: 30, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.2
      });

      // Manifesto Parallax
      gsap.fromTo(".parallax-bg",
        { yPercent: -10 },
        { scrollTrigger: { trigger: "#manifesto-hero", scrub: true }, yPercent: 10, ease: "none" }
      );

      // Antigo Hero (agora CTA Section mais abaixo)
      gsap.from(".hero-text-split", {
        scrollTrigger: { trigger: "#cta-section", start: "top 60%" },
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out"
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-background min-h-screen relative text-textPrimary">
      <div className="noise-overlay"></div>

      {/* NAVBAR */}
      <nav className="navbar fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-2 rounded-[2rem] w-[92%] max-w-6xl transition-all duration-300 border border-transparent bg-white/40 backdrop-blur-sm shadow-sm hover:bg-white/70">
        <div className="cursor-pointer hover-lift flex items-center">
          <EdsonLogo className="h-10 md:h-12 w-auto" />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="font-mono text-sm uppercase tracking-widest text-dark hover:text-primary transition-colors font-bold">{t.navServices}</a>
          
          <div className="flex items-center gap-3 border-l border-dark/10 pl-8">
            <button onClick={() => setLang('pt')} className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all shadow-sm ${lang === 'pt' ? 'border-primary opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`} title="Português (PT)">
              <img src="https://flagcdn.com/w80/pt.png" alt="PT" className="w-full h-full object-cover" />
            </button>
            <button onClick={() => setLang('br')} className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all shadow-sm ${lang === 'br' ? 'border-primary opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`} title="Português (BR)">
              <img src="https://flagcdn.com/w80/br.png" alt="BR" className="w-full h-full object-cover" />
            </button>
            <button onClick={() => setLang('en')} className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all shadow-sm ${lang === 'en' ? 'border-primary opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`} title="English (US)">
              <img src="https://flagcdn.com/w80/us.png" alt="US" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="hidden sm:flex magnetic-btn bg-primary text-white font-medium px-5 py-2.5 rounded-full text-sm shadow-[0_0_20px_rgba(37,170,225,0.25)] hover:shadow-[0_0_30px_rgba(37,170,225,0.45)]"
        >
          {t.navQuote}
        </button>
      </nav>

      {/* SEÇÃO 1 - PHILOSOPHY (Manifesto - Fundo Claro com Máquinas) */}
      <section id="manifesto-hero" className="relative h-[100dvh] w-full flex items-center justify-center px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1604335398980-ededcadcc37d?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxMXx8bGF1bmRyeSUyMHNlcnZpY2V8ZW58MHx8fHwxNzMwNDc2Mjc2fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1920"
            alt="Lavanderia"
            className="parallax-bg w-full h-[150%] object-cover opacity-40 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90"></div>
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
            onClick={() => setModalOpen(true)}
            className="philo-line magnetic-btn bg-primary text-white font-medium px-8 py-4 rounded-full text-lg w-auto inline-flex items-center gap-3 font-heading shadow-[0_4px_20px_rgba(37,170,225,0.35)] hover:shadow-[0_4px_30px_rgba(37,170,225,0.5)]"
          >
            {t.heroBtn} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* SEÇÃO 2 - SERVIÇOS — Grid com 9 fotos originais Washlab */}
      <section id="features" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="font-mono text-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">{t.navServices}</h2>
          <h3 className="font-heading text-4xl md:text-5xl text-dark font-bold">{t.servicesTitle}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 max-w-5xl mx-auto">
          {[
            { name: t.sSeco, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/shop-1746862-YKb6l9oDZZhkaBZq.jpg' },
            { name: t.sTapetes, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-mjEvGEGLEBFLDpMR.png' },
            { name: t.sCortinas, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-AVLpaLQD7vsx8l6k.png' },
            { name: t.sImper, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-dJo6bowZXDtpVX64.png' },
            { name: t.sTinta, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-YanyJngRg1SZkMw8.png' },
            { name: t.sEdredoes, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-Yg2Wy26Mx5uVWnM4.png' },
            { name: t.sPacks, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-AE0or0gQ4eHpbexP.png' },
            { name: t.sCostura, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-Y4LVvLa4yPfyR22Z.png' },
            { name: t.sMedida, image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=360,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-mv0DJ0ZGQacj6Kyg.png' }
          ].map((srv) => (
            <div
              key={srv.name}
              onClick={() => setModalOpen(true)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-4 bg-gray-100 shadow-md">
                <img src={srv.image} alt={srv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <h4 className="font-heading text-sm sm:text-base font-bold text-dark underline decoration-1 underline-offset-4 group-hover:text-primary transition-colors text-center w-full">
                {srv.name}
              </h4>
            </div>
          ))}
        </div>

        {/* SEÇÃO 3 - Banner Empresas (B2B & Alojamentos) */}
        <div className="mt-20 bg-surfaceDark rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative shadow-2xl">
          <div className="flex-1 relative z-10 w-full">
            <h4 className="font-mono text-primary text-xs uppercase tracking-[0.2em] mb-3 font-bold">B2B</h4>
            <h5 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">{t.b2bTitle}</h5>
            <p className="font-body text-white/70 mb-6 leading-relaxed max-w-lg text-lg">
              {t.b2bDesc}
            </p>
            <button onClick={() => setModalOpen(true)} className="magnetic-btn bg-primary text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(37,170,225,0.35)]">
              {t.b2bBtn} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full relative z-10">
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=500,fit=crop/YZ9Vj5wQjGFEQQ7J/generated/generated-m2WpE65pZku9JrX8.png" alt="Serviço Empresas Cama" className="w-full h-[300px] rounded-2xl object-cover shadow-2xl scale-100 md:scale-110 transform md:-rotate-2" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-surfaceDark via-surfaceDark/90 to-transparent z-0"></div>
        </div>
      </section>

      {/* SEÇÃO 4 - CTA SECTION */}
      <section id="cta-section" className="relative min-h-[80vh] w-full flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxNXx8bHV4dXJ5JTIwZGFyayUyMHRleHR1cmV8ZW58MHx8fHwxNzI1MzExNjYwfDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1920"
            alt="Interior premium resort"
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
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
            onClick={() => setModalOpen(true)}
            className="hero-text-split magnetic-btn bg-dark text-white font-medium px-8 py-4 rounded-full text-lg w-auto inline-flex items-center gap-3 font-heading shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          >
            {t.ctaBtn} <ArrowRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      </section>

      {/* SEÇÃO 6 - FOOTER */}
      <footer className="bg-surfaceDark pt-24 pb-12 px-6 md:px-12 relative z-20 rounded-t-[4rem] border-t-4 border-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <EdsonLogo className="h-10 object-contain mb-6 brightness-0 invert opacity-90" />
            <p className="text-white/50 font-body mb-8 max-w-sm">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-max">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono tracking-widest text-xs uppercase text-white/80 font-bold">{t.sysOp}</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-primary mb-6 uppercase font-bold">{t.fRoutes}</h4>
            <ul className="space-y-4 font-body text-white/70">
              <li><button onClick={() => setModalOpen(true)} className="hover:text-primary transition-colors cursor-pointer text-left">{t.fAgenda}</button></li>
              <li><a href="#features" className="hover:text-primary transition-colors cursor-pointer">Serviços</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-primary mb-6 uppercase font-bold">{t.fContact}</h4>
            <ul className="space-y-4 font-body text-white/70">
              <li className="flex items-center gap-2"><Navigation className="w-4 h-4 text-primary" /> {t.fLocation}</li>
              <li><a href="mailto:info@washlab.pt" className="hover:text-primary transition-colors">info@washlab.pt</a></li>
              <li><a href="tel:+351925680791" className="hover:text-primary transition-colors">+351 925 680 791</a></li>
              <li className="mt-6 flex"><a href="https://instagram.com/washlabpt" target="_blank" rel="noreferrer" className="p-3 bg-primary/10 border border-primary/20 rounded-full hover:bg-primary transition-colors group">
                <svg className="w-5 h-5 text-primary group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* MODAL GLOBAL */}
      <ModalOrcamento isOpen={isModalOpen} onClose={() => setModalOpen(false)} lang={lang} t={t} />
    </div>
  );
}
