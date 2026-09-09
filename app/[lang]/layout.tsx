import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; 
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

// GOOGLE ANALYTICS İÇİN IMPORT EDİLDİ:
import { GoogleAnalytics } from '@next/third-parties/google';

// EMNİYET KEMERİ İÇİN IMPORT EDİLDİ:
import { notFound } from "next/navigation";

// 1. Global bileşenler
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyLogo from "@/components/StickyLogo";
import QuickContact from "@/components/QuickContact";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"], 
});

// 2. SEO İÇİN DİNAMİK METADATA
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn ? "Sellf Media | Growth, Engineered." : "Sellf Media | Büyüme, Mühendislik İşi.",
    description: isEn 
      ? "Sustainability, Efficiency, Scalability." 
      : "Sürdürülebilirlik, Verimlilik, Ölçülebilirlik.",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.ico", type: "image/x-icon" },
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // URL'deki dili yakalıyoruz
  const { lang } = await params;

  // EMNİYET KEMERİ DEVREDE: 
  // Eğer dil 'tr' veya 'en' değilse, Header'ı yüklemeye çalışma, direkt 404 sayfasına fırlat!
  if (!['en', 'tr'].includes(lang)) {
    notFound(); 
  }

  // SITEWIDE ORGANIZATION JSON-LD
  // Tek bir yerde tanımlanıp her sayfaya otomatik yayılıyor — Google ve AI motorları
  // "Sellf Media" markasını tek, tutarlı bir varlık (entity) olarak tanıyabiliyor.
  // Kullanılan bilgiler (LinkedIn, Instagram, YouTube, telefon, e-posta ve adres)
  // footer.tsx ve contact sayfasında görünür şekilde var — burada uydurma bilgi yok.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.sellfmedia.com/#organization",
    name: "Sellf Media",
    legalName: "Konuk Reklam, Pazarlama ve Ticaret LTD.",
    url: "https://www.sellfmedia.com",
    logo: "https://www.sellfmedia.com/logo-beyaz.png",
    email: "team@sellfmedia.com",
    telephone: "+90 535 013 16 78",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hüseyinağa Mahallesi, İstiklal Cad. No:56/58, Kat:3 Daire 5",
      addressLocality: "Beyoğlu",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    sameAs: [
      "https://www.linkedin.com/company/sellf-media",
      "https://www.instagram.com/sellfmedia",
      "https://www.youtube.com/@sellfmedia",
    ],
  };

  return (
    <html lang={lang}>
      <body className={`${montserrat.variable} font-sans flex flex-col min-h-screen`}>

        {/* Sitewide Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Sitenin Global Üst Menüsü */}
        <Header />
        
        {/* Sitenin asıl içeriği */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 3D Hareketli Sticky Logo & Cal.com Modülü */}
        <StickyLogo />

        {/* YENİ: Hızlı İletişim Butonu (Bento Grid / Loft) */}
        <QuickContact />
        
        {/* Sitenin Global Alt Bilgisi */}
        <Footer />
        
        {/* VERCEL SPEED INSIGHTS (Gerçek kullanıcı hız metriklerini toplar) */}
        <SpeedInsights />
      </body>
      
      {/* GOOGLE ANALYTICS 4 (Resmi Next.js performans bileşeni) */}
      <GoogleAnalytics gaId="G-10RW8M3NQ4" />
    </html>
  );
}
