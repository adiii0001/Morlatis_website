import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/**
 * Shared page masthead.
 *
 * One offset (.page-top, derived from the chrome tokens) and one heading size
 * for every inner page — replacing the `pt-32` / `pt-20 md:pt-[112px]` drift
 * and the `text-5xl` / bare-`<h1>` split that gave sibling pages different
 * heading sizes.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumb,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  breadcrumb?: { label: string; href: string };
  align?: "left" | "wide";
}) {
  return (
    <header className="page-top border-b border-line bg-paper-cool pb-14">
      <div className="shell">
        {/* .eyebrow is inline-flex, so the breadcrumb needs its own block or the
            two sit on one line. */}
        {breadcrumb && (
          <div className="mb-8">
            <Link
              href={breadcrumb.href}
              className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink-500 transition-colors hover:text-signal-700"
            >
              <Icon name="arrow-right" size={14} className="rotate-180" />
              {breadcrumb.label}
            </Link>
          </div>
        )}

        <div>
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
        </div>

        <h1
          className={`display-2 mt-6 ${align === "wide" ? "max-w-[52rem]" : "max-w-[40rem]"}`}
          data-reveal
        >
          {title}
        </h1>

        {lede && (
          <p
            className="lede mt-6 max-w-[42rem]"
            data-reveal
          >
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}
