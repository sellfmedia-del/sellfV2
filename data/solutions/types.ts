export type SupportedLang = "tr" | "en";
export type SolutionSection = { title: string; lines: string[] };
export type SolutionFaq = { q: string; a: string };
export type SolutionLocaleData = { title: string; seoTitle: string; metaDescription: string; slug: string; hero: { title: string; lines: string[] }; sections: SolutionSection[]; faq: SolutionFaq[]; relatedSlugs: string[]; cta: { title: string; description: string; label: string }; };
export type SolutionPageData = { slug: string; order: number; tr: SolutionLocaleData; en: SolutionLocaleData };
