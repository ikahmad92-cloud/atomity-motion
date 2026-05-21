import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, ArrowUpRight, Menu, X } from "lucide-react";
import { Text } from "@/components";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="sticky top-0 z-50"
      style={{
        backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
        background: scrolled
          ? "color-mix(in srgb, var(--color-bg-primary) 78%, transparent)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)"
          : "1px solid transparent",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      <nav
        aria-label="Primary"
        className="section-wrap flex items-center justify-between h-16"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Atomity home"
        >
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
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative inline-flex items-center text-textPrimary opacity-70 hover:opacity-100 transition-opacity"
              >
                <Text size={14} weight="semibold">
                  {l.label}
                </Text>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA group */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#signin"
            className="inline-flex items-center px-3 py-2 rounded-full hover:opacity-100 opacity-70 transition"
          >
            <Text size={14} weight="semibold">
              Sign in
            </Text>
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center gap-1.5 pl-4 pr-3.5 py-2 rounded-full bg-accentPrimary text-bgPrimary hover:scale-[1.03] active:scale-[0.98] transition"
            style={{
              boxShadow:
                "0 8px 20px -8px color-mix(in srgb, var(--color-accent-primary) 60%, transparent)",
            }}
          >
            <Text size={14} weight="bold" variant="bgPrimary">
              Get started
            </Text>
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-10 h-10 rounded-full surface-soft inline-flex items-center justify-center"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden section-wrap pb-4"
        >
          <div className="rounded-2xl p-4 surface-soft bg-bgPrimary flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-[color-mix(in_srgb,var(--color-text-primary)_5%,transparent)]"
              >
                <Text size={14} weight="semibold">
                  {l.label}
                </Text>
              </a>
            ))}
            <div className="h-px my-2" style={{ background: "color-mix(in srgb, var(--color-text-primary) 8%, transparent)" }} />
            <a
              href="#signin"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5"
            >
              <Text size={14} weight="semibold" className="opacity-70">
                Sign in
              </Text>
            </a>
            <a
              href="#get-started"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-accentPrimary"
            >
              <Text size={14} weight="bold" variant="bgPrimary">
                Get started
              </Text>
              <ArrowUpRight className="w-4 h-4 text-bgPrimary" strokeWidth={2.5} />
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
