import { collection, getDocs } from "firebase/firestore/lite"
import { db } from "./firebase"

export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export async function getProducts(): Promise<Product[]> {
  const productsSnapshot = await getDocs(
    collection(db, "products")
  )

  const products: Product[] = productsSnapshot.docs.map((doc) => {
    const data = doc.data()

    return {
      id: doc.id,
      name: String(data.name || "").trim(),
      price: Number(data.price) || 0,
      image: String(data.image || "").trim(),
      description: String(data.description || "").trim(),
      category: String(data.category || "").trim(),
    }
  })

  return products
}
