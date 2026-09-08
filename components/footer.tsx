"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const dict = {
  tr: {
    contact: "İletişim",
    privacy: "Gizlilik Politikası",
    cookie: "Çerez Politikası",
    addressPart1: "Hüseyinağa Mahallesi, İstiklal Cad. No:56/58",
    addressPart2: "Kat:3 Daire 5 Beyoğlu / İstanbul",
    proudly: "Bizim tarafımızdan gururla tasarlandı.",
    copyright: "Sellf tarafından. Bununla çok gurur duyuyoruz, teşekkürler."
  },
  en: {
    contact: "Contact",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    addressPart1: "Hüseyinağa Neighborhood, Istiklal Ave. No:56/58",
    addressPart2: "Floor:3 Apt:5 Beyoğlu / Istanbul",
    proudly: "Proudly designed by Us.",
    copyright: "by Sellf. We are very proud of it, thank you."
  }
};

export default function Footer() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const langPrefix = `/${currentLang}`;

  return (
    <footer className="bg-[#0b0d0d] text-white border-t border-white/10">
      <div className="sellf-container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-xl">
            <Link href={langPrefix} className="relative block h-10 w-28 mb-6">
              <Image src="/logo-beyaz.png" alt="Sellf Media Logo" fill className="object-contain object-left" />
            </Link>
            <p className="text-sm md:text-base text-white/65 max-w-md">Konuk Reklam, Pazarlama ve Ticaret LTD.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-xs">
            <div className="flex flex-col gap-3">
              <Link href={`${langPrefix}/contact`} className="hover:text-white/55 transition-colors">{t.contact}</Link>
              <Link href={`${langPrefix}/privacy-policy`} className="hover:text-white/55 transition-colors">{t.privacy}</Link>
              <Link href={`${langPrefix}/cookie-policy`} className="hover:text-white/55 transition-colors">{t.cookie}</Link>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://www.linkedin.com/company/sellf-media" target="_blank" rel="noopener noreferrer" className="hover:text-white/55 transition-colors">Linkedin</a>
              <a href="https://www.instagram.com/sellfmedia" target="_blank" rel="noopener noreferrer" className="hover:text-white/55 transition-colors">Instagram</a>
              <a href="https://www.youtube.com/@sellfmedia" target="_blank" rel="noopener noreferrer" className="hover:text-white/55 transition-colors">Youtube</a>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col gap-3 text-white/55">
              <a href="https://wa.me/905350131678" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+90 535 013 16 78</a>
              <a href="mailto:team@sellfmedia.com" className="hover:text-white transition-colors">team@sellfmedia.com</a>
              <a href="https://share.google/6RbD4yrxAQ1WxM4E8" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-white transition-colors">
                {t.addressPart1}<br />{t.addressPart2}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-[10px] text-white/38">
          <p>{t.proudly}</p>
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
