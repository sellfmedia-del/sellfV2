"use client";

import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = { name: formData.get("name"), contact: formData.get("contact") };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        sendGAEvent("event", "contact_request", { method: "quick_contact_form" });
        setTimeout(() => { setIsOpen(false); setStatus("idle"); }, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed right-4 md:right-7 bottom-4 md:bottom-6 z-[9990] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-3 w-[min(320px,calc(100vw-2rem))] bg-[#0b0d0d]/96 backdrop-blur-xl border border-white/12 p-5 shadow-[0_18px_55px_rgba(0,0,0,.32)] text-white">
          {status === "success" ? (
            <div className="py-5">
              <div className="sellf-kicker text-white/35 mb-4">Quick contact</div>
              <p className="text-base font-semibold">Sinyal alındı.</p>
              <p className="text-xs text-white/45 mt-1">En kısa sürede dönüş yapacağız.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/65">Hızlı İletişim</h3>
                <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
              </div>
              <input
                name="name"
                required
                type="text"
                placeholder="İsim / Şirket"
                className="w-full bg-white/[.035] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-white/28 focus:outline-none focus:border-white/35 transition-colors"
              />
              <input
                name="contact"
                required
                type="text"
                placeholder="E-posta veya Telefon"
                className="w-full bg-white/[.035] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-white/28 focus:outline-none focus:border-white/35 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-black font-semibold py-3 text-[10px] uppercase tracking-[.16em] hover:bg-[#f1f0ec] transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "İLETİLİYOR..." : "BİZE ULAŞIN"}
              </button>
              {status === "error" && <p className="text-red-300 text-[10px]">Bir hata oluştu, lütfen tekrar deneyin.</p>}
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hızlı İletişim"
        className="h-12 w-12 rounded-full bg-[#0b0d0d] border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,.25)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform overflow-hidden"
      >
        {isOpen ? (
          <span className="text-white text-sm">✕</span>
        ) : (
          <img src="https://cdn.sellfmedia.workers.dev/statics/tunisia-call-mascot-cartoon-vector.png" alt="Hızlı İletişim" className="w-10 h-10 object-contain grayscale" />
        )}
      </button>
    </div>
  );
}
