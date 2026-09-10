export type OperationLang = "tr" | "en";

export type OperationLocalizedText = {
  tr: string;
  en: string;
};

export type OperationCard = {
  title: OperationLocalizedText;
  body: OperationLocalizedText;
};

export type OperationFaq = {
  question: OperationLocalizedText;
  answer: OperationLocalizedText;
};

export type OperationEvidence = {
  title: OperationLocalizedText;
  body: OperationLocalizedText;
};

export type OperationContent = {
  slug: string;
  label: OperationLocalizedText;
  primaryParent: string;
  seoTitle: OperationLocalizedText;
  metaDescription: OperationLocalizedText;
  heroTitle: OperationLocalizedText;
  heroDescription: OperationLocalizedText;
  queryThemes: OperationLocalizedText[];
  snapshot: {
    what: OperationLocalizedText;
    whoFor: OperationLocalizedText;
    manages: OperationLocalizedText;
    outcome: OperationLocalizedText;
  };
  scopeIntro: OperationLocalizedText;
  problems: OperationCard[];
  scope: OperationCard[];
  process: OperationCard[];
  evidence: OperationEvidence[];
  decisions: OperationFaq[];
  faq: OperationFaq[];
  relatedSlugs: string[];
  cta: {
    title: OperationLocalizedText;
    description: OperationLocalizedText;
    label: OperationLocalizedText;
  };
};
