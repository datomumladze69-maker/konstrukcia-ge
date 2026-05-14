import { getProducts } from "@/lib/getProducts"
import ProductsSearchClient from "./ProductsSearchClient"

export const dynamic = "force-dynamic"

const siteUrl = "https://konstrukcia-ge.vercel.app"

export default async function Page() {
  const products = await getProducts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "KONSTRUKCIA.GE",
    url: siteUrl,
    image: `${siteUrl}/cover.jpg`,
    description:
      "სამშენებლო ტექნიკის, ხარაჩოს, დოკის, ლამინატის, მეშალკის და სამშენებლო ინვენტარის გაქირავება საქართველოში.",
    telephone: "+995596614614",
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "სამშენებლო პროდუქცია",
      itemListElement: products.map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: product.name,
          description:
            product.description ||
            "სამშენებლო პროდუქტი KONSTRUKCIA.GE-ზე",
          image: product.image.startsWith("http")
            ? product.image
            : `${siteUrl}${product.image}`,
          category: product.category,
        },
        price: product.price,
        priceCurrency: "GEL",
        availability: "https://schema.org/InStock",
      })),
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ProductsSearchClient products={products} />
    </main>
  )
}