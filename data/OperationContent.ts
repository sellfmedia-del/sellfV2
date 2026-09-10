import { creativeDigitalOperationContent } from "@/data/OperationContentCreativeDigital";
import { ecommerceOperationContent } from "@/data/OperationContentEcommerce";
import { performanceOperationContent } from "@/data/OperationContentPerformance";
import { seoOperationContent } from "@/data/OperationContentSeo";
import { strategyOperationContent } from "@/data/OperationContentStrategy";
import type { OperationContent } from "@/data/OperationContentTypes";

export type {
  OperationCard,
  OperationContent,
  OperationEvidence,
  OperationFaq,
  OperationLang,
  OperationLocalizedText,
} from "@/data/OperationContentTypes";

const allOperationContent: OperationContent[] = [
  ...strategyOperationContent,
  ...performanceOperationContent,
  ...ecommerceOperationContent,
  ...seoOperationContent,
  ...creativeDigitalOperationContent,
];

export const operationContent: Record<string, OperationContent> = Object.fromEntries(
  allOperationContent.map((item) => [item.slug, item]),
);

export const operationSlugs = allOperationContent.map((item) => item.slug);

export function getOperationContent(slug: string): OperationContent | undefined {
  return operationContent[slug];
}

export function getOperationContentByDisplayLabel(label: string): OperationContent | undefined {
  const normalized = label.trim().toLocaleLowerCase("en-US");
  return allOperationContent.find(
    (item) => item.label.en.trim().toLocaleLowerCase("en-US") === normalized,
  );
}
