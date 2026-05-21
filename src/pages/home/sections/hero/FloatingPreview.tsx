import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Cpu,
  Activity,
  MemoryStick,
  Network,
  Database,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Text } from "@/components";

type Provider = {
  id: string;
  name: string;
  icon: string;
  region: string;
  nodes: string;
  health: number;
  status: "ok" | "warn";
};

const PROVIDERS: Provider[] = [
  {
    id: "aws",
    name: "AWS",
    icon: "/aws.svg",
    region: "us-east-1",
    nodes: "1.2k nodes",
    health: 98,
    status: "ok",
  },
  {
    id: "azure",
    name: "Azure",
    icon: "/azure.svg",
    region: "westeurope",
    nodes: "896 nodes",
    health: 96,
    status: "ok",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    icon: "/cloud.svg",
    region: "us-central1",
    nodes: "612 nodes",
    health: 94,
    status: "ok",
  },
  {
    id: "priv",
    name: "On-Prem",
    icon: "/data-center.svg",
    region: "dc-frankfurt",
    nodes: "318 nodes",
    health: 87,
    status: "warn",
  },
];

type ResourceStat = {
  id: string;
  label: string;
  value: number;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const RESOURCES: ResourceStat[] = [
  { id: "cpu", label: "CPU", value: 87, Icon: Cpu },
  { id: "gpu", label: "GPU", value: 72, Icon: Activity },
  { id: "ram", label: "RAM", value: 64, Icon: MemoryStick },
  { id: "net", label: "Net", value: 41, Icon: Network },
  { id: "sto", label: "Sto", value: 12, Icon: Database },
];

const CARD_SHADOW =
  "0 1px 0 color-mix(in srgb, var(--color-text-primary) 4%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--color-text-primary) 10%, transparent), 0 40px 80px -32px color-mix(in srgb, var(--color-accent-primary) 18%, transparent)";

const CARD_SHADOW_HOVER =
  "0 1px 0 color-mix(in srgb, var(--color-text-primary) 5%, transparent), 0 12px 30px -14px color-mix(in srgb, var(--color-text-primary) 14%, transparent), 0 48px 90px -32px color-mix(in srgb, var(--color-accent-primary) 26%, transparent)";

export default function FloatingPreview() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative w-full max-w-[520px] mx-auto"
      aria-hidden="true"
    >
      {/* Ambient gradient backdrop */}
      <motion.div
        className="absolute -inset-2 rounded-[36px] pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, color-mix(in srgb, var(--color-accent-primary) 14%, transparent), transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={
          reduced ? undefined : { scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
        className="relative rounded-[28px] surface-soft bg-bgPrimary p-5 lg:p-6"
        style={{
          boxShadow:
            "0 1px 0 color-mix(in srgb, var(--color-text-primary) 4%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--color-text-primary) 12%, transparent), 0 40px 80px -32px color-mix(in srgb, var(--color-accent-primary) 22%, transparent)",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full surface-success-soft">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accentSuccess"
              animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <Sparkles className="w-3 h-3 text-accentSuccess" strokeWidth={2.5} />
            <Text size={12} weight="semibold" variant="accentSuccess">
              Live orchestration
            </Text>
          </div>
          <Text size={12} weight="semibold" className="opacity-60">
            18 regions · 3.0k nodes
          </Text>
        </motion.div>

        {/* Resource strip — lucide-icon mini pills */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="grid grid-cols-5 gap-1.5 mb-4"
        >
          {RESOURCES.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.5 + i * 0.06,
                ease: "easeOut",
              }}
              className="rounded-lg px-1.5 py-1.5 surface-soft"
              style={{
                background:
                  "color-mix(in srgb, var(--color-text-primary) 3%, transparent)",
              }}
            >
              <div className="flex items-center gap-1">
                <r.Icon
                  className="w-3 h-3 text-accentPrimary shrink-0"
                  strokeWidth={2.25}
                />
                <Text size={12} weight="semibold" className="opacity-65 leading-none">
                  {r.label}
                </Text>
                <Text
                  size={12}
                  weight="bold"
                  variant="textPrimary"
                  className="ml-auto leading-none tabular-nums"
                >
                  {r.value}
                </Text>
              </div>
              <div
                className="mt-1.5 h-[2px] rounded-full overflow-hidden"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-text-primary) 6%, transparent)",
                }}
              >
                <motion.div
                  className="h-full rounded-full bg-accentPrimary"
                  initial={{ width: 0 }}
                  animate={{ width: `${r.value}%` }}
                  transition={{
                    duration: 0.9,
                    delay: 0.7 + i * 0.06,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Provider grid */}
        <div className="grid grid-cols-2 gap-3">
          {PROVIDERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                delay: 0.6 + i * 0.07,
              }}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -2,
                      scale: 1.005,
                      boxShadow: CARD_SHADOW_HOVER,
                    }
              }
              className="relative rounded-2xl p-4 surface-soft bg-bgPrimary overflow-hidden"
              style={{
                transition: "box-shadow 200ms ease",
                boxShadow: CARD_SHADOW,
              }}
            >
              {/* Top row: logo + status */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center surface-soft"
                  style={{ background: "var(--color-bg-primary)" }}
                >
                  <img
                    src={p.icon}
                    alt=""
                    className="w-6 h-6 object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="relative mt-0.5 inline-flex items-center justify-center">
                  <span
                    className={`absolute w-2 h-2 rounded-full ${
                      p.status === "ok" ? "bg-accentSuccess" : "bg-accentError"
                    }`}
                    style={
                      p.status === "ok"
                        ? {
                            boxShadow:
                              "0 0 0 3px color-mix(in srgb, var(--color-accent-success) 20%, transparent)",
                            transform: "translate(-9px, 0)",
                          }
                        : {
                            boxShadow:
                              "0 0 0 3px color-mix(in srgb, var(--color-accent-error) 20%, transparent)",
                            transform: "translate(-9px, 0)",
                          }
                    }
                  />
                  {p.status === "ok" ? (
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-accentSuccess"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <AlertCircle
                      className="w-3.5 h-3.5 text-accentError"
                      strokeWidth={2.5}
                    />
                  )}
                </span>
              </div>

              {/* Provider name + region */}
              <Text size={14} weight="bold" variant="textPrimary">
                {p.name}
              </Text>
              <Text size={12} className="opacity-50 mt-0.5">
                {p.region}
              </Text>

              {/* Nodes + health bar */}
              <div className="mt-3 flex items-center justify-between">
                <Text size={12} weight="semibold" className="opacity-70">
                  {p.nodes}
                </Text>
                <Text
                  size={12}
                  weight="bold"
                  variant={p.status === "ok" ? "accentSuccess" : "accentError"}
                >
                  {p.health}%
                </Text>
              </div>
              <div className="mt-1.5 h-1 rounded-full overflow-hidden surface-soft">
                <motion.div
                  className={`h-full ${
                    p.status === "ok" ? "bg-accentSuccess" : "bg-accentError"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.health}%` }}
                  transition={{
                    duration: 1.2,
                    delay: 0.9 + i * 0.07,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-5 flex items-center justify-between px-1"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accentPrimary"
              aria-hidden="true"
            />
            <Text size={12} weight="semibold" className="opacity-70">
              Synced 2s ago
            </Text>
          </div>
          <span className="inline-flex items-center gap-1">
            <Text size={12} weight="bold" variant="accentPrimary">
              View topology
            </Text>
            <ArrowUpRight
              className="w-3.5 h-3.5 text-accentPrimary"
              strokeWidth={2.5}
            />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
