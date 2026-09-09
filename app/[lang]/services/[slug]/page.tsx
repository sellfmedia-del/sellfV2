import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailPerformancePreview from "@/components/SolutionDetailPerformancePreview";
import { getSolutionIndexItem, solutionSlugs } from "@/data/SolutionIndex";
import { getSolutionContent } from "@/data/getSolutionContent";
import type { SupportedSolutionLang } from "@/data/SolutionContent";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;

const previewDToneCss = `
  .solution-preview-d-cool .bg-\\[\\#133b66\\] {
    background-color: #111313 !important;
  }
  .solution-preview-d-cool .text-\\[\\#133b66\\] {
    color: #252929 !important;
  }
  .solution-preview-d-cool .bg-\\[\\#1f5f9f\\] {
    background-color: #1b1e1e !important;
  }
  .solution-preview-d-cool .text-\\[\\#1f5f9f\\]\\/38 {
    color: rgba(11, 13, 13, 0.32) !important;
  }
  .solution-preview-d-cool .bg-\\[\\#eaf1ff\\] {
    background-color: #ecebe7 !important;
  }
  .solution-preview-d-cool .bg-\\[\\#e9eef4\\] {
    background-color: #e8e7e3 !important;
  }
  .solution-preview-d-cool .bg-\\[\\#1f5f9f\\]\\/18,
  .solution-preview-d-cool .bg-\\[\\#6ea7d5\\]\\/10 {
    background-color: rgba(255, 255, 255, 0.028) !important;
  }
  .solution-preview-d-cool .from-\\[\\#0b0d0d\\]\\/55 {
    --tw-gradient-from: rgba(11, 13, 13, 0.5) var(--tw-gradient-from-position) !important;
    --tw-gradient-to: rgba(11, 13, 13, 0) var(--tw-gradient-to-position) !important;
  }
  .solution-preview-d-cool .from-\\[\\#1f5f9f\\]\\/18 {
    --tw-gradient-from: rgba(11, 13, 13, 0.14) var(--tw-gradient-from-position) !important;
    --tw-gradient-to: rgba(11, 13, 13, 0) var(--tw-gradient-to-position) !important;
  }
  .solution-preview-d-cool .to-\\[\\#1f5f9f\\]\\/12 {
    --tw-gradient-to: rgba(255, 255, 255, 0.025) var(--tw-gradient-to-position) !important;
  }
  .solution-preview-d-cool svg[aria-hidden="true"] {
    filter: grayscale(1) saturate(0) contrast(1.04);
  }
  .solution-preview-d-cool .group:hover .group-hover\\:bg-\\[\\#133b66\\] {
    background-color: #111313 !important;
  }
  .solution-preview-d-cool .group:hover .group-hover\\:text-\\[\\#1f5f9f\\] {
    color: #111313 !important;
  }
  .solution-preview-d-cool .solution-d-drift {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .solution-preview-d-cool .solution-d-drift > img {
    opacity: 0 !important;
  }
  .solution-preview-d-cool[data-solution="integrated-consulting"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/blackbork1.png");
    background-position: center top;
  }
  .solution-preview-d-cool[data-solution="export-international-growth"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/toys1.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="b2b-marketing"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/tiib1.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="brand-strategy-branding"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/qashe%201.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="performance-marketing"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/ascepostASCE%20S%CC%A7UBAT%202026%20GRID%20.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="digital-products-software-development"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite1.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="growth-management-consulting"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/fundora1.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="offline-marketing-media"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/dedeman1.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="project-management"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/kervan1.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="design-creative"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/Screenshot%202025-12-25%20at%2010.39.30%E2%80%AFAM.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="pr-crisis-management"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/blackbork2.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="seo-organic-growth"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/argeron1.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="conversion-funnel-optimization"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/nutralen1.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="ecommerce-growth"] .solution-d-drift {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/grey1.png");
    background-position: center;
  }
  .solution-preview-d-cool figure {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .solution-preview-d-cool figure > img {
    opacity: 0 !important;
  }
  .solution-preview-d-cool[data-solution="integrated-consulting"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/fundora2.png");
    background-position: center top;
  }
  .solution-preview-d-cool[data-solution="integrated-consulting"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/asce%205.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="export-international-growth"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/toys4.png");
    background-position: center top;
  }
  .solution-preview-d-cool[data-solution="export-international-growth"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/toys8.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="b2b-marketing"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/tiib2.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="b2b-marketing"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/tiib4.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="brand-strategy-branding"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/qashe%203.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="brand-strategy-branding"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/qashe%206.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="performance-marketing"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/ascepost2.1.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="performance-marketing"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/ascepost7.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="digital-products-software-development"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite2.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="digital-products-software-development"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/argeron2.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="growth-management-consulting"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/fundora4.png");
    background-position: center top;
  }
  .solution-preview-d-cool[data-solution="growth-management-consulting"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/kervan6.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="offline-marketing-media"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/dedeman2.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="offline-marketing-media"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/dedeman4.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="project-management"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/kervan3.png");
    background-position: center top;
  }
  .solution-preview-d-cool[data-solution="project-management"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/toys6.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="design-creative"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj10.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="design-creative"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_5.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="pr-crisis-management"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/blackbork5.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="pr-crisis-management"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/dedeman3.png");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="seo-organic-growth"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/argeron3.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="seo-organic-growth"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/farmhouse2.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="conversion-funnel-optimization"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/nutralen2.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="conversion-funnel-optimization"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite3.png");
    background-position: left top;
  }
  .solution-preview-d-cool[data-solution="ecommerce-growth"] figure:first-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/grey3.jpg");
    background-position: center;
  }
  .solution-preview-d-cool[data-solution="ecommerce-growth"] figure:last-of-type {
    background-image: url("https://cdn.sellfmedia.workers.dev/portfolio/nutralen6.jpg");
    background-position: center;
  }
`;

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
      <div className="solution-preview-d-cool" data-solution={solution.slug}>
        <style dangerouslySetInnerHTML={{ __html: previewDToneCss }} />
        <SolutionDetailPerformancePreview lang={currentLang} solution={solution} content={content} />
      </div>
    </>
  );
}
