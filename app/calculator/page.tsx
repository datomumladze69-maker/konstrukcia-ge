import { getProducts } from "@/lib/getProducts"
import CalculatorClient from "./CalculatorClient"

export const dynamic = "force-dynamic"

export default async function CalculatorPage() {
  const products = await getProducts()

  return <CalculatorClient products={products} />
}
