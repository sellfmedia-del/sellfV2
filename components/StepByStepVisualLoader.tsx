"use client";

import { useEffect } from "react";

const HERO_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/7025a255-7d53-4b90-8848-63a6cea4fdb8/7025a255-7d53-4b90-8848-63a6cea4fdb8.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOWYzOGVjZTcxZGE2YTNhNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMzNjgwN30.-GAF16jU234lwLI4cNZJ01HK1s2PaFa8v--S1xOarhM";
const SETUP_VISUAL = "https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3.1-flash-lite-image/images/68371fd1-2d73-4abe-8452-180045cef5a4/ed3e6dca-71a8-4e77-bf6f-57bf7ff92ccd/Reconstruct__input_as_a_crisp_high_fidelity_version_of_the_e.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGFhNDNiYTFmOTQ2NTcyYyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM3NjkyOX0.9lAgP3MpYXwwa3hnrf24goS3eWH0QPx1Pcw7yBJarnY";
const PAIN_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmVkNjU1MTgxOGI1YTU4NyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM4NTc1Mn0.darnQrCmtk1Y5qVj_MBYrErwFtES1yehublZwbTD1No";
const EXPANSION_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/6ce8b096-f07d-41af-a697-2b5502515133.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzQwOWE5MzgxOWVmZmM0OSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM2OTQwMH0.BFfa-8FBVfte5rFBjx2kMsjS2UN3gLxwQ38dPNGruC4";
const AGING_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/ec8fb010-6207-419e-83c6-6ee3f4214c93.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOTA5Y2Q4ODhlYzQwNWFiZiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM0Mzc1Mn0.D0qc6fmr36ZMRM2yxCmbHX7W4Wcql4xJYIhGJya7cfE";

const stages = [
  { name: "development", src: null },
  { name: "setup", src: SETUP_VISUAL },
  { name: "maturity", src: null },
  { name: "pain", src: PAIN_VISUAL },
  { name: "expansion", src: EXPANSION_VISUAL },
  { name: "aging", src: AGING_VISUAL },
  { name: "repeat", src: null },
] as const;

function mountImage(target: HTMLElement, src: string, eager = false) {
  if (target.querySelector("img[data-step-image]")) return;

  const image = document.createElement("img");
  image.dataset.stepImage = "true";
  image.src = src;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  image.decoding = "async";
  image.loading = eager ? "eager" : "lazy";
  image.fetchPriority = eager ? "high" : "low";
  image.className = "stepByStepDeferredImage";
  target.prepend(image);
}

export default function StepByStepVisualLoader() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".stepByStepNativeVisuals");
    if (!root) return;

    const hero = root.querySelector<HTMLElement>("[class*='heroVisual']");
    if (hero) {
      hero.dataset.stepVisual = "hero";
      mountImage(hero, HERO_VISUAL, true);
    }

    const visuals = Array.from(
      root.querySelectorAll<HTMLElement>("[class*='stages'] > [class*='stage'] > [class*='visual']")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          const src = element.dataset.stepSrc;
          if (src) mountImage(element, src);
          observer.unobserve(element);
        }
      },
      { rootMargin: "500px 0px" }
    );

    visuals.forEach((visual, index) => {
      const config = stages[index];
      if (!config) return;
      visual.dataset.stepVisual = config.name;
      if (!config.src) return;
      visual.dataset.stepSrc = config.src;
      observer.observe(visual);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
