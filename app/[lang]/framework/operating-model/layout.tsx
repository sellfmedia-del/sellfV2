import "./visual-refine.css";
import "./mockup-fidelity.css";
import "./overlap-fix.css";
import hero0 from "@/components/ophero/hero0";
import hero1 from "@/components/ophero/hero1";
import hero2 from "@/components/ophero/hero2";
import hero3 from "@/components/ophero/hero3";
import hero4 from "@/components/ophero/hero4";
import hero5 from "@/components/ophero/hero5";
import hero6 from "@/components/ophero/hero6";

const heroDataUri = `data:image/webp;base64,${hero0}${hero1}${hero2}${hero3}${hero4}${hero5}${hero6}`;

export default function OperatingModelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .opModelVisualRefine [class*="heroVisual"]::before {
          background: url("${heroDataUri}") center 56% / cover no-repeat !important;
          filter: none !important;
          inset: 0 !important;
          transform: none !important;
          opacity: 1 !important;
        }
        .opModelVisualRefine [class*="heroVisual"]::after {
          background: linear-gradient(90deg, rgba(11,16,19,.10) 0%, transparent 12%, transparent 88%, rgba(11,16,19,.08) 100%) !important;
        }
      `}</style>
      <div className="opModelVisualRefine">{children}</div>
    </>
  );
}
