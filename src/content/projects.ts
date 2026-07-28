/**
 * Project capability records.
 *
 * These describe the CLASSES of work the Group executes — scope, discipline and
 * technical envelope. They deliberately carry no client attribution, contract
 * value or date, because those are commercially sensitive claims that must come
 * from signed records rather than marketing copy.
 *
 * To publish real case studies: add `client`, `value`, `year` and `image` to an
 * entry and the detail page renders them automatically.
 */

export type ProjectCategory = "Government" | "Automation" | "Railway" | "Corporate";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  discipline: string;
  scope: string;
  detail: string;
  outcomes: string[];
  stack: string[];
  /** Optional — present only when a real, disclosable record exists. */
  client?: string;
  year?: string;
  value?: string;
  image?: string;
};

export const projectCategories: ProjectCategory[] = [
  "Government",
  "Automation",
  "Railway",
  "Corporate",
];

export const projects: Project[] = [
  {
    slug: "substation-electrification",
    title: "33 / 11 kV Substation Electrification",
    category: "Government",
    discipline: "Electrical EPC",
    scope: "Design · Supply · Erection · Commissioning",
    detail:
      "Turnkey delivery of distribution substations for state utilities — transformer erection, switchyard structures, HT and LT switchgear, protection, earthing and associated civil works, commissioned against utility acceptance protocols.",
    outcomes: [
      "Transformer erection and oil filtration to IS specification",
      "Switchgear installation with coordinated protection settings",
      "Earthing grid design and measured resistance verification",
      "Commissioning under live-network outage windows",
    ],
    stack: ["33 kV", "11 kV", "Protection", "Earthing"],
  },
  {
    slug: "feeder-automation",
    title: "Feeder Automation with FRTU",
    category: "Automation",
    discipline: "RTU · SCADA",
    scope: "Engineering · Supply · Integration",
    detail:
      "Deployment of feeder remote terminal units across distribution networks, giving control rooms real-time feeder status, remote switching capability and automated fault localisation.",
    outcomes: [
      "Real-time feeder telemetry to central SCADA",
      "Remote switching and load transfer capability",
      "Fault passage indication and section isolation",
      "Reduced outage restoration time",
    ],
    stack: ["FRTU", "IEC 60870-5-104", "SCADA", "Telemetry"],
  },
  {
    slug: "relay-room-modernisation",
    title: "Relay Room Modernisation",
    category: "Railway",
    discipline: "Relay Retrofitting",
    scope: "Retrofit · Rewiring · Testing",
    detail:
      "Replacement of legacy control and relay panels with numerical protection, complete re-termination, and migration to IEC 61850 station bus communication under railway safety governance.",
    outcomes: [
      "Numerical relay replacement with retained scheme logic",
      "Full rewiring and documented re-termination",
      "IEC 61850 GOOSE messaging between IEDs",
      "Primary and secondary injection test records",
    ],
    stack: ["IEC 61850", "Numerical IED", "GOOSE", "CRP"],
  },
  {
    slug: "central-scada",
    title: "Central SCADA Platform",
    category: "Automation",
    discipline: "RTU · SCADA",
    scope: "Architecture · Deployment · AMC",
    detail:
      "Supervisory control platforms aggregating telemetry from distributed substations into a single operational picture, with historian, alarm management and operator workstations.",
    outcomes: [
      "Multi-substation telemetry aggregation",
      "Alarm and event management with historian",
      "Operator HMI and reporting workflows",
      "Multi-year support and firmware management",
    ],
    stack: ["SCADA", "Historian", "DNP3", "Modbus"],
  },
  {
    slug: "station-electrification",
    title: "Railway Station Electrification",
    category: "Railway",
    discipline: "Railway Electrical",
    scope: "EPC · Commissioning",
    detail:
      "Complete station electrical infrastructure — LT distribution, platform and concourse lighting, signalling power supply and standby systems, executed to Indian Railways specification.",
    outcomes: [
      "LT distribution and panel installation",
      "Platform, concourse and yard lighting",
      "Signalling power supply with UPS backup",
      "Execution under live-station safety protocol",
    ],
    stack: ["LT Distribution", "UPS", "Signalling Power", "Lighting"],
  },
  {
    slug: "industrial-electrical",
    title: "Industrial & Commercial Electrical Works",
    category: "Corporate",
    discipline: "Electrical EPC",
    scope: "Design · Build · Handover",
    detail:
      "HT and LT electrical infrastructure for commercial and industrial facilities — incoming substation, distribution, standby generation and building management integration.",
    outcomes: [
      "HT receiving substation and metering",
      "LT distribution and panel schedules",
      "Standby generation with auto-transfer",
      "BMS integration and as-built documentation",
    ],
    stack: ["HT / LT", "DG Sets", "BMS", "Metering"],
  },
  {
    slug: "water-treatment-electrical",
    title: "Water Treatment Plant Electrical Systems",
    category: "Government",
    discipline: "Electrical EPC",
    scope: "Design · Supply · Integration",
    detail:
      "Electrical and control systems for water treatment and pumping infrastructure — MCC panels, variable frequency drives, instrumentation interface and SCADA integration.",
    outcomes: [
      "MCC and VFD panel design and supply",
      "Pump control logic and interlocks",
      "Instrumentation interface and telemetry",
      "SCADA integration for plant supervision",
    ],
    stack: ["MCC", "VFD", "PLC", "SCADA"],
  },
  {
    slug: "solar-balance-of-plant",
    title: "Solar Electrical Balance of Plant",
    category: "Government",
    discipline: "Electrical EPC",
    scope: "Engineering · Execution",
    detail:
      "Electrical balance-of-plant scope for solar generation — inverter integration, HT panels, evacuation infrastructure and plant SCADA interface up to the point of interconnection.",
    outcomes: [
      "Inverter and combiner integration",
      "HT panel and evacuation infrastructure",
      "Plant SCADA and generation metering",
      "Grid interconnection compliance",
    ],
    stack: ["Solar BoP", "HT Panels", "Evacuation", "SCADA"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
