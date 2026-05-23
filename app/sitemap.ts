import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://memelaunch-os-private-beta.vercel.app";

const ROUTES = ["/", "/features", "/pricing", "/about", "/contact", "/terms", "/privacy", "/refund-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : route === "/pricing" ? 0.9 : 0.7,
  }));
}
