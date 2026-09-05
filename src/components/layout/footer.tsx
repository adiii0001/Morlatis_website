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
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Evidence",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Clients", href: "/clients" },
      { label: "Awards & Recognition", href: "/awards" },
      { label: "CSR · Vasudhaara Foundation", href: "/csr" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** The phone number is unpublished. Render the row only once it is real. */
const phoneIsReal = !/0{5}/.test(company.phone);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="stage-deep relative overflow-hidden text-white">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative shell">
        <div className="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="lg:col-span-4">
            <Logo invert />
            <p className="measure mt-6 text-[0.9375rem] leading-relaxed text-white/80">
              A multi-vertical electrical engineering and automation group, headquartered in
              {" "}{company.headquarters}, operating across four states.
            </p>

            <ul className="mt-8 space-y-3.5 text-[0.875rem] text-white/80">
              <li className="flex items-start gap-3">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-signal-200" />
                <span>{company.headquarters}, India</span>
              </li>
              {phoneIsReal && (
                <li className="flex items-start gap-3">
                  <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-signal-200" />
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {company.phone}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-signal-200" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-signal-200" />
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/80 transition-colors hover:border-white/60 hover:text-white"
                  >
                    <SocialIcon name={s.name} size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Business verticals" className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              Business Verticals
            </h2>
            <ul className="mt-6 space-y-3">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/business-verticals/${v.slug}`}
                    className="text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                  >
                    {v.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                  {col.heading}
                </h2>
                <ul className="mt-6 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.9375rem] text-white/80 transition-colors hover:text-white"
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

        {/*
          The closing strip. Deliberately one line on anything above a phone —
          it previously ran two stacked rows with 28px of padding above and
          below, which left a band of empty green as tall as a section header
          under content that is three links and a copyright notice.
        */}
        <div className="flex flex-col gap-2 py-4 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          {/* white/80 on the deep green — meets AA for small text. */}
          <p className="text-white/80">
            © {year} {company.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link href="/privacy" className="text-white/80 transition-colors hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/80 transition-colors hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-white/80 transition-colors hover:text-white">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
