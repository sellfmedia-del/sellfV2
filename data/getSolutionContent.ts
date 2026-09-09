import { solutionContent, type SolutionContent } from "@/data/SolutionContent";
import { solutionContentOverrides } from "@/data/SolutionContentOverrides";

const metricRatioCorrections: Record<
  string,
  Record<number, { tr: string; en: string }>
> = {
  "integrated-consulting": {
    0: { tr: "1:7", en: "1:7" },
  },
  "performance-marketing": {
    0: { tr: "1:7", en: "1:7" },
    1: { tr: "1:13", en: "1:13" },
  },
  "conversion-funnel-optimization": {
    0: { tr: "1:7", en: "1:7" },
  },
};

function applyMetricRatioCorrections(slug: string, content: SolutionContent): SolutionContent {
  const corrections = metricRatioCorrections[slug];
  if (!corrections) return content;

  return {
    ...content,
    metrics: content.metrics.map((metric, index) =>
      corrections[index]
        ? {
            ...metric,
            value: corrections[index],
          }
        : metric,
    ),
  };
}

export function getSolutionContent(slug: string): SolutionContent | undefined {
  const base = solutionContent[slug];
  if (!base) return undefined;

  const override = solutionContentOverrides[slug];
  const content = override
    ? ({
        ...base,
        ...override,
      } as SolutionContent)
    : base;

  return applyMetricRatioCorrections(slug, content);
}
