import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://konstrukcia-ge.vercel.app"

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/calculator"],
        disallow: ["/admin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
