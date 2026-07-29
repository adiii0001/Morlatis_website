import type { Metadata, Viewport } from "next";
import { Poppins, Raleway, Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { company } from "@/content/company";

/**
 * Three families, matching the reference type system the client signed off on:
 * Raleway sets the headings, Roboto sets the running text, Poppins sets the
 * navigation and other UI chrome. Raleway and Roboto ship as variable fonts;
 * Poppins does not, so its weights are declared.
 */
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE = "https://www.morlatis.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Morlatis Group — Electrical EPC, SCADA & Automation Engineering",
    template: "%s | Morlatis Group",
  },
  description:
    "Morlatis Group is a multi-vertical electrical engineering group in Patna, Bihar: substation EPC, RTU/FRTU/SCADA, relay retrofitting, railway electrical works, material supply and commodity trading.",
  applicationName: "Morlatis Group",
  keywords: [
    "electrical EPC contractor Bihar",
    "SCADA engineering India",
    "RTU FRTU supplier",
    "relay retrofitting IEC 61850",
    "railway electrical contractor",
    "substation automation Patna",
    "Morlatis Group",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE,
    siteName: "Morlatis Group",
    title: "Morlatis Group — Electrical EPC, SCADA & Automation Engineering",
    description:
      "Substation EPC, telemetry and protection engineering for the utilities, railways and contractors building India's power network.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morlatis Group — Electrical EPC & Automation",
    description:
      "Substation EPC, telemetry and protection engineering across Bihar, Jharkhand, Uttar Pradesh and Delhi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#050d19",
  colorScheme: "light",
};

/** Organisation schema — previously absent entirely. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: "Morlatis",
  url: SITE,
  slogan: company.tagline,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  areaServed: ["Bihar", "Jharkhand", "Uttar Pradesh", "Delhi"],
  sameAs: Object.values(company.social),
  knowsAbout: [
    "Electrical EPC",
    "SCADA engineering",
    "RTU and FRTU deployment",
    "Relay retrofitting",
    "Railway electrical works",
    "IEC 61850",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${roboto.variable} ${raleway.variable} ${poppins.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <SmoothScroll />

        <script
          type="application/ld+json"
          // Static, first-party object — not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
