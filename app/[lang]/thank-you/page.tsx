import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Thank You | Sellf Media"
      : "Teşekkürler | Sellf Media",
    description: isEn
      ? "Your submission has been received."
      : "Talebiniz alındı.",
    // ÖNEMLİ: Bu bir dönüşüm-sonrası (post-conversion) sayfası, arama sonuçlarında
    // görünmesi anlamlı değil ve teknik olarak "duplicate/thin content" sayılabilir.
    // noindex, sayfanın Google tarafından indexlenmesini engeller — silinmiyor,
    // sadece arama sonuçlarında görünmesi engelleniyor. Formu dolduran kullanıcılar
    // için sayfa aynen çalışmaya devam ediyor.
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function ThankYouPage() {
  return <ThankYouClient />;
}