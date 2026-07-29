"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/ui/icon";
import { verticals } from "@/content/verticals";

const aboutLinks = [
  { label: "Who We Are", href: "/about/who-we-are", note: "Capability, scale and footprint" },
  { label: "Our Story", href: "/about/our-story", note: "Origin, identity and journey" },
  { label: "Vision · Mission · Values", href: "/about/vision-mission", note: "What governs our decisions" },
  { label: "Morlatis Industries", href: "/about/morlatis-industries", note: "Metal recycling arm" },
];

const companyLinks = [
  { label: "Leadership", href: "/team", note: "The people accountable" },
  { label: "Awards & Recognition", href: "/awards", note: "Independent validation" },
  { label: "Careers", href: "/careers", note: "Open roles across verticals" },
  { label: "Newsroom", href: "/media", note: "Announcements and coverage" },
];

const flatLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
];

/* ------------------------------------------------------------------ */

function MegaLink({
  href,
  label,
  note,
  index,
}: {
  href: string;
  label: string;
  note: string;
  index?: string;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-50"
      >
        {index && (
          <span className="mt-[3px] font-mono text-[0.625rem] tracking-widest text-ink-500 transition-colors group-hover:text-signal-600">
            {index}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-semibold text-ink-900 transition-colors group-hover:text-signal-700">
            {label}
          </span>
          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">{note}</span>
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}

/* ------------------------------------------------------------------ */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<string | null>("verticals");

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      // Focus trap.
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const groups = [
    {
      id: "verticals",
      label: "Business Verticals",
      items: verticals.map((v) => ({ label: v.shortTitle, href: `/business-verticals/${v.slug}` })),
    },
    { id: "about", label: "About", items: aboutLinks },
    { id: "company", label: "Company", items: companyLinks },
  ];

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      className="fixed inset-0 top-[var(--nav-h)] z-[70] overflow-y-auto overscroll-contain bg-white lg:hidden"
    >
      <nav aria-label="Main" className="shell py-6">
        <ul className="space-y-1">
          {flatLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onClose}
                className="block border-b border-line py-3.5 text-lg font-semibold text-ink-900"
              >
                {l.label}
              </Link>
            </li>
          ))}

          {groups.map((g) => {
            const expanded = section === g.id;
            return (
              <li key={g.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`m-${g.id}`}
                  onClick={() => setSection(expanded ? null : g.id)}
                  className="flex w-full items-center justify-between py-3.5 text-lg font-semibold text-ink-900"
                >
                  {g.label}
                  <Icon
                    name="chevron-down"
                    size={18}
                    className={`text-ink-400 transition-transform duration-300 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded && (
                  <ul id={`m-${g.id}`} className="pb-3">
                    {g.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block py-2.5 pl-4 text-[0.9375rem] text-ink-600"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <Link href="/contact" onClick={onClose} className="btn btn-signal mt-7 w-full">
          Request a quote
          <Icon name="arrow-right" size={16} />
        </Link>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /**
   * The home hero is a full-bleed dark stage; every other route opens on a
   * light masthead. Until the header acquires its own background on scroll it
   * has to adopt the tone of whatever is behind it — otherwise the wordmark
   * and nav links render near-black on near-black.
   */
  const onDark = pathname === "/" && !scrolled && !menuOpen;

  /* An open mobile panel docks the header to the top and gives it a surface,
     so the panel starts flush beneath the bar instead of over it. */
  const docked = scrolled || menuOpen;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const triggerClass = `group inline-flex h-9 items-center gap-1 rounded-full px-3 font-nav text-[0.875rem] font-medium transition-colors ${
    onDark
      ? "text-ink-200 hover:text-white data-[state=open]:text-white"
      : "text-ink-700 hover:text-ink-950 data-[state=open]:text-ink-950"
  }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 z-[65] transition-[top,background-color,box-shadow] duration-300 ${
          docked
            ? "top-0 border-b border-line bg-white/90 shadow-[0_1px_0_rgb(5_13_25/0.04)] backdrop-blur-xl"
            : "top-0 bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="Morlatis Group — home" className="shrink-0">
            <Logo compact={scrolled} invert={onDark} />
          </Link>

          <NavigationMenu.Root
            delayDuration={80}
            className="relative hidden lg:flex"
            aria-label="Main"
          >
            <NavigationMenu.List className="flex items-center gap-0.5">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  About
                  <Icon
                    name="chevron-down"
                    size={13}
                    className="text-ink-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[30rem] max-w-[calc(100vw-2rem)]">
                  <div className="grid grid-cols-1 gap-1 p-3">
                    {aboutLinks.map((l) => (
                      <MegaLink key={l.href} {...l} />
                    ))}
                    <div className="mt-1 border-t border-line pt-2">
                      <MegaLink
                        href="/about/vasudhaara-foundation"
                        label="Vasudhaara Foundation"
                        note="The Group's CSR arm"
                      />
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Business Verticals
                  <Icon
                    name="chevron-down"
                    size={13}
                    className="text-ink-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[46rem] max-w-[calc(100vw-2rem)]">
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-1">
                      {verticals.map((v) => (
                        <MegaLink
                          key={v.slug}
                          href={`/business-verticals/${v.slug}`}
                          label={v.shortTitle}
                          note={v.summary}
                        />
                      ))}
                    </div>
                    <div className="mt-2 border-t border-line px-3 pt-3">
                      <Link
                        href="/business-verticals"
                        className="link-rule text-signal-700"
                      >
                        All eight verticals
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {flatLinks.map((l) => (
                <NavigationMenu.Item key={l.href}>
                  <NavigationMenu.Link asChild>
                    <Link href={l.href} className={triggerClass}>
                      {l.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerClass}>
                  Company
                  <Icon
                    name="chevron-down"
                    size={13}
                    className="text-ink-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[26rem] max-w-[calc(100vw-2rem)]">
                  <div className="grid gap-1 p-3">
                    {companyLinks.map((l) => (
                      <MegaLink key={l.href} {...l} />
                    ))}
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            {/*
              Centred viewport with a bounded width. The previous fixed
              `w-[600px]` panel anchored under its trigger overflowed the
              viewport at the 1024px breakpoint.
            */}
            <div className="absolute left-1/2 top-full flex w-max -translate-x-1/2 justify-center pt-2">
              <NavigationMenu.Viewport
                className="relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] max-w-[calc(100vw-2rem)] origin-top overflow-hidden rounded-xl border border-line bg-white opacity-0 shadow-[0_8px_16px_rgb(5_13_25/0.06),0_32px_64px_rgb(5_13_25/0.14)] transition-[width,height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=open]:opacity-100"
              />
            </div>
          </NavigationMenu.Root>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className={`btn hidden h-11 px-6 sm:inline-flex ${
                onDark ? "btn-paper" : "btn-ink"
              }`}
            >
              Request a quote
              <Icon name="arrow-up-right" size={15} />
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                onDark
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-line text-ink-900 hover:bg-ink-50"
              }`}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
