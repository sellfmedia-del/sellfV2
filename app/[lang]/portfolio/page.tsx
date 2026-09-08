import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Portfolio | Sellf Media — Brandbooks, Design & Identity"
      : "Portfolyo | Sellf Media — Marka Kitapları, Tasarım & Kimlik",
    description: isEn
      ? "Explore Sellf Media's brandbook, design, and content work for clients including Qashe, ASCE GYO, and more."
      : "Sellf Media'nın Qashe, ASCE GYO ve daha birçok müşteri için hazırladığı marka kitabı, tasarım ve içerik çalışmalarını inceleyin.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/portfolio`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/portfolio",
        en: "https://www.sellfmedia.com/en/portfolio",
      },
    },
  };
}

export default function PortfolioPage() {
  return <PortfolioClient />;
}