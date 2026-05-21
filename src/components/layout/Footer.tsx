import { motion } from "framer-motion";
import { Boxes, Mail } from "lucide-react";
import type { SVGProps } from "react";
import { Text } from "@/components";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#overview" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "API reference", href: "#api" },
      { label: "Guides", href: "#guides" },
      { label: "Status", href: "#status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
      { label: "DPA", href: "#dpa" },
    ],
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: GithubIcon },
  { label: "Twitter", href: "https://x.com", Icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "Email", href: "mailto:hello@atomity.dev", Icon: Mail },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-24 pt-16 pb-10"
      style={{
        borderTop:
          "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
        background:
          "radial-gradient(80% 60% at 50% 0%, color-mix(in srgb, var(--color-accent-primary) 5%, transparent), transparent 60%)",
      }}
    >
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] mb-12"
        >
          {/* Brand block */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent-primary), color-mix(in srgb, var(--color-accent-primary) 60%, var(--color-accent-success)))",
                  boxShadow:
                    "0 6px 16px -6px color-mix(in srgb, var(--color-accent-primary) 60%, transparent)",
                }}
              >
                <Boxes className="w-4 h-4 text-bgPrimary" strokeWidth={2.5} />
              </span>
              <Text size={18} weight="bold" variant="textPrimary">
                Atomity
              </Text>
            </div>
            <Text size={14} className="opacity-65 leading-relaxed">
              Intelligent multi-cloud orchestration. Detect inefficiencies,
              rebalance workloads, and prove the savings — across every
              provider, in real time.
            </Text>
            <div className="flex items-center gap-2 mt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full inline-flex items-center justify-center surface-soft hover:scale-[1.06] transition"
                >
                  <s.Icon
                    className="w-4 h-4 text-textPrimary opacity-70"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <Text
                size={12}
                weight="bold"
                className="opacity-50 tracking-wider"
              >
                {col.title.toUpperCase()}
              </Text>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <Text size={14}>{l.label}</Text>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <div
          className="pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{
            borderTop:
              "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
          }}
        >
          <Text size={12} className="opacity-55">
            © {new Date().getFullYear()} Atomity Labs · All rights reserved
          </Text>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accentSuccess" />
              <Text size={12} weight="semibold" className="opacity-65">
                All systems operational
              </Text>
            </span>
            <Text size={12} className="opacity-40">
              v1.4.2
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
