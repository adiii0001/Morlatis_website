import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { EnquiryForm } from "./enquiry-form";
import { company } from "@/content/company";

/**
 * The old contact page was a single `"use client"` component, so it could not
 * export metadata at all — the highest commercial-intent page on the site had
 * none. The page is now a server component with the form isolated as the only
 * client island.
 */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Morlatis Group for electrical EPC, SCADA and automation, relay retrofitting, railway electrical works, material supply or commodity trading enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what needs to be energised."
        lede="Send the specification and we will come back with a technical response — scope, standards and a delivery view."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Direct
              </h2>
              <dl className="mt-6">
                {[
                  {
                    icon: "pin" as const,
                    label: "Registered office",
                    value: `${company.name}, ${company.headquarters}, India`,
                  },
                  { icon: "phone" as const, label: "Telephone", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
                  { icon: "mail" as const, label: "General", value: company.email, href: `mailto:${company.email}` },
                  {
                    icon: "mail" as const,
                    label: "Projects & tenders",
                    value: company.projectsEmail,
                    href: `mailto:${company.projectsEmail}`,
                  },
                  { icon: "clock" as const, label: "Business hours", value: company.hours },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start gap-4 border-t border-line py-5 last:border-b"
                  >
                    <Icon name={row.icon} size={17} className="mt-0.5 shrink-0 text-signal-600" />
                    <div className="min-w-0">
                      <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink-900">
                        {row.href ? (
                          <a href={row.href} className="transition-colors hover:text-signal-700">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <h2 className="mt-12 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Offices
              </h2>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {company.offices.map((o) => (
                  <li key={o.city} className="bg-white px-5 py-5">
                    <p className="font-display text-[1rem] font-semibold text-ink-950">{o.city}</p>
                    <p className="mt-0.5 text-[0.8125rem] text-ink-500">{o.state}</p>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-signal-700">
                      {o.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
