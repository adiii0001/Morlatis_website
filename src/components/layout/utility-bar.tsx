"use client";

import { useEffect, useState } from "react";
import { company } from "@/content/company";
import { Icon } from "@/components/ui/icon";
import { SocialIcon, type SocialName } from "@/components/ui/social-icon";

const socials: { name: SocialName; href: string; label: string }[] = [
  { name: "linkedin", href: company.social.linkedin, label: "Morlatis on LinkedIn" },
  { name: "instagram", href: company.social.instagram, label: "Morlatis on Instagram" },
  { name: "facebook", href: company.social.facebook, label: "Morlatis on Facebook" },
  { name: "youtube", href: company.social.youtube, label: "Morlatis on YouTube" },
];

export function UtilityBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // rAF-gated: the previous version called setState on every scroll event
    // from two separate components.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setHidden(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[60] h-[var(--util-h)] border-b border-white/10 bg-[#003a2b] transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="shell flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-5 text-[0.6875rem] text-white/80">
          {/* Phone and email stay visible on mobile — they are the two things a
              site visitor on a phone actually wants from a contractor. */}
          <a
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Icon name="phone" size={12} className="shrink-0 text-signal-200" />
            <span className="whitespace-nowrap">{company.phone}</span>
          </a>
          <a
            href={`mailto:${company.email}`}
            className="hidden items-center gap-1.5 transition-colors hover:text-white min-[400px]:flex"
          >
            <Icon name="mail" size={12} className="shrink-0 text-signal-200" />
            <span className="truncate">{company.email}</span>
          </a>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Icon name="pin" size={12} className="shrink-0 text-signal-200" />
            <span className="whitespace-nowrap">Patna · New Delhi · Ranchi · Lucknow</span>
          </span>
          <span className="hidden items-center gap-1.5 xl:flex">
            <Icon name="clock" size={12} className="shrink-0 text-signal-200" />
            <span className="whitespace-nowrap">{company.hours}</span>
          </span>
        </div>

        <ul className="flex shrink-0 items-center gap-1">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                /* 36px target — the previous 24px failed WCAG 2.5.8. */
                className="flex h-9 w-8 items-center justify-center text-white/60 transition-colors hover:text-white"
              >
                <SocialIcon name={s.name} size={13} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
