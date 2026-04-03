export const TALL_INDICES = new Set([0, 3, 6]);

export const PROJECT_TABS = ['projects', 'certificates'] as const;
export type Tab = (typeof PROJECT_TABS)[number];
