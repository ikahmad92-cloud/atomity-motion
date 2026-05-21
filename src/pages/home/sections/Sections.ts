import { HeroSection } from "./hero";
import { CloudVizSection } from "./cloud-viz";
import { MetricsSection } from "./metrics";
import { CtaSection } from "./cta";

/**
 * Component registry — namespace-style access to every page section.
 * Usage:  <Sections.HeroSection />  |  <Sections.CloudVizSection />
 */
export const Sections = {
  HeroSection,
  CloudVizSection,
  MetricsSection,
  CtaSection,
} as const;

export type SectionKey = keyof typeof Sections;
