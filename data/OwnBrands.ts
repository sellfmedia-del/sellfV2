export type OwnBrand = {
  name: string;
  domain: string;
  href: string;
  kind: { tr: string; en: string };
  description: { tr: string; en: string };
  accent: string;
  mark: string;
};

export const ownBrands: OwnBrand[] = [
  {
    name: "SellfScale",
    domain: "sellfscale.com",
    href: "https://sellfscale.com",
    kind: { tr: "Yazılım", en: "Software" },
    description: {
      tr: "E-ticaret büyümesini ölçmek, planlamak ve yönetmek için geliştirdiğimiz büyüme işletim sistemi.",
      en: "Our growth operating system for measuring, planning and managing e-commerce growth.",
    },
    accent: "rgba(174,196,224,.24)",
    mark: "▥",
  },
  {
    name: "SellfTask",
    domain: "sellftask.com",
    href: "https://sellftask.com",
    kind: { tr: "Yazılım", en: "Software" },
    description: {
      tr: "Ekipleri, projeleri ve operasyonları tek yerde yönetmek için geliştirdiğimiz çalışma sistemi.",
      en: "Our workspace for managing teams, projects and operations in one place.",
    },
    accent: "rgba(120,163,214,.22)",
    mark: "✓",
  },
  {
    name: "OtopartTR",
    domain: "otoparttr.com",
    href: "https://otoparttr.com",
    kind: { tr: "Şirket & Pazar Yeri", en: "Company & Marketplace" },
    description: {
      tr: "Yedek parça tedariğini ve satın alma deneyimini yeniden tasarlayan yeni nesil otomotiv pazar yerimiz.",
      en: "Our next-generation automotive marketplace redesigning spare-parts sourcing and purchasing.",
    },
    accent: "rgba(205,160,118,.22)",
    mark: "///",
  },
  {
    name: "SellfCompete",
    domain: "sellfcompete.com",
    href: "https://sellfcompete.com",
    kind: { tr: "Yazılım", en: "Software" },
    description: {
      tr: "Rakip ve pazar verisini yapay zekâ destekli içgörülere dönüştüren pazar istihbaratı ürünümüz.",
      en: "Our market-intelligence product turning competitor and market data into AI-driven insights.",
    },
    accent: "rgba(97,162,131,.22)",
    mark: "▲",
  },
];
