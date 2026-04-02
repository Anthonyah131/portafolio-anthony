import type { Project } from "../types/portfolio";
import type { Locale } from "../i18n";
import projectsEn from "../i18n/locales/en/projects.json";
import projectsEs from "../i18n/locales/es/projects.json";

const projectsByLocale: Record<Locale, Project[]> = {
  en: projectsEn as Project[],
  es: projectsEs as Project[],
};

export const projects: Project[] = projectsByLocale.en;

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale] ?? projectsByLocale.en;
}

export function getProject(slug: string, locale: Locale = "en"): Project | undefined {
  return getProjects(locale).find((item) => item.slug === slug);
}

export function getProjectPagination(slug: string, locale: Locale = "en") {
  const localized = getProjects(locale);
  const currentIndex = localized.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) {
    return { previous: undefined, next: undefined, index: -1, total: localized.length };
  }

  return {
    previous: currentIndex > 0 ? localized[currentIndex - 1] : undefined,
    next: currentIndex < localized.length - 1 ? localized[currentIndex + 1] : undefined,
    index: currentIndex,
    total: localized.length,
  };
}
