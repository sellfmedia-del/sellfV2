"use client";

import { useEffect } from "react";
import AboutHero from "@/components/AboutHero";
import DynamicMotivations from "@/components/DynamicMotivations";
import OurJourney from "@/components/OurJourney";
import Testimonials from "@/components/Testimonials";
import OurPartners from "@/components/OurPartners";
import GrowthSimulator from "@/components/GrowthSimulator";

export default function AboutClient() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="w-full bg-sellf-surface">
      <AboutHero />
      <DynamicMotivations />
      <OurJourney />
      <Testimonials />
      <OurPartners />
      <GrowthSimulator />
    </div>
  );
}
