import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import BhsFrameworkPage from "@/components/BhsFrameworkPage";
import { bhsReportDataUri } from "@/data/bhsReportAsset";
import styles from "./bhs-report.module.css";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;
type SupportedLang = (typeof locales)[number];

type RouteParams = { lang: string };

const seo = {
  tr: {
    title: "BHS Nedir? Marka Sağlığı ve Büyüme Başlangıç Skoru | Sellf",
    description:
      "BHS (Brand Health Score), markanın finansal, operasyonel, funnel, dijital, algısal ve rekabetçi sağlığını ölçerek büyüme için güvenilir bir başlangıç noktası oluşturur.",
    ogTitle: "BHS — Büyümeden Önce Nerede Olduğunuzu Bilin | Sellf",
    ogDescription:
      "Sellf'in BHS framework'ü markanın mevcut sağlığını altı boyutta analiz eder, benchmark oluşturur ve gerçek büyümenin başlangıç noktasını tanımlar.",
  },
  en: {
    title: "BHS: Brand Health Score & Growth Baseline | Sellf Media",
    description:
      "BHS (Brand Health Score) measures financial, operational, funnel, digital, perception and competitive health to establish a reliable baseline for real growth.",
    ogTitle: "BHS — Know Where You Stand Before You Grow | Sellf",
    ogDescription:
      "Sellf's BHS framework analyses brand health across six dimensions, builds a competitive benchmark and defines the baseline for measurable growth.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) return {};

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/bhs`;
  const content = seo[currentLang];

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr/framework/bhs`,
        en: `${baseUrl}/en/framework/bhs`,
        "x-default": `${baseUrl}/tr/framework/bhs`,
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

export default async function BhsPage({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) notFound();

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/bhs`;

  const webPageJsonLd = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: seo[currentLang].title,
    description: seo[currentLang].description,
    inLanguage: currentLang,
    about: { "@id": `${canonicalUrl}#bhs` },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Sellf Media",
      url: baseUrl,
    },
  };

  const definedTermJsonLd = {
    "@type": "DefinedTerm",
    "@id": `${canonicalUrl}#bhs`,
    name: "BHS",
    alternateName: "Brand Health Score",
    description:
      currentLang === "tr"
        ? "Sellf tarafından geliştirilen; bir markanın finansal, operasyonel, funnel, dijital, algısal ve rekabetçi sağlığını tek bir büyüme başlangıç noktasında birleştiren ölçüm sistemi."
        : "Sellf's proprietary measurement system that combines a brand's financial, operational, funnel, digital, perception and competitive health into a single growth baseline.",
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
        name: currentLang === "tr" ? "Sellf Operating System" : "Sellf Operating System",
        item: `${baseUrl}/${currentLang}#operating-system`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "BHS",
        item: canonicalUrl,
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [webPageJsonLd, definedTermJsonLd, breadcrumbJsonLd],
  };

  const reportStyle = {
    "--bhs-report-image": `url("${bhsReportDataUri}")`,
  } as CSSProperties;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={styles.page} style={reportStyle}>
        <BhsFrameworkPage lang={currentLang} />
      </div>
    </>
  );
}
