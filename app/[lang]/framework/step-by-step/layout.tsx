import type { CSSProperties } from "react";
import visual0 from "@/components/stepassets/visual0";
import visual1 from "@/components/stepassets/visual1";
import visual2 from "@/components/stepassets/visual2";
import visual3 from "@/components/stepassets/visual3";
import visual4 from "@/components/stepassets/visual4";

const visualDataUri = `data:image/webp;base64,${visual0}${visual1}${visual2}${visual3}${visual4}`;

export default function StepByStepLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--step-visual-image": `url("${visualDataUri}")`,
  } as CSSProperties;

  return (
    <div className="stepVisualEmbedded" style={style}>
      <style>{`
        .stepVisualEmbedded div[class*="visual"] {
          background-image: var(--step-visual-image) !important;
        }
      `}</style>
      {children}
    </div>
  );
}
