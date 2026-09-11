import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import RgiReferencePage from "@/components/RgiReferencePage";
import styles from "./rgi-visual-refine.module.css";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;
type SupportedLang = (typeof locales)[number];
type RouteParams = { lang: string };

const seo = {
  tr: {
    title: "RGI Nedir? Gerçek Büyüme Endeksi ile Büyüme Ölçümü | Sellf",
    description:
      "RGI (Gerçek Büyüme Endeksi), BHS başlangıç noktasından itibaren marka ve ürün performansındaki gerçek, dengeli ve sürdürülebilir ilerlemeyi ölçen Sellf büyüme indeksidir.",
    ogTitle: "RGI — Görünen Değil, Gerçek Büyümeyi Ölçün | Sellf",
    ogDescription:
      "Sellf'in Gerçek Büyüme Endeksi; Marka ve Ürün eksenlerindeki pazarlama, finansal ve operasyonel gelişimi BHS başlangıç noktasından itibaren ölçer.",
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
    alternateName: currentLang === "tr" ? "Gerçek Büyüme Endeksi" : "Real Growth Index",
    description:
      currentLang === "tr"
        ? "Sellf tarafından geliştirilen; BHS ile belirlenen başlangıç noktasından itibaren Marka ve Ürün eksenlerinde gerçek, dengeli ve sürdürülebilir büyümeyi ölçen büyüme indeksi."
        : "Sellf's proprietary growth index for measuring real, balanced and sustainable progress across Brand and Product from the baseline defined by BHS.",
    url: canonicalUrl,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: currentLang === "tr" ? "Sellf İşletim Sistemi" : "Sellf Operating System",
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
        name: currentLang === "tr" ? "Sellf İşletim Sistemi" : "Sellf Operating System",
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

  const outputCtaHref = `/${currentLang}/contact`;
  const outputCtaLabel = currentLang === "tr" ? "Ekibimizle konuşun" : "Talk to our team";
  const outputLinkScript = `
    (() => {
      const attachOutputLink = () => {
        const visual = document.querySelector('#rgi-output .sellf-container > div:last-child');
        if (!visual || visual.querySelector('.rgi-output-link')) return;
        const link = document.createElement('a');
        link.href = ${JSON.stringify(outputCtaHref)};
        link.className = 'rgi-output-link';
        link.setAttribute('aria-label', ${JSON.stringify(outputCtaLabel)});
        visual.appendChild(link);
      };
      attachOutputLink();
      requestAnimationFrame(attachOutputLink);
      setTimeout(attachOutputLink, 250);
    })();
  `;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script id={`rgi-output-link-${currentLang}`} strategy="afterInteractive">
        {outputLinkScript}
      </Script>
      <div className={styles.page}>
        <RgiReferencePage lang={currentLang} />
      </div>
    </>
  );
}
