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
        if (data.success) setProducts(data.products)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (products.length === 0) return;
  
    async function addBase64ToProducts() {
      try {
        const updated = await Promise.all(
          products.map(async (product) => {
            const res = await fetch(`/api/base64?url=${encodeURIComponent(product.image)}`);
            const data = await res.json();
            return data.success 
              ? { ...product, baseUrl: data.base64 }
              : product;
          })
        );
  
        setProducts(updated);
      } catch (err) {
        console.error("Error while adding base64:", err);
      }
    }
  
    addBase64ToProducts();
  }, [products.length]); // <- dependency: sirf length change hone pe run hoga
  

  if (loading) {
    return ( <ProductSkeleton/>)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded-xl p-4 shadow-md">
          <div className="relative w-full h-40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              placeholder="blur"
              blurDataURL={product?.baseUrl || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAI0lEQVR4nGN48v//ms271Y1MGLi4GQ4+eFnbNSG+oLhp/iIArlYMxSGc5ukAAAAASUVORK5CYII="}
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
