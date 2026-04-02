import en from './locales/en/ui.json';
import es from './locales/es/ui.json';

export type Locale = 'en' | 'es';

export const translations = { en, es } as const;

export type Translations = typeof en;

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
