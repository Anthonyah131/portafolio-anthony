import { useMemo } from 'react';
import type { PersonalInfo } from '../types/portfolio';

export function useAboutContent(personal: PersonalInfo) {
  const timelineItems = useMemo(
    () => [
      {
        key: 'education',
        icon: '🎓',
        title: 'Education',
        primary: personal.education.degree,
        secondary: personal.education.institution,
        tertiary: personal.education.status,
      },
      {
        key: 'experience',
        icon: '💼',
        title: 'Experience',
        primary: personal.experience.role,
        secondary: personal.experience.company,
        tertiary: personal.experience.period,
      },
    ],
    [
      personal.education.degree,
      personal.education.institution,
      personal.education.status,
      personal.experience.role,
      personal.experience.company,
      personal.experience.period,
    ],
  );

  const interests = useMemo(() => personal.interests, [personal.interests]);

  return { timelineItems, interests };
}