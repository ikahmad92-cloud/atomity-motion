import { Footer, Navbar } from "@/components";
import { Sections } from "./sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Sections.HeroSection />
        <Sections.CloudVizSection />
        <Sections.MetricsSection />
        <Sections.CtaSection />
      </main>
      <Footer />
    </>
  );
}
