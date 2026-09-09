import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { solutionIndex } from "@/data/SolutionIndex";

const baseUrl = "https://www.sellfmedia.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  const currentLang = isEn ? "en" : "tr";
  const canonical = `${baseUrl}/${currentLang}/services`;
  const title = isEn
    ? "Growth Solutions | Sellf Media"
    : "Büyüme Çözümleri | Sellf Media";
  const description = isEn
    ? "Explore Sellf Media solutions across integrated consulting, international growth, B2B, branding, performance, software, SEO, conversion, e-commerce and more."
    : "Entegre danışmanlıktan uluslararası büyümeye, B2B, branding, performans, yazılım, SEO, dönüşüm ve e-ticarete uzanan Sellf Media büyüme çözümlerini keşfedin.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${baseUrl}/tr/services`,
        en: `${baseUrl}/en/services`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Sellf Media",
      locale: isEn ? "en_US" : "tr_TR",
      alternateLocale: isEn ? ["tr_TR"] : ["en_US"],
      type: "website",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === "en" ? "en" : "tr") as "tr" | "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: currentLang === "tr" ? "Sellf Media Çözümleri" : "Sellf Media Solutions",
    numberOfItems: solutionIndex.length,
    itemListElement: solutionIndex.map((solution, index) => {
      const url = `${baseUrl}/${currentLang}/services/${solution.slug}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${url}#service`,
          name: solution.title[currentLang],
          description: solution.description[currentLang],
          url,
          provider: {
            "@type": "Organization",
            name: "Sellf Media",
            url: baseUrl,
          },
        },
      };
    }),
  };

  return (
    <>
      <ServicesClient />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="sr-only">
        {solutionIndex.map((solution) => (
          <article key={solution.slug}>
            <h2>{solution.title[currentLang]}</h2>
            <p>{solution.heroTitle[currentLang]}</p>
            <p>{solution.description[currentLang]}</p>
            <a href={`/${currentLang}/services/${solution.slug}`}>
              {solution.title[currentLang]}
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
