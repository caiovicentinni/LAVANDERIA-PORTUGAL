'use client';

import { Navigation } from 'lucide-react';
import EdsonLogo from './EdsonLogo';
import type { Translations } from '@/lib/translations';

interface FooterProps {
  t: Translations;
  onOpenModal: () => void;
}

export default function Footer({ t, onOpenModal }: FooterProps) {
  return (
    <footer className="bg-surfaceDark pt-24 pb-12 px-6 md:px-12 relative z-20 rounded-t-[4rem] border-t-4 border-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <EdsonLogo className="h-10 object-contain mb-6 brightness-0 invert opacity-90" />
          <p className="text-white/50 font-body mb-8 max-w-sm">{t.footerDesc}</p>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-max">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono tracking-widest text-xs uppercase text-white/80 font-bold">{t.sysOp}</span>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-primary mb-6 uppercase font-bold">{t.fRoutes}</h4>
          <ul className="space-y-4 font-body text-white/70">
            <li><button onClick={onOpenModal} className="hover:text-primary transition-colors cursor-pointer text-left">{t.fAgenda}</button></li>
            <li><a href="#features" className="hover:text-primary transition-colors cursor-pointer">{t.navServices}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-primary mb-6 uppercase font-bold">{t.fContact}</h4>
          <ul className="space-y-4 font-body text-white/70">
            <li className="flex items-center gap-2"><Navigation className="w-4 h-4 text-primary" /> {t.fLocation}</li>
            <li><a href="mailto:info@washlab.pt" className="hover:text-primary transition-colors">info@washlab.pt</a></li>
            <li><a href="tel:+351925680791" className="hover:text-primary transition-colors">+351 925 680 791</a></li>
            <li className="mt-6 flex">
              <a href="https://instagram.com/washlabpt" target="_blank" rel="noreferrer" className="p-3 bg-primary/10 border border-primary/20 rounded-full hover:bg-primary transition-colors group">
                <svg className="w-5 h-5 text-primary group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
