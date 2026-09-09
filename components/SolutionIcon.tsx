import type { SVGProps } from "react";

type Props = {
  slug: string;
  size?: number;
  className?: string;
};

export default function SolutionIcon({ slug, size = 32, className }: Props) {
  const common: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  switch (slug) {
    case "integrated-consulting":
      return <svg {...common}><path d="M5 25V15M11 25V10M17 25V17M23 25V6"/><path d="M4 27h24"/><path d="m5 12 6-5 6 5 8-7"/></svg>;
    case "export-international-growth":
      return <svg {...common}><circle cx="15" cy="16" r="10"/><path d="M5 16h20M15 6c3 3 4 6 4 10s-1 7-4 10M15 6c-3 3-4 6-4 10s1 7 4 10"/><path d="m22 7 5-2-2 5M26 6l-5 5"/></svg>;
    case "b2b-marketing":
      return <svg {...common}><circle cx="7" cy="9" r="3"/><circle cx="25" cy="8" r="3"/><circle cx="16" cy="24" r="3"/><path d="m10 10 12-1M9 12l5 9M23 11l-5 10"/></svg>;
    case "brand-strategy-branding":
      return <svg {...common}><path d="m16 4 9 7-9 17-9-17 9-7Z"/><path d="m7 11 9 4 9-4M16 15v13"/></svg>;
    case "performance-marketing":
      return <svg {...common}><circle cx="15" cy="16" r="10"/><circle cx="15" cy="16" r="4"/><path d="M23 8l5-4M24 8h4V4"/></svg>;
    case "digital-products-software-development":
      return <svg {...common}><path d="m11 8-6 8 6 8M21 8l6 8-6 8M18 5l-4 22"/></svg>;
    case "growth-management-consulting":
      return <svg {...common}><path d="M5 25h22M7 22V12M14 22V8M21 22V15"/><path d="m6 9 7-4 6 4 7-5"/><circle cx="25" cy="24" r="3"/></svg>;
    case "offline-marketing-media":
      return <svg {...common}><rect x="5" y="6" width="22" height="14" rx="2"/><path d="M10 26h12M13 20l-2 6M19 20l2 6M9 11h14M9 15h9"/></svg>;
    case "project-management":
      return <svg {...common}><rect x="6" y="5" width="20" height="23" rx="2"/><path d="m10 11 2 2 4-4M18 11h4M10 18l2 2 4-4M18 18h4M10 25h12"/></svg>;
    case "design-creative":
      return <svg {...common}><rect x="5" y="6" width="13" height="13" rx="2"/><rect x="14" y="13" width="13" height="13" rx="2"/><path d="m8 23 12-12"/></svg>;
    case "pr-crisis-management":
      return <svg {...common}><path d="M6 18h5l10 5V7l-10 5H6v6Z"/><path d="M11 18l2 7h4M24 11c2 1 3 3 3 5s-1 4-3 5"/></svg>;
    case "seo-organic-growth":
      return <svg {...common}><circle cx="14" cy="14" r="8"/><path d="m20 20 7 7M10 14h8M14 10v8"/></svg>;
    case "conversion-funnel-optimization":
      return <svg {...common}><path d="M5 6h22l-8 9v8l-6 3V15L5 6Z"/><path d="M11 10h10"/></svg>;
    case "ecommerce-growth":
      return <svg {...common}><path d="M7 12h18l-2 14H9L7 12Z"/><path d="M12 12V9a4 4 0 0 1 8 0v3M12 18h8"/></svg>;
    default:
      return <svg {...common}><circle cx="16" cy="16" r="10"/><path d="M10 16h12M16 10v12"/></svg>;
  }
}
