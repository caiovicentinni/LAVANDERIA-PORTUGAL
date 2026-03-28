'use client';

import { useState, useCallback } from 'react';
import { translations, type Lang, type Translations } from '@/lib/translations';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('pt');

  const t: Translations = translations[lang];

  const changeLang = useCallback((newLang: Lang) => {
    setLang(newLang);
  }, []);

  return { lang, t, changeLang };
}
