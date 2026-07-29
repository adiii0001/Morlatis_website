import type { IconName } from "@/components/ui/icon";

/**
 * Careers content.
 *
 * Kept separate from company.ts because the headline figures here are the ones
 * the client supplied for the recruitment page specifically — the team-size
 * number in particular is theirs, not a figure derived from the corporate spec.
 */

export const careerStats = [
  { value: "50+", label: "Team Members" },
  { value: "07", label: "Business Verticals" },
  { value: "Growth", label: "Culture" },
  { value: "Real", label: "Project Exposure" },
] as const;

export const whyMorlatis: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "rocket",
    title: "Real Project Exposure",
    body: "Work on live government, railway and PSU contracts from day one — not on training material.",
  },
  {
    icon: "book",
    title: "Learning & Development",
    body: "Structured training on RTU, FRTU, SCADA, relay retrofitting and EPC delivery systems.",
  },
  {
    icon: "briefcase",
    title: "Competitive Compensation",
    body: "Market-aligned salary with performance incentives and annual increments.",
  },
  {
    icon: "growth",
    title: "Fast Career Growth",
    body: "A group scaling toward ₹100 Cr means internal promotion happens quickly, and visibly.",
  },
  {
    icon: "handshake",
    title: "Collaborative Culture",
    body: "A flat hierarchy — you work directly with senior leadership, not three layers below it.",
  },
  {
    icon: "globe",
    title: "Pan-India Exposure",
    body: "Projects across Bihar, Delhi, Jharkhand and Uttar Pradesh, with the footprint still widening.",
  },
];

/**
 * Culture tiles.
 *
 * The images here are the stock photography carried in the company's own
 * brochure and deck — placeholders standing in for real site and office
 * photography. Swap `image` for the genuine article when it is shot; a tile
 * with no `image` falls back to a captioned schematic frame.
 */
export const cultureTiles: { caption: string; icon: IconName; span: string; image?: string }[] = [
  {
    caption: "Field engineering on the network",
    icon: "tower",
    span: "sm:col-span-2",
    image: "/img/epc-engineers.jpg",
  },
  {
    caption: "Plant and processing work",
    icon: "furnace",
    span: "",
    image: "/img/industries-sourcing.jpg",
  },
  { caption: "Recognition & awards", icon: "shield", span: "" },
  {
    caption: "Substation and transformer projects",
    icon: "transformer",
    span: "sm:col-span-2",
    image: "/img/epc-substation.jpg",
  },
  /* Spans are chosen so both rows close exactly: 2+1+1 then 2+2 at four
     columns, and 2 / 1+1 / 2 / 2 at two. No ragged tail either way. */
  { caption: "Training and development", icon: "book", span: "sm:col-span-2" },
];

export const departments: { icon: IconName; name: string }[] = [
  { icon: "bolt", name: "Electrical EPC & Projects" },
  { icon: "signal", name: "SCADA & Automation Engineering" },
  { icon: "relay", name: "Relay Protection Engineering" },
  { icon: "rail", name: "Railway Electrical Works" },
  { icon: "crate", name: "Strategic Sourcing & Logistics" },
  { icon: "trend", name: "Finance & Accounts" },
  { icon: "gauge", name: "Business Development & Tendering" },
  { icon: "globe", name: "Sales, Marketing & Digital" },
  { icon: "people", name: "Human Resources" },
  { icon: "shield", name: "Legal & Compliance" },
];

export type Opening = {
  title: string;
  category: string;
  department: string;
  location: string;
  type: string;
  body: string;
};

export const openings: Opening[] = [
  {
    title: "Project Manager — Electrical EPC",
    category: "Management",
    department: "Electrical EPC & Projects",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Own end-to-end execution of substation and line works: planning, subcontractor coordination, outage scheduling and commissioning handover.",
  },
  {
    title: "SCADA / RTU Engineer",
    category: "Automation",
    department: "SCADA & Automation Engineering",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Configure and commission RTU/FRTU devices and SCADA integrations. Point list engineering, protocol mapping and site commissioning.",
  },
  {
    title: "Protection Engineer — Relay Retrofitting",
    category: "Engineering",
    department: "Relay Protection Engineering",
    location: "Multiple sites",
    type: "Full-time",
    body: "Coordination studies, relay setting calculations and supervision of numerical protection retrofits under outage conditions.",
  },
  {
    title: "Railway Electrical Engineer",
    category: "Engineering",
    department: "Railway Electrical Works",
    location: "Patna / Gorakhpur",
    type: "Full-time",
    body: "Execute station electrification, signalling power supply and IR material supply scope under railway safety governance.",
  },
  {
    title: "Site Supervisor — Electrical",
    category: "Engineering",
    department: "Electrical EPC & Projects",
    location: "Bihar / Jharkhand",
    type: "Full-time",
    body: "Supervise installation and termination work on site, enforce safety protocol and maintain daily progress and test records.",
  },
  {
    title: "Business Development Manager",
    category: "Sales",
    department: "Business Development & Tendering",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Tender tracking, pre-qualification, client relationships and order pipeline across utilities and EPC contractors in Eastern India.",
  },
  {
    title: "Accounts & Compliance Executive",
    category: "Finance",
    department: "Finance & Accounts",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Project accounting, GST and TDS compliance, vendor reconciliation and support for statutory audit and reporting cycles.",
  },
  {
    title: "HR Executive — Talent & Operations",
    category: "HR",
    department: "Human Resources",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Run technical hiring end to end, manage onboarding for site and office staff, and own attendance, payroll inputs and records.",
  },
];

export const jobCategories = [
  "All",
  ...Array.from(new Set(openings.map((o) => o.category))),
] as const;
