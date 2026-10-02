"use client";

type PortfolioVideoVariant = "card" | "detail" | "gallery";

type PortfolioVideoProps = {
  url: string;
  title: string;
  variant: PortfolioVideoVariant;
  className?: string;
};

export function isPortfolioVideo(url: string) {
  return /vimeo\.com/i.test(url) || /\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(url);
}

function getVimeoEmbedUrl(url: string, variant: PortfolioVideoVariant) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const idIndex = parts.findIndex((part) => /^\d+$/.test(part));
    const videoId = idIndex >= 0 ? parts[idIndex] : null;

    if (!videoId) return url;

    const possiblePathHash = parts[idIndex + 1];
    const hash =
      parsed.searchParams.get("h") ||
      (possiblePathHash && !/^\d+$/.test(possiblePathHash) ? possiblePathHash : null);

    const params = new URLSearchParams();

    if (hash) params.set("h", hash);
    params.set("dnt", "1");
    params.set("playsinline", "1");

    if (variant === "detail") {
      params.set("autoplay", "1");
      params.set("loop", "1");
      params.set("title", "0");
      params.set("byline", "0");
      params.set("portrait", "0");
    } else {
      params.set("background", "1");
      params.set("autoplay", "1");
      params.set("muted", "1");
      params.set("loop", "1");
      params.set("autopause", "0");
    }

    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  } catch {
    return url;
  }
}

export default function PortfolioVideo({
  url,
  title,
  variant,
  className = "",
}: PortfolioVideoProps) {
  const isVimeo = /vimeo\.com/i.test(url);

  if (!isVimeo) {
    if (variant === "detail") {
      return (
        <video
          src={url}
          autoPlay
          loop
          controls
          playsInline
          className={className || "w-full h-auto max-h-[82vh] object-contain bg-black"}
        />
      );
    }

    return (
      <video
        src={url}
        muted
        loop
        autoPlay
        playsInline
        className={className}
      />
    );
  }

  const isDetail = variant === "detail";

  return (
    <div
      className={
        isDetail
          ? "relative w-full aspect-video bg-black"
          : `relative w-full aspect-video overflow-hidden ${className}`
      }
    >
      <iframe
        src={getVimeoEmbedUrl(url, variant)}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className={
          isDetail
            ? "absolute inset-0 h-full w-full"
            : "absolute inset-0 h-full w-full pointer-events-none"
        }
      />
    </div>
  );
}
