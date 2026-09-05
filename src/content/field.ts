/**
 * The site photography library.
 *
 * Every frame is a real Morlatis job, supplied by the client. Each carries the
 * caption it is captioned with wherever it appears, so the same photograph
 * cannot end up described two different ways on two different pages — and so a
 * page can ask for photographs by name without also having to write about them.
 *
 * `alt` describes the photograph for a reader who cannot see it. `chip` and
 * `title` are the text set *on* the image.
 */

export type FieldPhoto = {
  slug: string;
  src: string;
  alt: string;
  chip: string;
  title: string;
  note: string;
  /**
   * Licensed stock, not a Morlatis job.
   *
   * A handful of the client-supplied frames were unusable at any crop — a
   * gravel patch under a burnt-in GPS watermark carrying a full street address,
   * an office corridor, a pit dug beside a pile of litter with children stood
   * in shot. Those slots are filled from Unsplash (free licence, commercial use
   * permitted) until real replacements are shot.
   *
   * The rule for these: the caption describes what is in the frame and the work
   * it depicts, and never says or implies the Group did this particular job.
   * Anything that reads "we delivered this" belongs on a photograph we own.
   */
  stock?: true;
};

export const fieldPhotos: FieldPhoto[] = [
  {
    slug: "substation-crew",
    src: "/img/field/substation-crew.jpg",
    alt: "Three linemen working at the top of an 11 kV distribution structure",
    chip: "Live network · 11 kV",
    title: "Working the structure",
    note: "Distribution line works executed on a live utility feeder.",
  },
  {
    slug: "transformer-hoist",
    src: "/img/field/transformer-hoist.jpg",
    alt: "Two linemen guiding a distribution transformer onto its pole platform",
    chip: "Transformer SITC",
    title: "Setting the transformer",
    note: "Supply, installation, testing and commissioning to 33 kV class.",
  },
  {
    slug: "crane-pole",
    src: "/img/field/crane-pole.jpg",
    alt: "A hydraulic crane lifting a PCC pole upright at the roadside",
    chip: "Pole erection",
    title: "Standing the line",
    note: "PCC poles set, plumbed and grouted along the route.",
  },
  {
    slug: "cable-pull",
    src: "/img/field/cable-pull.jpg",
    alt: "Four workers in high-visibility vests hauling an LT cable by hand",
    chip: "LT distribution",
    title: "Pulling the cable",
    note: "Aerial bunched and underground LT runs pulled to consumer points.",
  },
  {
    slug: "pole-erection",
    src: "/img/field/pole-erection.jpg",
    alt: "A tractor-mounted auger positioning a pole beside a village pond",
    chip: "Route works",
    title: "Setting out the route",
    note: "Alignment, pit boring and erection across difficult ground.",
  },
  {
    slug: "line-crew",
    src: "/img/field/line-crew.jpg",
    alt: "A line crew on a pole-mounted transformer structure against the sky",
    chip: "Protection",
    title: "Terminating the structure",
    note: "HT terminations, DO fuse sets and earthing to specification.",
  },
  {
    slug: "service-connection",
    src: "/img/field/service-connection.jpg",
    alt: "A lineman working at the top of a street pole from a bamboo ladder",
    chip: "Service connections",
    title: "Down to the meter",
    note: "Service lines, meter boards and consumer connections.",
  },
  {
    slug: "road-concreting",
    src: "/img/field/road-concreting.jpg",
    alt: "A crew placing and levelling a concrete road slab in a Patna colony",
    chip: "Civil works",
    title: "Concreting the approach",
    note: "PCC roads and associated civil work delivered alongside the electricals.",
  },
  {
    slug: "building-wiring",
    src: "/img/field/building-wiring.jpg",
    alt: "Electricians running conduit and cable at high level inside an office hall",
    chip: "Internal electrification",
    title: "First fix at high level",
    note: "Conduit, trunking and cable routed through occupied buildings.",
  },
  {
    slug: "office-fitout",
    src: "/img/field/office-fitout.jpg",
    alt: "Electricians on ladders installing conduit along an office corridor",
    chip: "Fit-out",
    title: "Second fix",
    note: "Points, fittings and final connections through the fit-out.",
  },
  {
    slug: "internal-riser",
    src: "/img/field/internal-riser.jpg",
    alt: "An electrician running riser cable at ceiling level inside a building",
    chip: "Risers",
    title: "Riser and distribution",
    note: "Vertical distribution, boards and sub-mains through the structure.",
  },
  {
    slug: "cable-dressing",
    src: "/img/field/cable-dressing.jpg",
    alt: "Two electricians measuring and coiling colour-coded wiring",
    chip: "Workmanship",
    title: "Measured, cut, dressed",
    note: "Cable dressed and labelled so the next person can read the install.",
  },
  {
    slug: "distribution-dusk",
    src: "/img/stock/pole-silhouette.jpg",
    alt: "A lineman working at the top of a distribution pole at dusk, silhouetted against the sky",
    chip: "Distribution network",
    title: "Last light on the feeder",
    note: "A pole-mounted transformer and its LT run — the asset class the Group builds and maintains.",
    stock: true,
  },
  {
    slug: "overhead-network",
    src: "/img/stock/overhead-wires.jpg",
    alt: "An overhead distribution pole carrying insulators, jumpers and service cables against a blue sky",
    chip: "Overhead network",
    title: "Insulators, jumpers, terminations",
    note: "The hardware an urban feeder is assembled from, and everything that has to be right on it.",
    stock: true,
  },
  {
    slug: "slab-crew",
    src: "/img/stock/rooftop-crew.jpg",
    alt: "A construction crew working on a reinforced slab at sunset, seen in silhouette",
    chip: "Civil works",
    title: "Steel fixed before the pour",
    note: "Reinforcement and formwork — the civil scope that runs alongside an electrical package.",
    stock: true,
  },
  {
    slug: "training-floor",
    src: "/img/stock/training-workshop.jpg",
    alt: "Workers in hard hats and coveralls watching a cutting demonstration in a workshop",
    chip: "Training",
    title: "Learned on the tools",
    note: "Supervised practical training — how a crew is brought to standard before it reaches site.",
    stock: true,
  },
  {
    slug: "girder-lift",
    src: "/img/field/girder-lift.jpg",
    alt: "A hydraulic truck crane holding a long steel girder above a street at dusk, with a crew watching from below",
    chip: "Heavy lift",
    title: "Steel over a live street",
    note: "A hydraulic truck crane carrying structural steel into position with the road still open beneath it.",
  },
  {
    slug: "girder-set",
    src: "/img/field/girder-set.jpg",
    alt: "Crew in hard hats guiding a steel section down from a crane hook at first light",
    chip: "Heavy lift",
    title: "Landing the section",
    note: "Tag line in hand, the crew walks a steel section down onto its bearing.",
  },
  {
    slug: "office-reception",
    src: "/img/field/office-reception.jpg",
    alt: "The Morlatis head office reception, with the illuminated company sign behind the desk",
    chip: "Head office",
    title: "Front of house, Patna",
    note: "Where clients, tender teams and vendors arrive.",
  },
  {
    slug: "office-meeting",
    src: "/img/field/office-meeting.jpg",
    alt: "An engineer working at a laptop in the head office meeting room, beside a projection screen",
    chip: "Head office",
    title: "Where the job is planned",
    note: "Project review, estimation and tender planning, before any of it reaches site.",
  },
];

const bySlug = new Map(fieldPhotos.map((p) => [p.slug, p]));

/** Pick photographs by name, in the order asked for. Unknown names are
    dropped rather than thrown, so a typo costs a tile and not the page. */
export const pickPhotos = (...slugs: string[]): FieldPhoto[] =>
  slugs.map((s) => bySlug.get(s)).filter((p): p is FieldPhoto => Boolean(p));
