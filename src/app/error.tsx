"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/** Route error boundary — previously absent, so any thrown error fell through
 *  to the default Next.js error screen. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-top pb-32">
      <div className="shell">
        <div className="max-w-[36rem]">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-signal-700">
            Unexpected fault
          </p>
          <h1 className="display-2 mt-6">Something tripped.</h1>
          <p className="lede mt-6">
            An error interrupted this page. Retrying usually clears it — if it doesn&apos;t, the
            contact page will reach us directly.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-[0.75rem] text-ink-500">Reference: {error.digest}</p>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className="btn btn-ink">
              Try again
              <Icon name="arrow-right" size={16} />
            </button>
            <Link href="/contact" className="btn btn-line">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
