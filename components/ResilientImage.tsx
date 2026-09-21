"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ResilientImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
  priority?: boolean;
};

function buildSources(src: string) {
  const sources = [src.trim()];

  try {
    const url = new URL(src.trim());
    if (url.hostname === "ik.imagekit.io" && url.pathname.includes("/Blog/")) {
      const filename = decodeURIComponent(url.pathname.split("/").pop() || "");
      if (filename) sources.push(`https://cdn.sellfmedia.workers.dev/blog/${encodeURIComponent(filename)}`);
    }
  } catch {
    // Relative and malformed CMS values safely fall through to the placeholder.
  }

  return Array.from(new Set(sources));
}

export default function ResilientImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "100vw",
  priority = false,
}: ResilientImageProps) {
  const sources = useMemo(() => buildSources(src), [src]);
  const [imageState, setImageState] = useState({ src, sourceIndex: 0, failed: false });
  const currentState = imageState.src === src
    ? imageState
    : { src, sourceIndex: 0, failed: false };

  if (currentState.failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} flex items-end overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(74,74,224,.28),transparent_38%),linear-gradient(145deg,#171819,#303238)]`}
      >
        <span className="m-4 text-[9px] font-semibold uppercase tracking-[.2em] text-white/55">Sellf Insight</span>
      </div>
    );
  }

  return (
    <Image
      src={sources[currentState.sourceIndex]}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      className={className}
      onError={() => {
        if (currentState.sourceIndex < sources.length - 1) {
          setImageState({ src, sourceIndex: currentState.sourceIndex + 1, failed: false });
        } else {
          setImageState({ src, sourceIndex: currentState.sourceIndex, failed: true });
        }
      }}
    />
  );
}
