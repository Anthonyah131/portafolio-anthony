export function getProjectTransitionNames(slug: string) {
  return {
    poster: `project-poster-${slug}`,
    title: `project-title-${slug}`,
  };
}