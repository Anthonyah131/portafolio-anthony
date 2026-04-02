import type { PersonalInfo } from '../types/portfolio';
import type { Locale } from '../i18n';
import personalEn from '../i18n/locales/en/personal.json';
import personalEs from '../i18n/locales/es/personal.json';

const personalByLocale: Record<Locale, PersonalInfo> = {
  en: personalEn as PersonalInfo,
  es: personalEs as PersonalInfo,
};

export const personal: PersonalInfo = personalByLocale.en;

export function getPersonal(locale: Locale): PersonalInfo {
  return personalByLocale[locale] ?? personalByLocale.en;
}
