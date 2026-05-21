import { motion } from "framer-motion";
import { Button, Skeleton, Text } from "@/components";
import { useCloudMetrics } from "@/hooks";
import KpiCard from "./KpiCard";

export default function MetricsSection() {
  const { metrics, isLoading, isError, refetch, isFetching } = useCloudMetrics();

  return (
    <section
      aria-labelledby="metrics-heading"
      className="relative py-24 lg:py-32"
    >
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full surface-accent-soft mb-4">
            <Text size={12} variant="accentPrimary" weight="semibold">
              LIVE FLEET METRICS
            </Text>
          </div>
          <Text
            as="h2"
            id="metrics-heading"
            size={44}
            weight="bold"
            variant="textPrimary"
            className="leading-[1.1] tracking-tight"
          >
            Numbers from the{" "}
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
              orchestration layer
            </span>
          </Text>
          <Text size={18} className="opacity-70 mt-4">
            Streamed from your active fleet — cached on the client so revisits
            are instant.
          </Text>
        </motion.div>

        {isError ? (
          <div
            role="alert"
            className="rounded-2xl p-8 surface-soft flex flex-col items-start gap-4"
          >
            <Text size={20} weight="semibold" variant="accentError">
              We couldn't reach the metrics service.
            </Text>
            <Text size={14} className="opacity-70">
              Check your connection and try again.
            </Text>
            <Button
              btnText="Retry"
              variant="primary"
              onClick={() => refetch()}
              isLoading={isFetching}
            />
          </div>
        ) : (
          <div className="kpi-grid-wrap"><div className="kpi-grid">
            {isLoading || !metrics
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 surface-soft bg-bgPrimary"
                  >
                    <Skeleton width="40%" height={12} className="mb-4" />
                    <Skeleton width="60%" height={48} className="mb-3" />
                    <Skeleton width="80%" height={14} />
                    <Skeleton
                      width="100%"
                      height={4}
                      className="mt-5 rounded-full"
                    />
                  </div>
                ))
              : metrics.map((kpi, i) => (
                  <KpiCard key={kpi.id} kpi={kpi} index={i} />
                ))}
          </div></div>
        )}
      </div>
    </section>
  );
}
