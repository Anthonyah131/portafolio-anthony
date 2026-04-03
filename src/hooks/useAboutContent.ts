import { useMemo } from 'react';
import type { PersonalInfo } from '../types/portfolio';

type TimelineLabels = {
  educationLabel: string;
  experienceLabel: string;
  educationStatus: string;
};

export function useAboutContent(personal: PersonalInfo, labels: TimelineLabels) {
  const timelineItems = useMemo(
    () => [
      {
        key: 'education',
        icon: '🎓',
        title: labels.educationLabel,
        primary: personal.education.degree,
        secondary: personal.education.institution,
        tertiary: labels.educationStatus,
      },
      {
        key: 'experience',
        icon: '💼',
        title: labels.experienceLabel,
        primary: personal.experience.role,
        secondary: personal.experience.company,
        tertiary: personal.experience.period,
      },
    ],
    [
      labels.educationLabel,
      labels.experienceLabel,
      labels.educationStatus,
      personal.education.degree,
      personal.education.institution,
      personal.experience.role,
      personal.experience.company,
      personal.experience.period,
    ],
  );

  const interests = useMemo(() => personal.interests, [personal.interests]);

  return { timelineItems, interests };
}