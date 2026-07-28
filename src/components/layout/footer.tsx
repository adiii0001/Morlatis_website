import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/ui/icon";
import { SocialIcon, type SocialName } from "@/components/ui/social-icon";
import { company } from "@/content/company";
import { verticals } from "@/content/verticals";

const socials: { name: SocialName; href: string; label: string }[] = [
  { name: "linkedin", href: company.social.linkedin, label: "Morlatis on LinkedIn" },
  { name: "instagram", href: company.social.instagram, label: "Morlatis on Instagram" },
  { name: "facebook", href: company.social.facebook, label: "Morlatis on Facebook" },
  { name: "youtube", href: company.social.youtube, label: "Morlatis on YouTube" },
];

const columns = [
  {
    heading: "Company",
    links: [
      { label: "Who We Are", href: "/about/who-we-are" },
      { label: "Our Story", href: "/about/our-story" },
      { label: "Vision · Mission · Values", href: "/about/vision-mission" },
      { label: "Morlatis Industries", href: "/about/morlatis-industries" },
      { label: "Leadership", href: "/team" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Evidence",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Clients", href: "/clients" },
      { label: "Awards & Recognition", href: "/awards" },
      { label: "Newsroom", href: "/media" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative shell">
        <div className="grid gap-14 border-b border-white/10 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-4">
            <Logo invert />
            <p className="measure mt-6 text-[0.9375rem] leading-relaxed text-ink-300">
              A multi-vertical electrical engineering and automation group, headquartered in
              {" "}{company.headquarters}, operating across four states.
            </p>

            <ul className="mt-8 space-y-3.5 text-[0.875rem] text-ink-300">
              <li className="flex items-start gap-3">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-signal-500" />
                <span>{company.headquarters}, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-signal-500" />
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-signal-400"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-signal-500" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-signal-400"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-signal-500" />
                <span>{company.hours}</span>
              </li>
            </ul>

            <ul className="mt-8 flex gap-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-ink-300 transition-colors hover:border-signal-500 hover:text-signal-400"
                  >
                    <SocialIcon name={s.name} size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Business verticals" className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
              Business Verticals
            </h2>
            <ul className="mt-6 space-y-3">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/business-verticals/${v.slug}`}
                    className="group flex items-baseline gap-3 text-[0.9375rem] text-ink-300 transition-colors hover:text-white"
                  >
                    <span className="font-mono text-[0.6875rem] text-ink-400 transition-colors group-hover:text-signal-400">
                      {v.index}
                    </span>
                    {v.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
                  {col.heading}
                </h2>
                <ul className="mt-6 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.9375rem] text-ink-300 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[0.8125rem] text-ink-400 md:flex-row md:items-center md:justify-between">
          {/* ink-300 on ink-950 — meets AA for small text, unlike the ink-400 used before. */}
          <p className="text-ink-300">
            © {year} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            <li>
              <Link href="/privacy" className="text-ink-300 transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-ink-300 transition-colors hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-ink-300 transition-colors hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
