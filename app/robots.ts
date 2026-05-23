import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/admin/", "/api/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || "https://memelaunch-os-private-beta.vercel.app"}/sitemap.xml`,
  };
}
