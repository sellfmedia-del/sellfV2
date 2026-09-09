import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetail from "@/components/SolutionDetail";
import { getSolutionIndexItem, solutionSlugs } from "@/data/SolutionIndex";
import { getSolutionContent, type SupportedSolutionLang } from "@/data/SolutionContent";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;

type RouteParams = {
  lang: string;
  slug: string;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    solutionSlugs.map((slug) => ({
      lang,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!locales.includes(lang as SupportedSolutionLang)) {
    return {};
  }

  const currentLang = lang as SupportedSolutionLang;
  const solution = getSolutionIndexItem(slug);
  const content = getSolutionContent(slug);

  if (!solution || !content) {
    return {
      title: currentLang === "en" ? "Solution Not Found" : "Çözüm Bulunamadı",
    };
  }

  const canonicalUrl = `${baseUrl}/${currentLang}/services/${slug}`;
  const title = content.seoTitle[currentLang];
  const description = content.metaDescription[currentLang];

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
      locale: currentLang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: currentLang === "tr" ? ["en_US"] : ["tr_TR"],
      type: "website",
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, slug } = await params;

  if (!locales.includes(lang as SupportedSolutionLang)) {
    notFound();
  }

  const currentLang = lang as SupportedSolutionLang;
  const solution = getSolutionIndexItem(slug);
  const content = getSolutionContent(slug);

  if (!solution || !content) {
    notFound();
  }

  const canonicalUrl = `${baseUrl}/${currentLang}/services/${slug}`;
  const operations = [
    ...content.operations.A,
    ...content.operations.B,
    ...content.operations.C,
  ];

  const serviceJsonLd = {
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: solution.title[currentLang],
    serviceType: solution.title[currentLang],
    description: content.metaDescription[currentLang],
    url: canonicalUrl,
    inLanguage: currentLang,
    provider: {
      "@type": "Organization",
      name: "Sellf Media",
      url: baseUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: currentLang === "tr" ? "Operasyonlar" : "Operations",
      itemListElement: operations.map((operation) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: operation,
        },
      })),
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
        name: currentLang === "tr" ? "Çözümlerimiz" : "Our Solutions",
        item: `${baseUrl}/${currentLang}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.title[currentLang],
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question[currentLang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[currentLang],
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
      <SolutionDetail lang={currentLang} solution={solution} content={content} />
    </>
  );
}
