import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Text } from "@/components";
import type { CloudKpi } from "@/hooks";

type Props = {
  kpi: CloudKpi;
  index: number;
};

const toneClass: Record<CloudKpi["tone"], string> = {
  primary: "text-accentPrimary",
  success: "text-accentSuccess",
  error: "text-accentError",
};

const toneIcon: Record<
  CloudKpi["tone"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  primary: Sparkles,
  success: TrendingUp,
  error: AlertCircle,
};

const KPI_SHADOW =
  "0 1px 0 color-mix(in srgb, var(--color-text-primary) 4%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--color-text-primary) 10%, transparent), 0 40px 80px -32px color-mix(in srgb, var(--color-accent-primary) 14%, transparent)";

const KPI_SHADOW_HOVER =
  "0 1px 0 color-mix(in srgb, var(--color-text-primary) 5%, transparent), 0 14px 32px -14px color-mix(in srgb, var(--color-text-primary) 14%, transparent), 0 48px 90px -32px color-mix(in srgb, var(--color-accent-primary) 24%, transparent)";

export default function KpiCard({ kpi, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(kpi.value);
      return;
    }
    const controls = animate(count, kpi.value, {
      duration: 1.4,
      ease: "easeOut",
      delay: index * 0.12,
    });
    return controls.stop;
  }, [inView, kpi.value, count, index, reduced]);

  const ToneIcon = toneIcon[kpi.tone];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: index * 0.08,
      }}
      whileHover={
        reduced
          ? undefined
          : { y: -2, scale: 1.005, boxShadow: KPI_SHADOW_HOVER }
      }
      className="kpi-card relative rounded-2xl p-6 surface-soft bg-bgPrimary"
      style={{
        transition: "box-shadow 200ms ease",
        boxShadow: KPI_SHADOW,
      }}
    >
      {/* Tone icon (top-right) */}
      <span
        aria-hidden="true"
        className={`absolute top-5 right-5 ${toneClass[kpi.tone]}`}
        style={{ opacity: 0.5 }}
      >
        <ToneIcon className="w-3.5 h-3.5" strokeWidth={2.25} />
      </span>

      <div className="flex items-center justify-between mb-4 pr-7">
        <Text size={12} weight="semibold" className="opacity-60 tracking-wider">
          {kpi.label.toUpperCase()}
        </Text>
        <span
          className={`badge-${kpi.tone === "success" ? "success" : "primary"} inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
            kpi.tone === "success" ? "surface-success-soft" : "surface-accent-soft"
          }`}
        >
          {kpi.trend === "up" ? (
            <TrendingUp
              className={`w-3 h-3 ${
                kpi.tone === "success"
                  ? "text-accentSuccess"
                  : "text-accentPrimary"
              }`}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          ) : (
            <TrendingDown
              className={`w-3 h-3 ${
                kpi.tone === "success"
                  ? "text-accentSuccess"
                  : "text-accentPrimary"
              }`}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          )}
          <Text
            size={12}
            weight="bold"
            variant={kpi.tone === "success" ? "accentSuccess" : "accentPrimary"}
          >
            {kpi.delta}%
          </Text>
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <motion.span
          className={`font-bold ${toneClass[kpi.tone]}`}
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}
        >
          <motion.span>{rounded}</motion.span>
        </motion.span>
        <Text size={24} weight="semibold" className={toneClass[kpi.tone]}>
          {kpi.unit}
        </Text>
      </div>

      <Text size={14} className="opacity-60 mt-2 capitalize">
        Real-time · {kpi.source}
      </Text>

      {/* Decorative bar — fills with the value */}
      <div className="mt-5 h-1 rounded-full overflow-hidden surface-soft">
        <motion.div
          className={`h-full ${
            kpi.tone === "success" ? "bg-accentSuccess" : "bg-accentPrimary"
          }`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min(100, kpi.value)}%` } : undefined}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + index * 0.08 }}
        />
      </div>
    </motion.article>
  );
}
