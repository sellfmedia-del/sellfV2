type Props = {
  brand: string;
  className?: string;
};

const logos: Record<string, string> = {
  "Fizyohol": "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png",
  "NutralEN": "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png",
  "Shevec": "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "S'hevec": "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "Evepack": "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png",
  "Sfera": "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  "Sfera.ai": "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  "Philips": "https://cdn.sellfmedia.workers.dev/essentials/logophilips.png",
  "Qashé": "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png",
  "Qashe": "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png",
  "Goldium": "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
  "Grey Manner": "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
  "LVMH": "https://cdn.sellfmedia.workers.dev/essentials/logolvmh.png",
  "Lions Darwin": "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
  "Zühre Ana": "https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png",
  "Rollbab": "https://cdn.sellfmedia.workers.dev/essentials/logorollbab.png",
  "Schnitzel Landmann": "https://cdn.sellfmedia.workers.dev/essentials/logoscnitzel.png",
  "GKC": "https://cdn.sellfmedia.workers.dev/essentials/logogkc.png",
  "ASCE GYO": "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png",
  "CMS Makina": "https://cdn.sellfmedia.workers.dev/essentials/logocms.png",
};

export default function SolutionProofLogo({ brand, className = "" }: Props) {
  const src = logos[brand];

  if (!src) {
    return (
      <span
        aria-label={brand}
        className={`text-center text-[13px] font-extrabold uppercase tracking-[-.035em] ${className}`}
      >
        {brand}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={brand}
      loading="lazy"
      className={`max-h-12 max-w-[150px] object-contain ${className}`}
    />
  );
}
