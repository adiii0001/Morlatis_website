import type { MetadataRoute } from "next";
import { verticals } from "@/content/verticals";
import { projects } from "@/content/projects";

const SITE = "https://www.morlatis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/about/who-we-are", priority: 0.7 },
    { path: "/about/our-story", priority: 0.6 },
    { path: "/about/vision-mission", priority: 0.6 },
    { path: "/about/morlatis-industries", priority: 0.6 },
    { path: "/about/vasudhaara-foundation", priority: 0.6 },
    { path: "/business-verticals", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/clients", priority: 0.7 },
    { path: "/team", priority: 0.6 },
    { path: "/awards", priority: 0.5 },
    { path: "/careers", priority: 0.6 },
    { path: "/media", priority: 0.5 },
    { path: "/contact", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...verticals.map((v) => ({
      url: `${SITE}/business-verticals/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${SITE}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
