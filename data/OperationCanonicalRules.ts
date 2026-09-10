export type CanonicalOperationRule = {
  canonical: string;
  primaryParent: string;
  aliases?: string[];
  appearsUnder?: string[];
};

// Operation detail pages use standalone flat URLs under /{lang}/services/{operation-slug}.
// These rules lock one canonical URL per commercial intent so aliases and cross-solution
// appearances never create duplicate indexable pages.
export const canonicalOperationRules: CanonicalOperationRule[] = [
  { canonical: "marketing-automation", primaryParent: "integrated-consulting", aliases: ["marketing-automation-strategy"], appearsUnder: ["integrated-consulting", "b2b-marketing"] },
  { canonical: "marketing-attribution", primaryParent: "performance-marketing", aliases: ["measurement-attribution-strategy", "attribution-funnel-measurement"], appearsUnder: ["integrated-consulting", "performance-marketing", "conversion-funnel-optimization"] },
  { canonical: "google-ads-management", primaryParent: "performance-marketing", aliases: ["search-ads-management", "b2b-google-ads-management"], appearsUnder: ["performance-marketing", "b2b-marketing"] },
  { canonical: "programmatic-advertising", primaryParent: "performance-marketing", aliases: ["b2b-programmatic-advertising"], appearsUnder: ["performance-marketing", "b2b-marketing"] },
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

  // Additional high-intent standalone operations approved for the operation-page SEO layer.
  { canonical: "marketplace-management", primaryParent: "ecommerce-growth", aliases: ["ecommerce-marketplace-management"] },
  { canonical: "trendyol-management", primaryParent: "ecommerce-growth", aliases: ["trendyol-marketplace-management"] },
  { canonical: "amazon-marketplace-management", primaryParent: "ecommerce-growth" },
  { canonical: "marketplace-seo", primaryParent: "ecommerce-growth" },
  { canonical: "ecommerce-operations-management", primaryParent: "ecommerce-growth", aliases: ["e-commerce-operations-management"] },
  { canonical: "product-listing-optimization", primaryParent: "ecommerce-growth", aliases: ["marketplace-listing-optimization"] },
  { canonical: "meta-ads-management", primaryParent: "performance-marketing", aliases: ["facebook-instagram-ads-management", "facebook-ads-management", "instagram-ads-management"] },
  { canonical: "tiktok-ads-management", primaryParent: "performance-marketing" },
  { canonical: "linkedin-ads-management", primaryParent: "performance-marketing", appearsUnder: ["performance-marketing", "b2b-marketing"] },
  { canonical: "google-performance-max-management", primaryParent: "performance-marketing", aliases: ["performance-max-management", "pmax-management"] },
  { canonical: "google-shopping-ads-management", primaryParent: "performance-marketing", aliases: ["shopping-ads-management"] },
  { canonical: "social-media-management", primaryParent: "design-creative" },
  { canonical: "video-production", primaryParent: "design-creative" },
  { canonical: "product-photography", primaryParent: "design-creative" },
  { canonical: "packaging-design", primaryParent: "design-creative" },
  { canonical: "technical-seo", primaryParent: "seo-organic-growth" },
  { canonical: "ecommerce-seo", primaryParent: "seo-organic-growth", aliases: ["e-commerce-seo"] },
  { canonical: "local-seo", primaryParent: "seo-organic-growth" },
  { canonical: "seo-audit", primaryParent: "seo-organic-growth" },
  { canonical: "corporate-website-development", primaryParent: "digital-products-software-development", aliases: ["corporate-web-development"] },
  { canonical: "ecommerce-website-development", primaryParent: "digital-products-software-development", aliases: ["e-commerce-website-development"] },
  { canonical: "landing-page-development", primaryParent: "digital-products-software-development" },
  { canonical: "custom-software-development", primaryParent: "digital-products-software-development" },
];

export const publicOperationLabelOverrides: Record<string, { tr: string; en: string }> = {
  "fulfillment-logistics-operations": {
    tr: "Fulfillment & Lojistik Koordinasyonu",
    en: "Fulfillment & Logistics Coordination",
  },
};
