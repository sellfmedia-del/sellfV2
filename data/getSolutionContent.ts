import { solutionContent, type SolutionContent } from "@/data/SolutionContent";
import { solutionContentOverrides } from "@/data/SolutionContentOverrides";

export function getSolutionContent(slug: string): SolutionContent | undefined {
  const base = solutionContent[slug];
  if (!base) return undefined;

  const override = solutionContentOverrides[slug];
  if (!override) return base;

  return {
    ...base,
    ...override,
  } as SolutionContent;
}
