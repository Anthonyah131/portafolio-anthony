import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { type Locale, type Translations, getTranslations } from '../i18n';

const STORAGE_KEY = 'portfolio-lang';

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (fromQuery === 'en' || fromQuery === 'es') return fromQuery;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  }
  return 'en';
}

type LanguageContextValue = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = getTranslations(locale);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/en/projects/') || path.startsWith('/es/projects/')) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('lang') === locale) return;

    params.set('lang', locale);
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
