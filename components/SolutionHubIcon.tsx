import type { ReactNode, SVGProps } from "react";

type Props = {
  slug: string;
  size?: number;
};

const NAVY = "#133B66";
const BLUE = "#2F6BFF";
const PALE = "#EAF1FF";
const PALE_2 = "#F3F7FF";

function Frame({ size, children }: { size: number; children: ReactNode }) {
  const common: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 72 72",
    fill: "none",
    "aria-hidden": true,
  };

  return (
    <svg {...common}>
      <rect x="1" y="1" width="70" height="70" rx="18" fill={PALE_2} />
      <rect x="1" y="1" width="70" height="70" rx="18" stroke="#DCE7FA" />
      {children}
    </svg>
  );
}

const stroke = {
  stroke: NAVY,
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function SolutionHubIcon({ slug, size = 72 }: Props) {
  switch (slug) {
    case "integrated-consulting":
      return (
        <Frame size={size}>
          <rect x="16" y="40" width="8" height="15" rx="2" fill={PALE} stroke={NAVY} strokeWidth="2.4" />
          <rect x="31" y="31" width="8" height="24" rx="2" fill="#DCE8FF" stroke={NAVY} strokeWidth="2.4" />
          <rect x="46" y="21" width="8" height="34" rx="2" fill="#CCDFFF" stroke={NAVY} strokeWidth="2.4" />
          <path d="M17 31l12-9 10 5 16-14" {...stroke} />
          <circle cx="55" cy="13" r="4.5" fill={BLUE} />
        </Frame>
      );
    case "export-international-growth":
      return (
        <Frame size={size}>
          <circle cx="34" cy="36" r="20" fill={PALE} stroke={NAVY} strokeWidth="2.5" />
          <path d="M14 36h40M34 16c5 6 8 12 8 20s-3 14-8 20M34 16c-5 6-8 12-8 20s3 14 8 20" {...stroke} />
          <path d="M46 18l11-4-4 11" {...stroke} stroke={BLUE} />
          <path d="M56 15L45 26" {...stroke} stroke={BLUE} />
        </Frame>
      );
    case "b2b-marketing":
      return (
        <Frame size={size}>
          <circle cx="21" cy="25" r="7" fill="#DCE8FF" stroke={NAVY} strokeWidth="2.4" />
          <circle cx="51" cy="23" r="7" fill="#EAF1FF" stroke={NAVY} strokeWidth="2.4" />
          <circle cx="36" cy="50" r="7" fill="#CFE0FF" stroke={NAVY} strokeWidth="2.4" />
          <path d="M28 25h16M25 31l7 13M47 29l-7 15" {...stroke} />
          <circle cx="58" cy="46" r="5" fill={BLUE} />
        </Frame>
      );
    case "brand-strategy-branding":
      return (
        <Frame size={size}>
          <path d="M36 13l20 14-20 32-20-32 20-14Z" fill="#E7EEFF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M16 27l20 9 20-9M36 36v23" {...stroke} />
          <circle cx="36" cy="23" r="5" fill={BLUE} />
        </Frame>
      );
    case "performance-marketing":
      return (
        <Frame size={size}>
          <circle cx="34" cy="37" r="21" fill="#EDF3FF" stroke={NAVY} strokeWidth="2.5" />
          <circle cx="34" cy="37" r="12" fill="#D8E5FF" stroke={NAVY} strokeWidth="2.5" />
          <circle cx="34" cy="37" r="4.5" fill={BLUE} />
          <path d="M48 22l11-10M51 21h9v-9" {...stroke} stroke={BLUE} />
        </Frame>
      );
    case "digital-products-software-development":
      return (
        <Frame size={size}>
          <rect x="12" y="17" width="48" height="38" rx="8" fill="#EDF3FF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M28 28l-8 9 8 9M44 28l8 9-8 9M40 23l-8 28" {...stroke} />
          <circle cx="56" cy="17" r="5" fill={BLUE} />
        </Frame>
      );
    case "growth-management-consulting":
      return (
        <Frame size={size}>
          <path d="M13 55h46" {...stroke} />
          <rect x="17" y="38" width="9" height="17" rx="2" fill="#E7EEFF" stroke={NAVY} strokeWidth="2.3" />
          <rect x="32" y="29" width="9" height="26" rx="2" fill="#D8E5FF" stroke={NAVY} strokeWidth="2.3" />
          <rect x="47" y="20" width="9" height="35" rx="2" fill="#CFE0FF" stroke={NAVY} strokeWidth="2.3" />
          <path d="M16 29l15-9 11 4 14-11" {...stroke} />
          <circle cx="56" cy="13" r="4.5" fill={BLUE} />
        </Frame>
      );
    case "offline-marketing-media":
      return (
        <Frame size={size}>
          <rect x="12" y="16" width="48" height="31" rx="5" fill="#EAF1FF" stroke={NAVY} strokeWidth="2.5" />
          <rect x="19" y="23" width="34" height="17" rx="3" fill="#D6E4FF" />
          <path d="M24 56h24M29 47l-3 9M43 47l3 9" {...stroke} />
          <path d="M21 29h18M21 34h11" {...stroke} />
          <circle cx="49" cy="31" r="4.5" fill={BLUE} />
        </Frame>
      );
    case "project-management":
      return (
        <Frame size={size}>
          <rect x="17" y="12" width="38" height="48" rx="7" fill="#EEF3FF" stroke={NAVY} strokeWidth="2.5" />
          <rect x="27" y="9" width="18" height="8" rx="4" fill="#D9E6FF" stroke={NAVY} strokeWidth="2.2" />
          <path d="M25 29l4 4 7-8M40 29h8M25 43l4 4 7-8M40 43h8" {...stroke} />
          <circle cx="53" cy="16" r="4.5" fill={BLUE} />
        </Frame>
      );
    case "design-creative":
      return (
        <Frame size={size}>
          <rect x="14" y="15" width="28" height="28" rx="6" fill="#E7EEFF" stroke={NAVY} strokeWidth="2.5" />
          <rect x="30" y="30" width="28" height="28" rx="6" fill="#D8E5FF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M20 52l31-31" {...stroke} />
          <circle cx="52" cy="20" r="5" fill={BLUE} />
        </Frame>
      );
    case "pr-crisis-management":
      return (
        <Frame size={size}>
          <path d="M16 40h11l19 9V23l-19 9H16v8Z" fill="#E3ECFF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M26 40l4 14h8" {...stroke} />
          <path d="M51 29c4 2 6 5 6 8s-2 6-6 8" {...stroke} stroke={BLUE} />
          <circle cx="51" cy="17" r="5" fill={BLUE} />
        </Frame>
      );
    case "seo-organic-growth":
      return (
        <Frame size={size}>
          <circle cx="31" cy="31" r="17" fill="#E9F0FF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M43 43l15 15" {...stroke} />
          <path d="M22 36l6-7 6 4 7-10" {...stroke} stroke={BLUE} />
          <circle cx="41" cy="23" r="4.5" fill={BLUE} />
        </Frame>
      );
    case "conversion-funnel-optimization":
      return (
        <Frame size={size}>
          <path d="M13 16h46L43 34v14l-14 8V34L13 16Z" fill="#E8F0FF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M23 24h26" {...stroke} />
          <circle cx="52" cy="18" r="5" fill={BLUE} />
        </Frame>
      );
    case "ecommerce-growth":
      return (
        <Frame size={size}>
          <path d="M17 26h38l-4 30H21l-4-30Z" fill="#E7EEFF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M27 26v-5a9 9 0 0 1 18 0v5M27 39h18" {...stroke} />
          <circle cx="51" cy="17" r="5" fill={BLUE} />
        </Frame>
      );
    default:
      return (
        <Frame size={size}>
          <circle cx="36" cy="36" r="18" fill="#EAF1FF" stroke={NAVY} strokeWidth="2.5" />
          <path d="M27 36h18M36 27v18" {...stroke} />
        </Frame>
      );
  }
}
