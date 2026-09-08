"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

const dict = {
  tr: {
    about: "Hakkımızda",
    services: "Neler Yapıyoruz",
    portfolio: "Portfolyo",
    blog: "Blog",
    contact: "İletişim",
    menu: "Menü",
    close: "Kapat",
  },
  en: {
    about: "About Us",
    services: "What We Do",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact Us",
    menu: "Menu",
    close: "Close",
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const langPrefix = `/${currentLang}`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    const target = currentLang === "tr" ? "en" : "tr";
    const newPath = pathname?.replace(`/${currentLang}`, `/${target}`) || `/${target}`;
    router.push(newPath);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${isScrolled ? "pt-3" : "pt-5 md:pt-6"}`}>
        <div className={`sellf-container flex h-14 items-center justify-between rounded-full px-4 md:px-5 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0b0d0d]/92 text-white shadow-[0_12px_40px_rgba(0,0,0,.18)] backdrop-blur-xl border border-white/10"
            : "bg-[#0b0d0d]/78 text-white backdrop-blur-md border border-white/10"
        }`}>
          <Link href={langPrefix} aria-label="Sellf Media" onClick={() => setIsMenuOpen(false)} className="relative h-7 w-[74px] md:w-[82px] shrink-0">
            <Image src="/logo-beyaz.png" alt="Sellf Media Logo" fill priority className="object-contain object-left" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium">
            <Link href={`${langPrefix}/services`} className="hover:opacity-60 transition-opacity">{t.services}</Link>
            <Link href={`${langPrefix}/portfolio`} className="hover:opacity-60 transition-opacity">{t.portfolio}</Link>
            <Link href={`${langPrefix}/about`} className="hover:opacity-60 transition-opacity">{t.about}</Link>
            <Link href={`${langPrefix}/blog`} className="hover:opacity-60 transition-opacity">{t.blog}</Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="h-9 min-w-9 rounded-full border border-white/15 px-3 text-[10px] font-semibold tracking-[.16em] hover:bg-white/10 transition-colors"
              aria-label={currentLang === "tr" ? "Switch to English" : "Türkçeye geç"}
            >
              {currentLang === "tr" ? "EN" : "TR"}
            </button>

            <Link href={`${langPrefix}/contact`} className="hidden md:inline-flex h-9 items-center rounded-full bg-white px-4 text-[10px] font-semibold text-black hover:bg-[#f1f0ec] transition-colors">
              {t.contact} <span className="ml-2">→</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t.close : t.menu}
              className="lg:hidden h-9 w-9 rounded-full border border-white/15 flex items-center justify-center"
            >
              <span className="relative block w-4 h-3">
                <span className={`absolute left-0 top-0 h-px w-4 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-0 h-px w-4 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[70] bg-[#0b0d0d] text-white transition-all duration-500 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="sellf-container pt-28 pb-10 min-h-full flex flex-col justify-between">
          <nav className="flex flex-col border-t border-white/15">
            {[
              [t.services, `${langPrefix}/services`],
              [t.portfolio, `${langPrefix}/portfolio`],
              [t.about, `${langPrefix}/about`],
              [t.blog, `${langPrefix}/blog`],
              [t.contact, `${langPrefix}/contact`],
            ].map(([label, href], i) => (
              <Link key={href} href={href} onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between border-b border-white/15 py-5 text-3xl font-semibold tracking-[-.04em]">
                <span>{label}</span><span className="text-sm opacity-40 group-hover:opacity-100">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="pt-10 text-[10px] uppercase tracking-[.24em] text-white/45">Strategy · Creative · Media · Technology · Real Growth.</div>
        </div>
      </div>
    </>
  );
}
