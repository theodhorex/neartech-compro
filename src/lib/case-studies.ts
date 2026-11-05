/** Slug URL tiap studi kasus, berurutan sama dengan `caseStudies.items` di messages. */
export const CASE_STUDY_SLUGS = [
  "fleet-logistics",
  "portfolio-management",
  "b2b-procurement",
] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export const caseStudyIndex = (slug: string) =>
  (CASE_STUDY_SLUGS as readonly string[]).indexOf(slug);
