import { motion, useReducedMotion } from "framer-motion";
import { Rocket, MessageCircle, ShieldCheck, Zap, Globe2 } from "lucide-react";
import { Text } from "@/components";

const PROOF_STATS = [
  { icon: ShieldCheck, label: "SOC 2 Type II" },
  { icon: Globe2, label: "18 regions" },
  { icon: Zap, label: "Setup in 4 min" },
];

export default function CtaSection() {
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="cta-heading" className="relative pb-24 pt-8">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="relative rounded-[28px] lg:rounded-[36px] p-10 lg:p-16 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-primary) 10%, var(--color-bg-primary)) 0%, var(--color-bg-primary) 60%, color-mix(in srgb, var(--color-accent-success) 8%, var(--color-bg-primary)) 100%)",
            border:
              "1px solid color-mix(in srgb, var(--color-accent-primary) 18%, transparent)",
            boxShadow:
              "0 1px 0 color-mix(in srgb, var(--color-text-primary) 4%, transparent), 0 20px 60px -24px color-mix(in srgb, var(--color-accent-primary) 30%, transparent), 0 60px 120px -40px color-mix(in srgb, var(--color-accent-primary) 25%, transparent)",
          }}
        >
          {/* Dot grid background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in srgb, var(--color-text-primary) 12%, transparent) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 75%)",
              opacity: 0.7,
            }}
          />

          {/* Slow rotating soft orbit */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-32 -z-10 pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, color-mix(in srgb, var(--color-accent-primary) 8%, transparent), transparent 35%, color-mix(in srgb, var(--color-accent-success) 6%, transparent), transparent 70%, color-mix(in srgb, var(--color-accent-primary) 6%, transparent))",
              filter: "blur(40px)",
            }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />

          {/* Top eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 surface-accent-soft">
            <span className="relative flex w-1.5 h-1.5">
              <motion.span
                className="absolute inset-0 rounded-full bg-accentPrimary"
                animate={reduced ? undefined : { scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="relative w-1.5 h-1.5 rounded-full bg-accentPrimary" />
            </span>
            <Text size={12} variant="accentPrimary" weight="bold">
              Ready in 4 minutes · no credit card
            </Text>
          </div>

          {/* Headline */}
          <Text
            as="h2"
            id="cta-heading"
            size={48}
            weight="bold"
            variant="textPrimary"
            className="leading-[1.05] tracking-tight max-w-2xl mx-auto"
          >
            Ready to optimize your{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-primary), color-mix(in srgb, var(--color-accent-primary) 55%, var(--color-accent-success)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              cloud ecosystem?
            </span>
          </Text>

          {/* Subtext */}
          <Text size={18} className="opacity-70 mt-4 max-w-xl mx-auto">
            Plug Atomity into your fleet and start reclaiming idle compute
            within minutes. Most teams ship their first optimization the same
            day.
          </Text>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="#launch"
              className="inline-flex items-center gap-2 pl-5 pr-4 py-3 rounded-full bg-accentPrimary text-bgPrimary hover:scale-[1.03] active:scale-[0.98] transition"
              style={{
                boxShadow:
                  "0 10px 28px -10px color-mix(in srgb, var(--color-accent-primary) 60%, transparent)",
              }}
            >
              <Text size={14} weight="bold" variant="bgPrimary">
                Launch Infrastructure
              </Text>
              <Rocket className="w-4 h-4" strokeWidth={2.5} />
            </a>
            <a
              href="#talk"
              className="inline-flex items-center gap-2 pl-5 pr-4 py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--color-accent-primary) 30%, transparent)",
                color: "var(--color-accent-primary)",
              }}
            >
              <Text size={14} weight="bold" variant="accentPrimary">
                Talk to Engineering
              </Text>
              <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* Social proof strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {PROOF_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="inline-flex items-center gap-1.5"
              >
                <s.icon
                  className="w-3.5 h-3.5 text-accentPrimary"
                  strokeWidth={2.25}
                />
                <Text size={12} weight="semibold" className="opacity-70">
                  {s.label}
                </Text>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
