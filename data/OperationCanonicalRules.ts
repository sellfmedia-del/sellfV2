export type CanonicalOperationRule = {
  canonical: string;
  primaryParent: string;
  aliases?: string[];
  appearsUnder?: string[];
};

// Operation pages are a later implementation wave. These rules lock the SEO architecture now
// so duplicated intents never become duplicated canonical URLs later.
export const canonicalOperationRules: CanonicalOperationRule[] = [
  { canonical: "marketing-automation", primaryParent: "integrated-consulting", aliases: ["marketing-automation-strategy"], appearsUnder: ["integrated-consulting", "b2b-marketing"] },
  { canonical: "marketing-attribution", primaryParent: "performance-marketing", aliases: ["measurement-attribution-strategy", "attribution-funnel-measurement"], appearsUnder: ["integrated-consulting", "performance-marketing", "conversion-funnel-optimization"] },
  { canonical: "google-ads-management", primaryParent: "performance-marketing", aliases: ["search-ads-management", "b2b-google-ads-management"] },
  { canonical: "programmatic-advertising", primaryParent: "performance-marketing", aliases: ["b2b-programmatic-advertising"] },
  { canonical: "performance-creative", primaryParent: "performance-marketing", aliases: ["performance-creative-production"], appearsUnder: ["performance-marketing", "design-creative"] },
  { canonical: "product-feed-management-optimization", primaryParent: "ecommerce-growth", aliases: ["product-feed-optimization", "product-feed-management"], appearsUnder: ["ecommerce-growth", "performance-marketing"] },
  { canonical: "ui-ux-design", primaryParent: "digital-products-software-development", appearsUnder: ["digital-products-software-development", "design-creative"] },
  { canonical: "international-seo", primaryParent: "seo-organic-growth", appearsUnder: ["seo-organic-growth", "export-international-growth"] },
  { canonical: "b2b-seo", primaryParent: "seo-organic-growth", appearsUnder: ["seo-organic-growth", "b2b-marketing"] },
  { canonical: "cross-border-ecommerce", primaryParent: "ecommerce-growth", appearsUnder: ["ecommerce-growth", "export-international-growth"] },
  { canonical: "sales-funnel-optimization", primaryParent: "conversion-funnel-optimization", appearsUnder: ["conversion-funnel-optimization", "b2b-marketing"] },
  { canonical: "funnel-architecture", primaryParent: "conversion-funnel-optimization", appearsUnder: ["conversion-funnel-optimization", "integrated-consulting"] },
  { canonical: "ecommerce-conversion-optimization", primaryParent: "conversion-funnel-optimization", appearsUnder: ["conversion-funnel-optimization", "ecommerce-growth"] },
  { canonical: "checkout-optimization", primaryParent: "conversion-funnel-optimization", appearsUnder: ["conversion-funnel-optimization", "ecommerce-growth"] },
  { canonical: "pricing-strategy", primaryParent: "growth-management-consulting", appearsUnder: ["growth-management-consulting", "ecommerce-growth"] },
  { canonical: "email-marketing", primaryParent: "b2b-marketing", aliases: ["email-marketing-for-ecommerce"], appearsUnder: ["b2b-marketing", "ecommerce-growth"] },
  { canonical: "crisis-communication", primaryParent: "pr-crisis-management", aliases: ["crisis-management", "crisis-preparedness-response-planning"] },
  { canonical: "ai-search-generative-engine-optimization", primaryParent: "seo-organic-growth", aliases: ["ai-search-optimization", "geo", "ai-visibility-llm-search-optimization"] },
  { canonical: "ab-testing", primaryParent: "conversion-funnel-optimization", aliases: ["multivariate-testing"] },
  { canonical: "motion-design-motion-graphics", primaryParent: "design-creative", aliases: ["motion-design", "motion-graphics", "2d-animation"] },
  { canonical: "marketplace-advertising", primaryParent: "ecommerce-growth", appearsUnder: ["ecommerce-growth", "performance-marketing"] },
  { canonical: "retail-media-management", primaryParent: "ecommerce-growth", appearsUnder: ["ecommerce-growth", "performance-marketing"] },
];

export const publicOperationLabelOverrides: Record<string, { tr: string; en: string }> = {
  "fulfillment-logistics-operations": {
    tr: "Fulfillment & Lojistik Koordinasyonu",
    en: "Fulfillment & Logistics Coordination",
  },
};
