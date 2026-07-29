import type { IconName } from "@/components/ui/icon";

export type Vertical = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  lede: string;
  capabilities: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  /**
   * "forming" marks a vertical that has been announced but whose scope is not
   * yet defined. Its page renders an honest holding state rather than inventing
   * capabilities — see the [slug] route.
   */
  status?: "active" | "forming";
  /** Optional hero photograph, served from /public/img. */
  image?: string;
};

export const verticals: Vertical[] = [
  {
    slug: "electrical-epc",
    index: "01",
    title: "Electrical EPC",
    shortTitle: "Electrical EPC",
    icon: "bolt",
    summary: "11 / 33 kV line works, transformer SITC and long-term maintenance.",
    lede: "End-to-end engineering, procurement and construction for power distribution and transmission infrastructure across Eastern India.",
    capabilities: [
      {
        title: "11 / 33 kV Line Works",
        body: "Design, supply, installation, testing and commissioning of overhead and underground distribution lines for state utilities and private developers.",
      },
      {
        title: "Transformer SITC",
        body: "Supply, installation, testing and commissioning of distribution and power transformers up to 33 kV class, including associated switchgear and protection.",
      },
      {
        title: "Annual Maintenance",
        body: "Preventive maintenance, breakdown response and condition monitoring across substation assets under multi-year AMC.",
      },
      {
        title: "Substation Automation",
        body: "Retrofitting SCADA and RTU systems into existing substations for remote supervision and control.",
      },
    ],
    specs: [
      { label: "Voltage class", value: "Up to 33 kV" },
      { label: "Delivery model", value: "Turnkey EPC · SITC · AMC" },
      { label: "Sectors", value: "Utility · Industrial · Institutional" },
    ],
    image: "/img/epc-substation.jpg",
  },
  {
    slug: "rtu-scada",
    index: "02",
    title: "RTU · FRTU · SCADA Engineering",
    shortTitle: "RTU · SCADA",
    icon: "signal",
    summary: "Telemetry, supervisory control and grid visibility systems.",
    lede: "Remote terminal units, feeder automation and supervisory control platforms that turn a passive distribution network into an observable, controllable one.",
    capabilities: [
      {
        title: "RTU / FRTU Deployment",
        body: "Supply, configuration, installation and commissioning of remote and feeder terminal units for distribution automation.",
      },
      {
        title: "SCADA Integration",
        body: "Centralised supervisory platforms aggregating substation and feeder telemetry into a single operational picture.",
      },
      {
        title: "Protocol Engineering",
        body: "Interoperability across IEC 61850, IEC 60870-5-101/104, DNP3 and Modbus for mixed-vendor estates.",
      },
      {
        title: "Automation AMC",
        body: "Health monitoring, firmware management, fault diagnosis and support for deployed automation assets.",
      },
    ],
    specs: [
      { label: "Protocols", value: "IEC 61850 · 60870-5-101/104 · DNP3 · Modbus" },
      { label: "Scope", value: "Engineering · Supply · Commissioning · AMC" },
      { label: "Applications", value: "Feeder automation · Substation SCADA" },
    ],
    image: "/img/epc-engineers.jpg",
  },
  {
    slug: "relay-retrofitting",
    index: "03",
    title: "Relay Retrofitting",
    shortTitle: "Relay Retrofitting",
    icon: "relay",
    summary: "CRP panel revamp and IEC 61850 compliant protection systems.",
    lede: "Replacing electromechanical protection with numerical relays — recovering decades of asset life and unlocking digital protection coordination.",
    capabilities: [
      {
        title: "CRP Panel Revamp",
        body: "Full control and relay panel replacement with numerical protection, rewiring and re-termination under planned outage windows.",
      },
      {
        title: "Protection Studies",
        body: "Coordination studies, fault level analysis and relay setting calculations validated against network conditions.",
      },
      {
        title: "IEC 61850 Migration",
        body: "Station bus architecture, GOOSE messaging and IED integration for substations moving to digital protection.",
      },
      {
        title: "Testing & Commissioning",
        body: "Primary and secondary injection testing, scheme verification and documented handover.",
      },
    ],
    specs: [
      { label: "Standard", value: "IEC 61850 compliant" },
      { label: "Scope", value: "Design · Supply · Retrofit · Testing" },
      { label: "Asset type", value: "CRP panels · Numerical IEDs" },
    ],
  },
  {
    slug: "railway-electrical",
    index: "04",
    title: "Railway Electrical Works",
    shortTitle: "Railway Electrical",
    icon: "rail",
    summary: "Station electrification, signalling power and IR-approved supply.",
    lede: "Approved Indian Railways vendor delivering electrical infrastructure and material across zonal networks.",
    capabilities: [
      {
        title: "Station Electrification",
        body: "Power distribution, platform and concourse lighting, and auxiliary electrical systems for station infrastructure.",
      },
      {
        title: "Signalling Power Supply",
        body: "Integrated power supply systems, UPS and battery backup serving signalling and telecommunication loads.",
      },
      {
        title: "Approved Material Supply",
        body: "Supply of electrical material against Indian Railways specifications and approved vendor listings.",
      },
      {
        title: "Relay Room Works",
        body: "Relay room electrical fit-out, earthing systems and cabling executed under railway safety protocols.",
      },
    ],
    specs: [
      { label: "Status", value: "Approved IR vendor" },
      { label: "Scope", value: "EPC · Material supply" },
      { label: "Environment", value: "Live-network, protocol-governed" },
    ],
  },
  {
    slug: "strategic-sourcing",
    index: "05",
    title: "Strategic Sourcing",
    shortTitle: "Strategic Sourcing",
    icon: "crate",
    summary: "Vendor qualification, procurement and logistics for electrical material.",
    lede: "A procurement practice that treats sourcing as engineering: qualified vendors, specification-matched material and delivery scheduled against the project programme.",
    capabilities: [
      {
        title: "Transformers & Switchgear",
        body: "Distribution transformers, HT and LT switchgear, and protection equipment from qualified manufacturers.",
      },
      {
        title: "Cables & Conductors",
        body: "HT and LT power cables, control cables, and overhead conductors to IS and IEC specification.",
      },
      {
        title: "Panels & Enclosures",
        body: "PCC, MCC, APFC, VFD and custom control panels manufactured and tested before dispatch.",
      },
      {
        title: "Automation Hardware",
        body: "RTU, FRTU, numerical relays, meters and communication equipment for automation projects.",
      },
      {
        title: "Vendor Qualification",
        body: "Assessment, empanelment and periodic audit of manufacturers against specification, test capability and delivery record.",
      },
    ],
    specs: [
      { label: "Standards", value: "IS · IEC conformance" },
      { label: "Buyers", value: "Utilities · EPC · Industrial" },
      { label: "Scope", value: "Sourcing · QA · Logistics" },
    ],
    image: "/img/industries-logistics.jpg",
  },
  {
    slug: "commodity-trading",
    index: "06",
    title: "Commodity Trading",
    shortTitle: "Commodity Trading",
    icon: "trend",
    summary: "MSTC-authorised metal scrap, TMT, paint and commodity markets.",
    lede: "A trading desk operating in industrial commodity markets under MSTC vendor authorisation.",
    capabilities: [
      {
        title: "Metal Scrap",
        body: "Participation in MSTC e-auctions for ferrous and non-ferrous scrap, with lifting and logistics handled in-house.",
      },
      {
        title: "TMT & Structural Steel",
        body: "Sourcing and supply of TMT bars and structural steel for infrastructure and construction buyers.",
      },
      {
        title: "Industrial Paint",
        body: "Bulk supply of protective and industrial coatings for infrastructure and asset maintenance programmes.",
      },
      {
        title: "Market Operations",
        body: "Contract structuring, price risk management and delivery coordination across commodity positions.",
      },
    ],
    specs: [
      { label: "Authorisation", value: "MSTC registered vendor" },
      { label: "Segments", value: "Metal scrap · TMT · Paint" },
      { label: "Model", value: "Auction · Contract supply" },
    ],
    image: "/img/industries-market.jpg",
  },
  {
    slug: "vasudhaara-foundation",
    index: "07",
    title: "Morlatis Vasudhaara Foundation",
    shortTitle: "Vasudhaara Foundation",
    icon: "leaf",
    summary: "The Group's CSR arm — education, healthcare, agriculture, community.",
    lede: "Vasudhaara — a flow of wealth back into the communities the Group operates in. Established 2025 as the Group's corporate social responsibility vehicle.",
    capabilities: [
      {
        title: "Education",
        body: "School infrastructure support, scholarships and digital literacy programmes in rural Bihar and Jharkhand.",
      },
      {
        title: "Healthcare",
        body: "Health check-up camps, eye care drives and equipment support for primary healthcare centres.",
      },
      {
        title: "Agriculture",
        body: "Farmer training, input support and water conservation initiatives for smallholder cultivators.",
      },
      {
        title: "Community",
        body: "Drinking water access, sanitation drives, plantation campaigns and disaster relief support.",
      },
    ],
    specs: [
      { label: "Established", value: "2025" },
      { label: "Focus regions", value: "Bihar · Jharkhand · Eastern UP" },
      { label: "Funding", value: "Fixed share of Group profit" },
    ],
  },
  {
    slug: "real-estate",
    index: "08",
    title: "Real Estate",
    shortTitle: "Real Estate",
    icon: "building",
    summary: "The Group's newest vertical — scope and workflow being defined.",
    lede: "The Group's newest vertical. Scope, service lines and delivery workflow are being finalised and will be published here.",
    /* Deliberately empty. Nothing about this vertical is settled yet, and the
       page renders a holding state rather than inventing a service list. */
    capabilities: [],
    specs: [],
    status: "forming",
    image: "/img/realestate-site.jpg",
  },
];

export const verticalBySlug = (slug: string) => verticals.find((v) => v.slug === slug);
