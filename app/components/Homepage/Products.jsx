"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import ProductSkeleton from "../Ui/ProductSkeleteon"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
        const data = await res.json()
        console.log(data)
        if (data.success) setProducts(data.products)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  

  if (loading) {
    return ( <ProductSkeleton/>)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded-xl p-4 shadow-md">
          <div className="relative w-full h-40">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              placeholder="blur"
              blurDataURL={product.base64Url}
              className="object-cover rounded-md"
              loading="lazy"
            />
          </div>
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  )
}
