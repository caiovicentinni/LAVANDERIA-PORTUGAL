'use client';

import EdsonLogo from './EdsonLogo';
import type { Lang, Translations } from '@/lib/translations';

interface NavbarProps {
  t: Translations;
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
  onOpenModal: () => void;
}

export default function Navbar({ t, lang, onChangeLang, onOpenModal }: NavbarProps) {
  const flags: { code: Lang; src: string; title: string }[] = [
    { code: 'pt', src: 'https://flagcdn.com/w80/pt.png', title: 'Português (PT)' },
    { code: 'br', src: 'https://flagcdn.com/w80/br.png', title: 'Português (BR)' },
    { code: 'en', src: 'https://flagcdn.com/w80/us.png', title: 'English (US)' },
  ];

  return (
    <nav className="navbar fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-2 rounded-[2rem] w-[92%] max-w-6xl transition-all duration-300 border border-transparent bg-white/40 backdrop-blur-sm shadow-sm hover:bg-white/70">
      <div className="cursor-pointer hover-lift flex items-center">
        <EdsonLogo className="h-10 md:h-12 w-auto" />
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="font-mono text-sm uppercase tracking-widest text-dark hover:text-primary transition-colors font-bold">
          {t.navServices}
        </a>

        <div className="flex items-center gap-3 border-l border-dark/10 pl-8">
          {flags.map(f => (
            <button
              key={f.code}
              onClick={() => onChangeLang(f.code)}
              className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all shadow-sm ${lang === f.code ? 'border-primary opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
              title={f.title}
            >
              <img src={f.src} alt={f.code.toUpperCase()} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onOpenModal}
        className="hidden sm:flex magnetic-btn bg-primary text-white font-medium px-5 py-2.5 rounded-full text-sm shadow-[0_0_20px_rgba(37,170,225,0.25)] hover:shadow-[0_0_30px_rgba(37,170,225,0.45)]"
      >
        {t.navQuote}
      </button>
    </nav>
  );
}
