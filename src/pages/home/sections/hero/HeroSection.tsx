import { motion } from "framer-motion";
import { Button, Text } from "@/components";
import FloatingPreview from "./FloatingPreview";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Slow ambient background gradient */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, color-mix(in srgb, var(--color-accent-primary) 10%, transparent), transparent 70%), radial-gradient(50% 50% at 80% 70%, color-mix(in srgb, var(--color-accent-success) 8%, transparent), transparent 70%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <div className="section-wrap w-full grid gap-10 lg:gap-16 lg:grid-cols-2 items-center py-20">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full surface-accent-soft"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-accentPrimary"
              aria-hidden="true"
            />
            <Text size={12} variant="accentPrimary" weight="semibold">
              Multi-cloud · live orchestration
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <Text
              as="h1"
              id="hero-heading"
              size={55}
              weight="bold"
              variant="textPrimary"
              className="leading-[1.05] tracking-tight"
            >
              Optimize Multi-Cloud
              <br />
              Infrastructure{" "}
              <span className="text-accentPrimary">Intelligently</span>
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          >
            <Text size={18} variant="textPrimary" className="opacity-70 max-w-xl">
              Real-time cloud orchestration with automated performance insights
              and cost optimization across AWS, Azure, GCP, and private fleets.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-2"
          >
            <Button btnText="View Architecture" variant="primary" />
            <Button btnText="Explore Metrics" variant="outline-primary" />
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4"
          >
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Saved</dt>
              <dd className="flex items-baseline gap-1.5">
                <Text size={16} weight="bold" variant="textPrimary">
                  $12.4K
                </Text>
                <Text size={14} className="opacity-60">
                  saved
                </Text>
              </dd>
            </div>
            <span aria-hidden="true" className="opacity-30 text-textPrimary">
              ·
            </span>
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Uptime</dt>
              <dd className="flex items-baseline gap-1.5">
                <Text size={16} weight="bold" variant="textPrimary">
                  99.97%
                </Text>
                <Text size={14} className="opacity-60">
                  uptime
                </Text>
              </dd>
            </div>
            <span aria-hidden="true" className="opacity-30 text-textPrimary">
              ·
            </span>
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Regions</dt>
              <dd className="flex items-baseline gap-1.5">
                <Text size={16} weight="bold" variant="textPrimary">
                  18
                </Text>
                <Text size={14} className="opacity-60">
                  regions
                </Text>
              </dd>
            </div>
          </motion.dl>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <FloatingPreview />
        </motion.div>
      </div>
    </section>
  );
}
