import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RgiFrameworkPage from "@/components/RgiFrameworkPage";
import styles from "./rgi-visual-refine.module.css";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;
type SupportedLang = (typeof locales)[number];
type RouteParams = { lang: string };

const seo = {
  tr: {
    title: "RGI Nedir? Real Growth Index ile Gerçek Büyüme Ölçümü | Sellf",
    description:
      "RGI (Real Growth Index), BHS başlangıç noktasından itibaren marka ve ürün performansındaki gerçek, dengeli ve sürdürülebilir ilerlemeyi ölçen Sellf büyüme indeksidir.",
    ogTitle: "RGI — Görünen Değil, Gerçek Büyümeyi Ölçün | Sellf",
    ogDescription:
      "Sellf'in Real Growth Index framework'ü Brand ve Product eksenlerindeki pazarlama, finansal ve operasyonel gelişimi BHS baseline'ından itibaren ölçer.",
  },
  en: {
    title: "RGI: Real Growth Index & Measurable Growth System | Sellf",
    description:
      "RGI (Real Growth Index) is Sellf's proprietary growth index for measuring real, balanced and sustainable progress in Brand and Product from a known BHS baseline.",
    ogTitle: "RGI — Measure Real Growth, Not Growth That Only Looks Good | Sellf",
    ogDescription:
      "Sellf's Real Growth Index measures marketing, financial and operational progress across Brand and Product from a known BHS baseline.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) return {};

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/rgi`;
  const content = seo[currentLang];

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr/framework/rgi`,
        en: `${baseUrl}/en/framework/rgi`,
        "x-default": `${baseUrl}/tr/framework/rgi`,
      },
    },
    openGraph: {
      title: content.ogTitle,
      description: content.ogDescription,
      url: canonicalUrl,
      siteName: "Sellf Media",
      locale: currentLang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: currentLang === "tr" ? ["en_US"] : ["tr_TR"],
      type: "website",
    },
  };
}

export default async function RgiPage({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) notFound();

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/rgi`;

  const webPageJsonLd = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: seo[currentLang].title,
    description: seo[currentLang].description,
    inLanguage: currentLang,
    about: { "@id": `${canonicalUrl}#rgi` },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Sellf Media",
      url: baseUrl,
    },
  };

  const definedTermJsonLd = {
    "@type": "DefinedTerm",
    "@id": `${canonicalUrl}#rgi`,
    name: "RGI",
    alternateName: "Real Growth Index",
    description:
      currentLang === "tr"
        ? "Sellf tarafından geliştirilen; BHS ile belirlenen başlangıç noktasından itibaren Brand ve Product eksenlerinde gerçek, dengeli ve sürdürülebilir büyümeyi ölçen büyüme indeksi."
        : "Sellf's proprietary growth index for measuring real, balanced and sustainable progress across Brand and Product from the baseline defined by BHS.",
    url: canonicalUrl,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Sellf Operating System",
      url: `${baseUrl}/${currentLang}`,
    },
  };

  const breadcrumbJsonLd = {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sellf Media",
        item: `${baseUrl}/${currentLang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sellf Operating System",
        item: `${baseUrl}/${currentLang}#operating-system`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "RGI",
        item: canonicalUrl,
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [webPageJsonLd, definedTermJsonLd, breadcrumbJsonLd],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={styles.page}>
        <RgiFrameworkPage lang={currentLang} />
      </div>
    </>
  );
}
