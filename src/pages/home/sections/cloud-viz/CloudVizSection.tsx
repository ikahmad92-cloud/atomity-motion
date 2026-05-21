import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Server,
  Sparkles,
  DollarSign,
  Cpu,
  MemoryStick,
  Network,
  Database,
} from "lucide-react";
import { Text } from "@/components";

type FeatureBlock = {
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
  visual: "providers" | "activity" | "savings";
};

const FEATURES: FeatureBlock[] = [
  {
    eyebrow: "UNIFIED VISIBILITY",
    title: "One control layer for every cloud",
    body: "Monitor AWS, Azure, GCP, and private infrastructure side by side. No tab-switching, no exports — just one live view of your fleet.",
    visual: "providers",
  },
  {
    eyebrow: "REAL-TIME OPTIMIZATION",
    title: "Inefficiencies caught the moment they appear",
    body: "Atomity detects idle workloads and rebalances them across providers automatically. Every action is logged, reversible, and policy-checked.",
    reverse: true,
    visual: "activity",
  },
  {
    eyebrow: "PERFORMANCE WITHOUT WASTE",
    title: "Lower spend, higher throughput",
    body: "Cut cloud bills while improving cluster performance. Atomity proves the result with side-by-side before/after metrics.",
    visual: "savings",
  },
];

/* ------------------------------------------------------------------ */
/* Visual 1 — UNIFIED VISIBILITY                                       */
/* A horizontal "region strip" status list. NOT a 2x2 grid.            */
/* ------------------------------------------------------------------ */

type Provider = {
  id: string;
  name: string;
  icon: string;
  region: string;
  nodes: string;
  util: number;
  status: "ok" | "warn";
};

const PROVIDERS: Provider[] = [
  { id: "aws",   name: "AWS",          icon: "/aws.svg",         region: "us-east-1",    nodes: "1,204", util: 78, status: "ok"   },
  { id: "azure", name: "Azure",        icon: "/azure.svg",       region: "westeurope",   nodes: "896",   util: 64, status: "ok"   },
  { id: "gcp",   name: "Google Cloud", icon: "/cloud.svg",       region: "us-central1",  nodes: "612",   util: 71, status: "ok"   },
  { id: "priv",  name: "On-Prem",      icon: "/data-center.svg", region: "dc-frankfurt", nodes: "318",   util: 42, status: "warn" },
];

const REGIONS = ["US-EAST", "EU-WEST", "ASIA-SE", "DC-FFM"];

type ResourcePill = {
  id: string;
  label: string;
  value: number;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const RESOURCE_PILLS: ResourcePill[] = [
  { id: "cpu", label: "CPU", value: 87, Icon: Cpu },
  { id: "gpu", label: "GPU", value: 72, Icon: Activity },
  { id: "ram", label: "RAM", value: 64, Icon: MemoryStick },
  { id: "net", label: "Net", value: 41, Icon: Network },
  { id: "sto", label: "Sto", value: 12, Icon: Database },
];

function ProvidersVisual() {
  return (
    <div
      className="w-full max-w-[560px] mx-auto relative"
      aria-hidden="true"
    >
      {/* Soft ambient glow behind */}
      <div
        className="absolute -inset-6 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 60% at 30% 50%, color-mix(in srgb, var(--color-accent-primary) 10%, transparent), transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      <div
        className="relative rounded-2xl p-5 lg:p-6"
        style={{
          background: "var(--color-bg-primary)",
          border:
            "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
          boxShadow:
            "0 1px 0 color-mix(in srgb, var(--color-text-primary) 4%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--color-text-primary) 10%, transparent), 0 40px 80px -32px color-mix(in srgb, var(--color-accent-primary) 18%, transparent)",
        }}
      >
        {/* Region badge strip — a "globe" feel */}
        <div className="flex items-center gap-1.5 mb-5 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 shrink-0">
            <Globe
              className="w-3.5 h-3.5 text-accentPrimary"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <Text size={12} weight="bold" className="opacity-50 tracking-[0.16em]">
              REGIONS
            </Text>
          </span>
          <span
            className="h-px flex-1 mx-2"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-text-primary) 12%, transparent), transparent)",
            }}
          />
          <div className="flex gap-1">
            {REGIONS.map((r, i) => (
              <motion.span
                key={r}
                initial={{ opacity: 0, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider"
                style={{
                  color: "var(--color-accent-primary)",
                  background:
                    "color-mix(in srgb, var(--color-accent-primary) 8%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-accent-primary) 18%, transparent)",
                }}
              >
                {r}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Status rows — horizontal, denser, list-style (NOT a grid) */}
        <div
          className="flex flex-col"
          role="presentation"
        >
          {PROVIDERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-4 py-3"
              style={{
                borderTop:
                  i === 0
                    ? "none"
                    : "1px dashed color-mix(in srgb, var(--color-text-primary) 9%, transparent)",
              }}
            >
              {/* Logo block */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-text-primary) 3%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-text-primary) 7%, transparent)",
                }}
              >
                <img src={p.icon} alt="" className="w-5 h-5 object-contain" loading="lazy" />
              </div>

              {/* Name + region + bar */}
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <Text size={14} weight="bold" variant="textPrimary" truncate>
                    {p.name}
                  </Text>
                  <Text size={12} className="opacity-45 truncate">
                    · {p.region}
                  </Text>
                  <span className="ml-auto">
                    <Text size={12} weight="semibold" className="opacity-55">
                      {p.nodes} nodes
                    </Text>
                  </span>
                </div>

                {/* Long thin utilization bar */}
                <div
                  className="h-[5px] rounded-full overflow-hidden relative"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-text-primary) 6%, transparent)",
                  }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.util}%` }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 1.0, delay: 0.25 + i * 0.08, ease: "easeOut" }}
                    style={{
                      background:
                        p.status === "ok"
                          ? "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-primary) 70%, transparent), var(--color-accent-primary))"
                          : "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-error) 55%, transparent), var(--color-accent-error))",
                    }}
                  />
                </div>
              </div>

              {/* Right: util % + status icon */}
              <div className="flex items-center gap-2 shrink-0">
                <Text
                  size={14}
                  weight="bold"
                  variant={p.status === "ok" ? "accentPrimary" : "accentError"}
                >
                  {p.util}%
                </Text>
                {p.status === "ok" ? (
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-accentSuccess"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    className="w-3.5 h-3.5 text-accentError"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resource breakdown strip — footer summary */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-4 pt-3 flex items-center flex-wrap gap-x-3 gap-y-1.5"
          style={{
            borderTop:
              "1px dashed color-mix(in srgb, var(--color-text-primary) 9%, transparent)",
          }}
        >
          {RESOURCE_PILLS.map((r, i) => (
            <span
              key={r.id}
              className="inline-flex items-center gap-1.5"
            >
              <r.Icon
                className="w-3 h-3 text-accentPrimary opacity-80"
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <Text size={12} weight="semibold" className="opacity-55 leading-none">
                {r.label}
              </Text>
              <Text
                size={12}
                weight="bold"
                variant="textPrimary"
                className="leading-none tabular-nums"
              >
                {r.value}%
              </Text>
              {i < RESOURCE_PILLS.length - 1 && (
                <span
                  className="inline-block w-1 h-1 rounded-full ml-1"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-text-primary) 18%, transparent)",
                  }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </motion.div>

        {/* Footer: aggregate stat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-3 pt-3 flex items-center justify-between"
          style={{
            borderTop:
              "1px solid color-mix(in srgb, var(--color-text-primary) 7%, transparent)",
          }}
        >
          <div className="inline-flex items-center gap-2">
            <CheckCircle2
              className="w-3.5 h-3.5 text-accentSuccess"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <Text size={12} weight="semibold" variant="accentSuccess">
              4 providers connected
            </Text>
          </div>
          <Text size={12} weight="semibold" className="opacity-55">
            3,030 nodes · 18 regions
          </Text>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visual 2 — REAL-TIME OPTIMIZATION                                   */
/* Dense ops-console with sparkline chart + feed.                      */
/* ------------------------------------------------------------------ */

type ActivityRow = {
  time: string;
  label: string;
  tone: "primary" | "success" | "error";
  tag?: string;
  tagTrend?: "up" | "down";
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const ACTIVITY: ActivityRow[] = [
  { time: "00:00", label: "Rebalanced webapp-3 → eu-west",   tone: "success", tag: "+18% perf",  tagTrend: "up",   Icon: RefreshCw },
  { time: "00:02", label: "Scaled down idle workers · us-east-1", tone: "primary", tag: "saved $340",                    Icon: TrendingDown },
  { time: "00:14", label: "Migrated cold storage → archive tier", tone: "success", tag: "saved $1.2k",                   Icon: Server },
  { time: "00:47", label: "Cluster drift detected · auto-fix",   tone: "error",   tag: "resolved",                       Icon: AlertCircle },
  { time: "01:02", label: "Spot fleet capacity reclaimed",       tone: "primary", tag: "+12 nodes", tagTrend: "up",      Icon: Sparkles },
];

// 12 sparkline data points (0..1)
const SPARK = [0.32, 0.48, 0.40, 0.62, 0.55, 0.74, 0.68, 0.82, 0.71, 0.88, 0.79, 0.94];

function ActivityVisual() {
  const reduced = useReducedMotion();
  const toneDot: Record<ActivityRow["tone"], string> = {
    primary: "bg-accentPrimary",
    success: "bg-accentSuccess",
    error:   "bg-accentError",
  };
  const toneVar: Record<ActivityRow["tone"], "accentPrimary" | "accentSuccess" | "accentError"> = {
    primary: "accentPrimary",
    success: "accentSuccess",
    error:   "accentError",
  };

  // Sparkline geometry
  const W = 100;
  const H = 32;
  const step = W / (SPARK.length - 1);
  const points = SPARK.map((v, i) => `${i * step},${H - v * (H - 4) - 2}`).join(" ");
  const areaPoints = `0,${H} ${points} ${W},${H}`;

  return (
    <div className="w-full max-w-[560px] mx-auto relative" aria-hidden="true">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-bg-primary)",
          border:
            "1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent)",
          boxShadow:
            "inset 0 1px 0 color-mix(in srgb, var(--color-bg-primary) 100%, transparent), 0 1px 0 color-mix(in srgb, var(--color-text-primary) 4%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--color-text-primary) 10%, transparent), 0 40px 80px -32px color-mix(in srgb, var(--color-accent-primary) 18%, transparent)",
        }}
      >
        {/* Console title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background:
              "color-mix(in srgb, var(--color-text-primary) 3%, transparent)",
            borderBottom:
              "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "color-mix(in srgb, var(--color-text-primary) 18%, transparent)" }}
              />
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "color-mix(in srgb, var(--color-text-primary) 12%, transparent)" }}
              />
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "color-mix(in srgb, var(--color-text-primary) 8%, transparent)" }}
              />
            </span>
            <span className="inline-flex items-center gap-1.5 ml-2">
              <Activity
                className="w-3 h-3 text-accentPrimary opacity-70"
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <Text size={12} weight="semibold" className="opacity-55 tracking-wider">
                ops-console
              </Text>
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full surface-accent-soft">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accentPrimary"
              animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <Zap
              className="w-2.5 h-2.5 text-accentPrimary"
              strokeWidth={2.75}
              aria-hidden="true"
            />
            <Text size={12} weight="bold" variant="accentPrimary">
              live
            </Text>
          </div>
        </div>

        {/* Chart panel */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-end justify-between mb-2">
            <div>
              <Text size={12} weight="semibold" className="opacity-50 tracking-wider">
                ACTIONS / MIN
              </Text>
              <div className="flex items-baseline gap-2 mt-0.5">
                <Text size={24} weight="bold" variant="textPrimary">
                  47
                </Text>
                <span className="inline-flex items-center gap-1">
                  <TrendingUp
                    className="w-3 h-3 text-accentSuccess"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <Text size={12} weight="bold" variant="accentSuccess">
                    12%
                  </Text>
                </span>
              </div>
            </div>
            <Text size={12} className="opacity-45">
              last 60 min
            </Text>
          </div>

          {/* Sparkline */}
          <div className="relative w-full h-[64px]">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--color-accent-primary)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid baseline */}
              <line
                x1="0" y1={H - 2} x2={W} y2={H - 2}
                stroke="color-mix(in srgb, var(--color-text-primary) 8%, transparent)"
                strokeWidth="0.3"
                strokeDasharray="0.6 0.6"
                vectorEffect="non-scaling-stroke"
              />

              {/* Area fill */}
              <motion.polygon
                points={areaPoints}
                fill="url(#sparkFill)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Line */}
              <motion.polyline
                points={points}
                fill="none"
                stroke="var(--color-accent-primary)"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Endpoint dot */}
              <motion.circle
                cx={(SPARK.length - 1) * step}
                cy={H - SPARK[SPARK.length - 1] * (H - 4) - 2}
                r="1.2"
                fill="var(--color-accent-primary)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.3, delay: 1.2 }}
              />
            </svg>

            {/* "Now" cursor */}
            <motion.div
              className="absolute top-0 bottom-0 w-px"
              style={{
                right: "2%",
                background:
                  "color-mix(in srgb, var(--color-accent-primary) 50%, transparent)",
              }}
              animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Event feed */}
        <div
          className="px-4 pb-4 pt-1"
          style={{
            borderTop:
              "1px dashed color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
          }}
        >
          <div className="flex items-center justify-between py-2">
            <Text size={12} weight="bold" className="opacity-50 tracking-wider">
              FEED
            </Text>
            <Text size={12} className="opacity-40 font-mono">
              t+01:02
            </Text>
          </div>
          <div className="flex flex-col gap-0.5">
            {ACTIVITY.map((row, i) => {
              const RowIcon = row.Icon;
              const toneAccent =
                row.tone === "primary"
                  ? "primary"
                  : row.tone === "success"
                  ? "success"
                  : "error";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease: "easeOut" }}
                  className="flex items-center gap-2.5 py-1.5"
                >
                  {/* Time pill (mono) */}
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{
                      color: "var(--color-text-primary)",
                      background:
                        "color-mix(in srgb, var(--color-text-primary) 6%, transparent)",
                      opacity: 0.7,
                    }}
                  >
                    {row.time}
                  </span>

                  {/* Row icon */}
                  <RowIcon
                    className="w-3 h-3 shrink-0 text-textPrimary"
                    strokeWidth={2.25}
                    style={{ opacity: 0.7 }}
                    aria-hidden="true"
                  />

                  {/* Dot */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${toneDot[row.tone]}`}
                  />

                  {/* Label */}
                  <Text size={14} weight="medium" variant="textPrimary" className="flex-1 min-w-0" truncate>
                    {row.label}
                  </Text>

                  {/* Tag */}
                  {row.tag && (
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 inline-flex items-center gap-1"
                      style={{
                        color: `var(--color-accent-${toneAccent})`,
                        background: `color-mix(in srgb, var(--color-accent-${toneAccent}) 9%, transparent)`,
                      }}
                    >
                      {row.tagTrend === "up" && (
                        <TrendingUp
                          className="w-2.5 h-2.5"
                          strokeWidth={2.75}
                          aria-hidden="true"
                        />
                      )}
                      {row.tagTrend === "down" && (
                        <TrendingDown
                          className="w-2.5 h-2.5"
                          strokeWidth={2.75}
                          aria-hidden="true"
                        />
                      )}
                      {row.tag}
                    </span>
                  )}
                  {/* Visually hidden — use toneVar to keep TS noUnusedLocals happy */}
                  <span className="sr-only">{toneVar[row.tone]}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visual 3 — PERFORMANCE WITHOUT WASTE                                */
/* Billboard: huge headline + horizontal stacked bars per month.       */
/* ------------------------------------------------------------------ */

type MonthBar = { month: string; before: number; after: number };

// "before" = original spend in $k. "after" = reclaimed savings in $k.
// Bar segments visually: AFTER (paid) grey + SAVED green.
const MONTHS: MonthBar[] = [
  { month: "FEB", before: 46.2, after: 8.1  },
  { month: "MAR", before: 47.8, after: 11.5 },
  { month: "APR", before: 48.6, after: 13.9 },
  { month: "MAY", before: 48.6, after: 15.5 },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 1,
  duration = 1.4,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const mv = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(mv, value, { duration, ease: "easeOut" });
    const unsub = mv.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, decimals, duration, mv, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function SavingsVisual() {
  const reduced = useReducedMotion();
  // Max total bar width reference (for scaling segment widths)
  const maxTotal = Math.max(...MONTHS.map((m) => m.before + m.after));

  return (
    <div className="w-full max-w-[600px] mx-auto relative" aria-hidden="true">
      {/* Soft success glow backdrop */}
      <div
        className="absolute -inset-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, color-mix(in srgb, var(--color-accent-success) 14%, transparent), transparent 70%)",
          filter: "blur(36px)",
        }}
      />

      {/* NO outer card frame — billboard sits on the page. */}
      <div className="relative">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="flex items-end gap-3 flex-wrap mb-1"
        >
          <Text size={12} weight="bold" className="opacity-55 tracking-[0.18em] w-full">
            SAVED THIS MONTH
          </Text>
          <div className="relative">
            <Text
              as="span"
              size={55}
              weight="bold"
              variant="accentSuccess"
              className="leading-none"
            >
              $<AnimatedNumber value={15.5} decimals={1} />k
            </Text>

            {/* Cute floating price-tag badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: 0.7,
              }}
              className="absolute -top-3 -right-6 pointer-events-none select-none"
              aria-hidden="true"
            >
              <motion.span
                className="inline-flex items-center gap-1 pl-1.5 pr-2 py-1 rounded-md relative"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-success) 92%, white 8%), var(--color-accent-success))",
                  color: "var(--color-bg-primary)",
                  boxShadow:
                    "0 4px 14px -4px color-mix(in srgb, var(--color-accent-success) 50%, transparent), 0 1px 0 color-mix(in srgb, var(--color-text-primary) 10%, transparent)",
                  transformOrigin: "center",
                }}
                animate={
                  reduced
                    ? undefined
                    : { y: [0, -3, 0], rotate: [0, -2, 0] }
                }
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Notch "hole" on the left edge */}
                <span
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-bg-primary)" }}
                  aria-hidden="true"
                />
                <DollarSign
                  className="w-3 h-3"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-bold tracking-wider">
                  $$$
                </span>
              </motion.span>
            </motion.span>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full mb-1.5"
            style={{
              background:
                "color-mix(in srgb, var(--color-accent-success) 12%, transparent)",
              border:
                "1px solid color-mix(in srgb, var(--color-accent-success) 24%, transparent)",
            }}
          >
            <TrendingDown
              className="w-3 h-3 text-accentSuccess"
              strokeWidth={2.75}
              aria-hidden="true"
            />
            <Text size={14} weight="bold" variant="accentSuccess">
              −32%
            </Text>
          </motion.span>
        </motion.div>

        <Text size={14} className="opacity-55 mb-7">
          vs. previous 4-month average · auto-applied across 18 regions
        </Text>

        {/* Bars block — borderless, with hairline grid */}
        <div className="relative">
          {/* hairline 100% rule */}
          <div
            className="absolute right-0 top-0 bottom-10 w-px"
            style={{
              background:
                "color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
            }}
          />

          <div className="flex flex-col gap-3.5">
            {MONTHS.map((m, i) => {
              const totalPct = ((m.before + m.after) / maxTotal) * 100;
              const beforeShare = m.before / (m.before + m.after);
              const afterShare = m.after / (m.before + m.after);
              return (
                <motion.div
                  key={m.month}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid grid-cols-[40px_1fr_72px] items-center gap-3"
                >
                  {/* Month label */}
                  <Text size={12} weight="bold" className="opacity-55 tracking-wider">
                    {m.month}
                  </Text>

                  {/* Stacked bar */}
                  <div className="relative h-7">
                    <motion.div
                      className="absolute inset-y-0 left-0 flex overflow-hidden rounded-md"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${totalPct}%` }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 1.1,
                        delay: 0.2 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* "Paid" segment (gray) */}
                      <div
                        className="h-full"
                        style={{
                          width: `${beforeShare * 100}%`,
                          background:
                            "color-mix(in srgb, var(--color-text-primary) 14%, transparent)",
                        }}
                      />
                      {/* "Saved" segment (green) */}
                      <div
                        className="h-full relative"
                        style={{
                          width: `${afterShare * 100}%`,
                          background:
                            "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-success) 75%, transparent), var(--color-accent-success))",
                        }}
                      >
                        {/* shimmer highlight at the leading edge */}
                        <span
                          className="absolute inset-y-0 right-0 w-[3px]"
                          style={{
                            background:
                              "color-mix(in srgb, var(--color-accent-success) 90%, white 30%)",
                            opacity: 0.6,
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Total */}
                  <span className="inline-flex items-center justify-end gap-1 text-right">
                    <DollarSign
                      className="w-2.5 h-2.5 text-accentSuccess opacity-70"
                      strokeWidth={2.75}
                      aria-hidden="true"
                    />
                    <Text size={14} weight="bold" variant="textPrimary" className="tabular-nums">
                      {(m.before + m.after).toFixed(1)}k
                    </Text>
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Legend row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-5 flex items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-2 rounded-sm"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-text-primary) 14%, transparent)",
                }}
              />
              <Text size={12} className="opacity-55" weight="semibold">
                Original spend
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-2 rounded-sm"
                style={{ background: "var(--color-accent-success)" }}
              />
              <Text size={12} weight="semibold" variant="accentSuccess">
                Reclaimed by Atomity
              </Text>
            </div>
          </motion.div>
        </div>

        {/* Micro-stat row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="mt-7 pt-5 flex flex-wrap items-center gap-x-7 gap-y-3"
          style={{
            borderTop:
              "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
          }}
        >
          <MicroStat dot="success" label="throughput" value="+18%" Icon={TrendingUp} />
          <MicroStat dot="primary" label="idle compute" value="−24%" Icon={TrendingDown} />
          <MicroStat dot="success" label="SLA points" value="+9" Icon={CheckCircle2} />
        </motion.div>
      </div>
    </div>
  );
}

function MicroStat({
  dot,
  label,
  value,
  Icon,
}: {
  dot: "primary" | "success" | "error";
  label: string;
  value: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  const iconColorClass =
    dot === "success"
      ? "text-accentSuccess"
      : dot === "primary"
      ? "text-accentPrimary"
      : "text-accentError";
  const textVar: "accentSuccess" | "accentPrimary" | "accentError" =
    dot === "success" ? "accentSuccess" : dot === "primary" ? "accentPrimary" : "accentError";
  return (
    <div className="flex items-center gap-2">
      <Icon
        className={`w-3.5 h-3.5 ${iconColorClass}`}
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <Text size={16} weight="bold" variant={textVar}>
        {value}
      </Text>
      <Text size={12} className="opacity-55">
        {label}
      </Text>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section block                                                       */
/* ------------------------------------------------------------------ */

function VisualFor({ kind }: { kind: FeatureBlock["visual"] }) {
  if (kind === "providers") return <ProvidersVisual />;
  if (kind === "activity") return <ActivityVisual />;
  return <SavingsVisual />;
}

function FeatureRow({ feature }: { feature: FeatureBlock }) {
  return (
    <div
      className={`section-wrap grid gap-10 lg:gap-16 lg:grid-cols-2 items-center py-20 lg:py-28 ${
        feature.reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <div className="inline-flex self-start px-3 py-1 rounded-full surface-accent-soft">
          <Text size={12} variant="accentPrimary" weight="semibold">
            {feature.eyebrow}
          </Text>
        </div>
        <Text
          as="h2"
          size={44}
          weight="bold"
          variant="textPrimary"
          className="leading-[1.1] tracking-tight"
        >
          {feature.title}
        </Text>
        <Text size={18} className="opacity-70 max-w-lg">
          {feature.body}
        </Text>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <VisualFor kind={feature.visual} />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export default function CloudVizSection() {
  return (
    <section aria-labelledby="features-heading" className="relative">
      <h2 id="features-heading" className="sr-only">
        Atomity capabilities
      </h2>
      {FEATURES.map((f) => (
        <FeatureRow key={f.eyebrow} feature={f} />
      ))}
    </section>
  );
}
