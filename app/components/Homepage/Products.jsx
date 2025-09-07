"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductSkeleton from "../Ui/ProductSkeleteon";
import { useCart } from "@/app/context/CartContext";
import { useProduct } from "@/app/context/FilterResultContext";
import { ShoppingCart } from "lucide-react";
import { fetchProducts } from "@/lib/getProducts";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, dispatch } = useCart();
  const { filteredProducts, setFilteredProducts, setAllProducts } = useProduct();
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      if (data.success) {
        setProducts(data.products);
        setAllProducts(data.products);
        setFilteredProducts(data.products);
      }
      setLoading(false);
    };

    getProducts();
  }, []);

  if (loading) return <ProductSkeleton />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const inCart = cartItems.some((item) => item._id === product._id);
            return (
              <div
                key={product._id}
                className="relative border rounded-xl p-4 shadow-md"
              >
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
                <p className="text-xl font-bold mt-2">₹{product.price}</p>

                {inCart ? (
                  <button
                    disabled
                    className="!p-1 bg-green-500 text-white rounded-md absolute bottom-1 right-1"
                  >
                    Added
                  </button>
                ) : (
                  <button
                    className="!p-1 bg-blue-500 text-white rounded-md absolute bottom-1 right-1"
                    onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-12 px-6 border rounded-xl shadow-sm bg-gray-50">
            <Image
              src="/empty-box.svg"
              alt="No products"
              width={120}
              height={120}
              className="opacity-70 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Sorry! No products found
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or search to find what you’re looking
              for.
            </p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={() => router.push("/cart")}
          className="fixed bottom-4 right-4 sm:hidden w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg text-white z-50"
        >
          <ShoppingCart size={28} />
        </button>
      )}
    </>
  );
}
