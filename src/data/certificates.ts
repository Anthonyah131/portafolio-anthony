import type { Certificate } from "../types/portfolio";
import type { Locale } from "../i18n";
import certificatesEn from "../i18n/locales/en/certificates.json";
import certificatesEs from "../i18n/locales/es/certificates.json";

const certificatesByLocale: Record<Locale, Certificate[]> = {
  en: certificatesEn as Certificate[],
  es: certificatesEs as Certificate[],
};

export const certificates: Certificate[] = certificatesByLocale.en;

export function getCertificates(locale: Locale): Certificate[] {
  return certificatesByLocale[locale] ?? certificatesByLocale.en;
}
