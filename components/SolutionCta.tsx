"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function SolutionCta({ label }: { label: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "sellf-introduction" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace="sellf-introduction"
      data-cal-link="sellf-media-in7uaw/sellf-introduction"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
      className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span>{label.replace(/\s*→\s*$/, "")}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
    </button>
  );
}
