/**
 * Single source of truth for company facts.
 *
 * Every number here is traceable to the corporate spec. Nothing is invented.
 * Fields marked TODO need real values before launch — they render as honest
 * empty states rather than placeholder text.
 */

export const company = {
  name: "Morlatis Group of Companies",
  shortName: "Morlatis",
  tagline: "Innovation Unfurl",
  founded: 2018,
  headquarters: "Patna, Bihar",
  domain: "www.morlatis.com",

  // TODO: replace with the real published number before launch.
  phone: "+91 00000 00000",
  email: "info@morlatis.com",
  projectsEmail: "projects@morlatis.com",
  careersEmail: "careers@morlatis.com",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM",

  offices: [
    { city: "Patna", state: "Bihar", role: "Head Office" },
    { city: "New Delhi", state: "Delhi", role: "Regional" },
    { city: "Ranchi", state: "Jharkhand", role: "Regional" },
    { city: "Lucknow", state: "Uttar Pradesh", role: "Regional" },
  ],

  social: {
    linkedin: "https://www.linkedin.com/company/morlatis",
    instagram: "https://www.instagram.com/morlatis",
    facebook: "https://www.facebook.com/morlatis",
    youtube: "https://www.youtube.com/@morlatis",
  },
} as const;

/** Operating states. Kept at 4 — the figure used in the corporate spec. */
export const statesOfOperation = ["Bihar", "Jharkhand", "Uttar Pradesh", "Delhi"] as const;

export type Metric = {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  note: string;
};

/**
 * Headline figures. Revenue is deliberately absent: the Group publishes its
 * delivery record, not its P&L.
 */
export const metrics: Metric[] = [
  { value: 8, prefix: "", suffix: "+", decimals: 0, label: "Years", note: "Since 2018" },
  {
    value: 5000,
    prefix: "",
    suffix: "+",
    decimals: 0,
    label: "Electrification works",
    note: "Delivered across India",
  },
  { value: 30, prefix: "", suffix: "+", decimals: 0, label: "Clients", note: "Utilities & EPC" },
  { value: 4, prefix: "", suffix: "", decimals: 0, label: "States", note: "Operating footprint" },
];

export const credentials = [
  {
    title: "Government Electrical Contractor",
    detail: "Licensed for HT and LT works across state utility networks.",
  },
  {
    title: "Indian Railways Vendor",
    detail: "Approved for electrical material supply and works.",
  },
  {
    title: "MSTC Authorised Vendor",
    detail: "Registered for metal and material procurement.",
  },
  {
    title: "PHED Class-2 Registered",
    detail: "Public Health Engineering Department, Bihar.",
  },
  {
    title: "Bihar Police Building Vendor",
    detail: "Empanelled for institutional electrical infrastructure.",
  },
] as const;

/**
 * `logo` is each client's own published mark, taken from their corporate site
 * and served locally. It is optional: a client without one renders a monogram
 * instead, which is why nothing needs a placeholder file.
 */
export const clients = [
  {
    name: "SBPDCL",
    full: "South Bihar Power Distribution Company Ltd",
    sector: "Utility",
    logo: "/img/clients/sbpdcl.jpg",
  },
  {
    name: "NBPDCL",
    full: "North Bihar Power Distribution Company Ltd",
    sector: "Utility",
    logo: "/img/clients/nbpdcl.jpg",
  },
  {
    name: "Indian Railways",
    full: "Indian Railways",
    sector: "Public",
    logo: "/img/clients/indian-railways.png",
  },
  {
    name: "Power Grid",
    full: "Power Grid Corporation of India",
    sector: "Utility",
    logo: "/img/clients/powergrid.svg",
  },
  { name: "L&T", full: "Larsen & Toubro", sector: "EPC", logo: "/img/clients/lt.svg" },
  {
    name: "Sterling & Wilson",
    full: "Sterling & Wilson",
    sector: "EPC",
    logo: "/img/clients/sterling-wilson.svg",
  },
  {
    name: "Ashoka Buildcon",
    full: "Ashoka Buildcon",
    sector: "EPC",
    logo: "/img/clients/ashoka-buildcon.png",
  },
  { name: "Polycab", full: "Polycab India", sector: "Industry", logo: "/img/clients/polycab.png" },
  { name: "Medanta", full: "Medanta", sector: "Institutional", logo: "/img/clients/medanta.svg" },
  { name: "IL&FS", full: "IL&FS", sector: "Infrastructure", logo: "/img/clients/ilfs.png" },
  { name: "RKI India", full: "RKI India", sector: "Industry", logo: "/img/clients/rki.png" },
  { name: "OBSC", full: "OBSC", sector: "Infrastructure", logo: "/img/clients/obsc.jpg" },
  { name: "Aayom Group", full: "Aayom Group", sector: "Industry", logo: "/img/clients/aayom.png" },
] as const;

export const timeline = [
  {
    year: "2018",
    title: "Founded in Patna",
    body: "Incorporated as a specialised electrical contracting firm serving Bihar's distribution utilities.",
  },
  {
    year: "2020",
    title: "Railway & sourcing verticals",
    body: "Expanded into railway electrical works and material supply under MSTC authorisation.",
  },
  {
    year: "2022",
    title: "Automation capability",
    body: "Launched RTU / FRTU / SCADA engineering and relay retrofitting practices.",
  },
  {
    year: "2024",
    title: "5,000+ electrification works",
    body: "Crossed five thousand electrification works delivered across India, serving 30+ clients.",
  },
  {
    year: "2026",
    title: "Vasudhaara Foundation",
    body: "Established the Group's CSR arm for healthcare, agriculture, education, food and community programmes.",
  },
  {
    year: "2028",
    title: "A national footprint",
    body: "Scaling automation, railway and wealth-management verticals beyond the four founding states.",
    projected: true,
  },
] as const;

/**
 * Messages from the Founder and the Managing Director.
 *
 * DRAFT COPY — every `body` paragraph below is placeholder written to hold the
 * layout, and every `name` is unset. Replace the paragraphs with the real text
 * when it arrives and fill in `name`; the section renders whatever is here and
 * falls back to the role alone while `name` is empty. Nothing else needs to
 * change anywhere in the codebase.
 */
export type ExecutiveMessage = {
  role: string;
  name: string;
  eyebrow: string;
  heading: string;
  body: string[];
  /** Portrait, served from /public/img. Falls back to a monogram plate. */
  image?: string;
  draft: boolean;
};

export const executiveMessages: ExecutiveMessage[] = [
  {
    role: "Founder",
    name: "",
    eyebrow: "From the Founder",
    heading: "We started with one substation and a promise to hand it over right.",
    body: [
      "Morlatis began in 2018 with a single conviction: that infrastructure work in Eastern India could be held to the same standard as anywhere else in the country, and that the difference would show up in the handover, not the pitch.",
      "Eight years later the discipline is unchanged. Every scheme we build has to be energised, tested and accepted on a live network by an engineer who did not write our brochure. That is the only measure of the work we take seriously.",
    ],
    draft: true,
  },
  {
    role: "Managing Director",
    name: "",
    eyebrow: "From the Managing Director",
    heading: "Capability first. Scale is what follows.",
    body: [
      "Our growth has come from adding engineering capability rather than headcount to the same scope — telemetry, protection, railway electrification and now wealth management, each standing on its own commercially.",
      "What holds the Group together is a single field organisation with one safety regime and one quality process. It is why a utility, a railway zone and an EPC major can each expect the same behaviour from us on site.",
    ],
    draft: true,
  },
];

/**
 * The disciplines the Group is organised into. This was the fallback content
 * for a Leadership page that has since been withdrawn; it is kept because it is
 * a true description of how accountability is split, and is cheap to render
 * wherever that becomes useful again.
 */
export const disciplines = [
  { area: "Executive", detail: "Group strategy, governance and capital allocation." },
  { area: "Projects & EPC", detail: "Substation, line works and turnkey delivery." },
  { area: "Automation", detail: "RTU, FRTU, SCADA and protection engineering." },
  { area: "Railway", detail: "Electrification, signalling power and IR vendor supply." },
  { area: "Supply Chain", detail: "Procurement, vendor management and logistics." },
  { area: "Finance & Compliance", detail: "Statutory compliance, audit and reporting." },
] as const;
