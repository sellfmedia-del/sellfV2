import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OperationDetail from "@/components/OperationDetail";
import { getOperationContent, type OperationLang } from "@/data/OperationContent";
import { getSolutionIndexItem } from "@/data/SolutionIndex";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;

function isOperationLang(lang: string): lang is OperationLang {
  return locales.includes(lang as OperationLang);
}

export function getOperationMetadata(slug: string, lang: string): Metadata {
  if (!isOperationLang(lang)) return {};

  const content = getOperationContent(slug);
  if (!content) {
    return {
      title: lang === "en" ? "Operation Not Found" : "Operasyon Bulunamadı",
    };
  }

  const canonicalUrl = `${baseUrl}/${lang}/services/${slug}`;
  const title = content.seoTitle[lang];
  const description = content.metaDescription[lang];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr/services/${slug}`,
        en: `${baseUrl}/en/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Sellf Media",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: lang === "tr" ? ["en_US"] : ["tr_TR"],
      type: "website",
    },
  };
}

export function renderOperationPage(slug: string, lang: string) {
  if (!isOperationLang(lang)) {
    notFound();
  }

  const content = getOperationContent(slug);
  if (!content) {
    notFound();
  }

  const parent = getSolutionIndexItem(content.primaryParent);
  if (!parent) {
    notFound();
  }

  const canonicalUrl = `${baseUrl}/${lang}/services/${slug}`;
  const parentUrl = `${baseUrl}/${lang}/services/${parent.slug}`;

  const serviceJsonLd = {
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: content.label[lang],
    serviceType: content.label[lang],
    description: content.metaDescription[lang],
    url: canonicalUrl,
    inLanguage: lang,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Sellf Media",
      url: baseUrl,
    },
    isRelatedTo: {
      "@type": "Service",
      "@id": `${parentUrl}#service`,
      name: parent.title[lang],
      url: parentUrl,
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
        item: `${baseUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "tr" ? "Çözümlerimiz" : "Our Solutions",
        item: `${baseUrl}/${lang}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: parent.title[lang],
        item: parentUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: content.label[lang],
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang],
      },
    })),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [serviceJsonLd, breadcrumbJsonLd, faqJsonLd],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <OperationDetail lang={lang} content={content} />
    </>
  );
}
