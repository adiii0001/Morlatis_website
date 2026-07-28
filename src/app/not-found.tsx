import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <div className="page-top pb-32">
      <div className="shell">
        <div className="max-w-[36rem]">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-signal-700">
            Error 404
          </p>
          <h1 className="display-2 mt-6">This circuit isn&apos;t connected.</h1>
          <p className="lede mt-6">
            The page you asked for doesn&apos;t exist, or has moved. The links below cover most of
            what people come here for.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-ink">
              Back to home
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link href="/business-verticals" className="btn btn-line">
              Business verticals
            </Link>
            <Link href="/contact" className="btn btn-line">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
