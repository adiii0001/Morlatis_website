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

export const metrics: Metric[] = [
  { value: 8, prefix: "", suffix: "+", decimals: 0, label: "Years", note: "Since 2018" },
  { value: 26.47, prefix: "₹", suffix: "Cr", decimals: 2, label: "Revenue", note: "FY 2023–24" },
  { value: 30, prefix: "", suffix: "+", decimals: 0, label: "Clients", note: "Utilities & EPC" },
  { value: 4, prefix: "", suffix: "", decimals: 0, label: "States", note: "Operating footprint" },
  { value: 100, prefix: "₹", suffix: "Cr", decimals: 0, label: "Target", note: "FY 2028" },
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
    detail: "Registered for metal and commodity procurement.",
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

export const clients = [
  { name: "SBPDCL", full: "South Bihar Power Distribution Company Ltd", sector: "Utility" },
  { name: "NBPDCL", full: "North Bihar Power Distribution Company Ltd", sector: "Utility" },
  { name: "Indian Railways", full: "Indian Railways", sector: "Public" },
  { name: "Power Grid", full: "Power Grid Corporation of India", sector: "Utility" },
  { name: "L&T", full: "Larsen & Toubro", sector: "EPC" },
  { name: "Sterling & Wilson", full: "Sterling & Wilson", sector: "EPC" },
  { name: "Ashoka Buildcon", full: "Ashoka Buildcon", sector: "EPC" },
  { name: "Polycab", full: "Polycab India", sector: "Industry" },
  { name: "Medanta", full: "Medanta", sector: "Institutional" },
  { name: "IL&FS", full: "IL&FS", sector: "Infrastructure" },
  { name: "RKI India", full: "RKI India", sector: "Industry" },
  { name: "OBSC", full: "OBSC", sector: "Infrastructure" },
  { name: "Aayom Group", full: "Aayom Group", sector: "Industry" },
] as const;

export const timeline = [
  {
    year: "2018",
    title: "Founded in Patna",
    body: "Incorporated as a specialised electrical contracting firm serving Bihar's distribution utilities.",
  },
  {
    year: "2020",
    title: "Railway & trading verticals",
    body: "Expanded into railway electrical works and commodity trading under MSTC authorisation.",
  },
  {
    year: "2022",
    title: "Automation capability",
    body: "Launched RTU / FRTU / SCADA engineering and relay retrofitting practices.",
  },
  {
    year: "2024",
    title: "₹26.47 Cr revenue",
    body: "Crossed ₹26.47 Cr in FY 2023–24, serving 30+ clients across four states.",
  },
  {
    year: "2025",
    title: "Vasudhaara Foundation",
    body: "Established the Group's CSR arm for education, healthcare and agriculture programmes.",
  },
  {
    year: "2028",
    title: "₹100 Cr target",
    body: "Scaling automation and railway verticals toward a ₹100 Cr revenue objective.",
    projected: true,
  },
] as const;

/**
 * Leadership. Names and photographs are intentionally absent — populate this
 * array with real people and the section renders them; leave it empty and the
 * section renders a truthful "details on request" state instead of inventing
 * executives.
 */
export const leadership: Array<{
  name: string;
  role: string;
  bio: string;
  image?: string;
}> = [];

export const leadershipDisciplines = [
  { area: "Executive", detail: "Group strategy, governance and capital allocation." },
  { area: "Projects & EPC", detail: "Substation, line works and turnkey delivery." },
  { area: "Automation", detail: "RTU, FRTU, SCADA and protection engineering." },
  { area: "Railway", detail: "Electrification, signalling power and IR vendor supply." },
  { area: "Supply Chain", detail: "Procurement, vendor management and logistics." },
  { area: "Finance & Compliance", detail: "Statutory compliance, audit and reporting." },
] as const;
