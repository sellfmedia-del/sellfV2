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
    engage: "Engage",
    blog: "Blog",
    contact: "İletişim",
    menu: "Menü",
    close: "Kapat",
  },
  en: {
    about: "About Us",
    services: "What We Do",
    portfolio: "Portfolio",
    engage: "Engage",
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
  const isEngage = pathname?.includes("/engage") ?? false;

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
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${isEngage ? (isScrolled ? "pt-2" : "pt-0") : isScrolled ? "pt-3" : "pt-5 md:pt-6"}`}>
        <div className={`sellf-container flex items-center justify-between transition-all duration-300 ${isEngage ? (isScrolled ? "h-14 rounded-[14px] px-3 text-white md:px-4" : "h-20 rounded-none border-b border-white/10 px-0 text-white") : "h-14 rounded-full px-4 md:px-5"} ${
          isEngage && !isScrolled
            ? "bg-transparent"
            : isScrolled
            ? "bg-[#0b0d0d]/92 text-white shadow-[0_12px_40px_rgba(0,0,0,.18)] backdrop-blur-xl border border-white/10"
            : "bg-[#0b0d0d]/78 text-white backdrop-blur-md border border-white/10"
        }`}>
          <Link href={langPrefix} aria-label="Sellf Media" onClick={() => setIsMenuOpen(false)} className={isEngage ? `flex shrink-0 items-center transition-[gap] duration-300 ${isScrolled ? "gap-2" : "gap-3"}` : "relative h-7 w-[74px] md:w-[82px] shrink-0"}>
            {isEngage ? <><span className={`relative block shrink-0 transition-[width,height] duration-300 ${isScrolled ? "h-7 w-7" : "h-9 w-9"}`}><Image src="/logo-beyaz.png" alt="Sellf Media Logo" fill priority sizes="36px" className="object-contain" /></span><span className={`border-l border-white/30 font-semibold tracking-[.22em] transition-all duration-300 ${isScrolled ? "pl-2 text-[9px]" : "pl-3 text-[10px]"}`}>ENGAGE</span></> : <Image src="/logo-beyaz.png" alt="Sellf Media Logo" fill priority className="object-contain object-left" />}
          </Link>

          <nav className={`hidden items-center font-medium transition-all duration-300 lg:flex ${isEngage && isScrolled ? "gap-5 text-[10px]" : "gap-7 text-[11px]"}`}>
            <Link href={`${langPrefix}/services`} className="hover:opacity-60 transition-opacity">{t.services}</Link>
            <Link href={`${langPrefix}/portfolio`} className="hover:opacity-60 transition-opacity">{t.portfolio}</Link>
            <Link href={`${langPrefix}/engage`} className="hover:opacity-60 transition-opacity">{t.engage}</Link>
            <Link href={`${langPrefix}/about`} className="hover:opacity-60 transition-opacity">{t.about}</Link>
            <Link href={`${langPrefix}/blog`} className="hover:opacity-60 transition-opacity">{t.blog}</Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className={`${isEngage && isScrolled ? "h-8 min-w-8 px-2.5 text-[9px]" : "h-9 min-w-9 px-3 text-[10px]"} rounded-full border border-white/15 font-semibold tracking-[.16em] transition-all hover:bg-white/10`}
              aria-label={currentLang === "tr" ? "Switch to English" : "Türkçeye geç"}
            >
              {currentLang === "tr" ? "EN" : "TR"}
            </button>

            <Link href={`${langPrefix}/contact`} className={`hidden items-center font-semibold transition-all md:inline-flex ${isEngage && isScrolled ? "h-8 px-3 text-[9px]" : "h-9 px-4 text-[10px]"} ${isEngage ? "rounded-md bg-[#4a4ae0] text-white hover:bg-[#5b5bea]" : "rounded-full bg-white text-black hover:bg-[#f1f0ec]"}`}>
              {t.contact} <span className="ml-2">→</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t.close : t.menu}
              className={`${isEngage && isScrolled ? "h-8 w-8" : "h-9 w-9"} flex items-center justify-center rounded-full border border-white/15 transition-all lg:hidden`}
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
              [t.engage, `${langPrefix}/engage`],
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
