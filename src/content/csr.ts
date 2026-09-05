import type { IconName } from "@/components/ui/icon";

/**
 * Morlatis Vasudhaara Foundation — the Group's CSR arm.
 *
 * Content is taken from the Foundation's own visual identity and programme
 * brief. It is deliberately NOT a business vertical: the Foundation does not
 * trade, and listing it beside the commercial arms misrepresented both.
 */

export const foundation = {
  name: "Morlatis Vasudhaara Foundation",
  shortName: "Vasudhaara Foundation",
  established: 2026,
  tagline: "Serving Humanity · Nurturing Earth",
  promise: "Where every hand extended becomes a life transformed.",
  parent: "An initiative of Morlatis Group of Companies",
  lede: "Vasudhaara — a flow of wealth back into the communities the Group works in. Established 2026 as the corporate social responsibility vehicle of the Morlatis Group, funded by a fixed share of Group profit.",
  regions: "Bihar · Jharkhand · Eastern Uttar Pradesh",
} as const;

export type Pillar = {
  title: string;
  icon: IconName;
  tagline: string;
  body: string;
  programmes: string[];
};

export const pillars: Pillar[] = [
  {
    title: "Healthcare & Care",
    icon: "shield",
    tagline: "Healthcare is a right, not a privilege.",
    body: "Bringing primary care to villages and district towns where the nearest hospital is a day's travel and a day's lost wages.",
    programmes: [
      "Free medical camps and health check-ups",
      "Medicine and treatment support for the poor",
      "Hospital and clinic support programmes",
      "Patient attendant accommodation and food",
      "Mobile medical unit services",
    ],
  },
  {
    title: "Agriculture & Farming",
    icon: "leaf",
    tagline: "Standing with the backbone of India.",
    body: "Working alongside smallholder cultivators on the two things that decide a season: what goes into the soil, and what the crop fetches at market.",
    programmes: [
      "Modern and organic farming training",
      "High-value crop cultivation guidance",
      "Agarwood and medicinal crop promotion",
      "Seeds, saplings and equipment support",
      "Market linkage and income generation",
      "Water conservation and afforestation",
    ],
  },
  {
    title: "Education & Skill",
    icon: "book",
    tagline: "Every child deserves the light of education.",
    body: "Removing the ordinary obstacles — fees, books, a uniform, a place to study — that end a rural child's schooling long before ability does.",
    programmes: [
      "Scholarships for underprivileged students",
      "Books, uniforms and stationery support",
      "Vocational and skill development training",
      "Agricultural schools and rural training",
      "Coaching centres for rural youth",
    ],
  },
  {
    title: "Food & Nutrition",
    icon: "handshake",
    tagline: "Anna hi Brahma hai — food is the greatest offering.",
    body: "Community kitchens and food relief, run continuously rather than only when a disaster makes the need visible.",
    programmes: [
      "Community kitchen and langar seva",
      "Prasadam seva at temple premises",
      "Feeding programmes for the poor and needy",
      "Food distribution at religious gatherings",
      "Emergency food relief programmes",
    ],
  },
  {
    title: "Community Welfare",
    icon: "people",
    tagline: "Nurturing the ground people stand on.",
    body: "The shared infrastructure a village needs and rarely gets funded for — water, sanitation, tree cover, and help when the river rises.",
    programmes: [
      "Drinking water access and borewell support",
      "Sanitation drives and facilities",
      "Plantation and afforestation campaigns",
      "Disaster relief and rehabilitation",
      "Rural development initiatives",
    ],
  },
];
