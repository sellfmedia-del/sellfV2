import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { serviceData } from "@/data/ServiceData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Services | Sellf Media — B2B Growth Engineering"
      : "Hizmetler | Sellf Media — B2B Büyüme Mühendisliği",
    description: isEn
      ? "Integrated growth partnership, digital advertising, SEO, social media, and production services for enterprise and C-level decision makers."
      : "Üst düzey karar vericiler ve C-Level yöneticiler için entegre büyüme partnerliği, dijital reklam, SEO, sosyal medya ve prodüksiyon hizmetleri.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/services`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/services",
        en: "https://www.sellfmedia.com/en/services",
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang as "tr" | "en") || "tr";

  // JSON-LD — arama motorları ve AI crawler'ları için yapılandırılmış,
  // görsel tasarımdan tamamen bağımsız bir veri katmanı.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: serviceData.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title[currentLang],
      description: service.description[currentLang],
      provider: {
        "@type": "Organization",
        name: "Sellf Media",
        url: "https://www.sellfmedia.com",
      },
    })),
  };

  return (
    <>
      {/* Mevcut animasyonlu / interaktif tasarım — hiç değişmedi */}
      <ServicesClient />

      {/* JSON-LD: Google ve AI crawler'lar için temiz, garantili özet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* sr-only: Görsel olarak gizli, ama HTML'de her zaman var.
          Ekran okuyucular için de standart bir erişilebilirlik pattern'i —
          cloaking değil, aynı içeriğin JS-bağımsız bir kopyası. */}
      <div className="sr-only">
        {serviceData.map((service) => (
          <article key={service.id}>
            <h2>{service.title[currentLang]}</h2>
            <p>{service.heroText[currentLang]}</p>
            <p>{service.description[currentLang]}</p>

            {service.process?.length > 0 && (
              <div>
                {service.process.map((step, idx) => (
                  <div key={idx}>
                    <h3>{step.title[currentLang]}</h3>
                    <p>{step.description[currentLang]}</p>
                  </div>
                ))}
              </div>
            )}

            {service.deliverables?.length > 0 && (
              <ul>
                {service.deliverables.map((item, idx) => (
                  <li key={idx}>{item[currentLang]}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </>
  );
}