"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Home, Menu, X, LogOut, UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useProduct } from "@/app/context/FilterResultContext";
import {
  defaultFormData,
  fetchFiltered,
  handleLogout,
  handleResetSearch,
} from "@/lib/headerFunctions";

export default function Header() {
  const [searchFormData, setSearchFormData] = useState(defaultFormData);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { filteredProducts, setFilteredProducts, setAllProducts, allProducts } =
    useProduct();

  const categoryRef = useRef(null);
  const inputRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    if (
      searchFormData.category === "All Categories" &&
      searchFormData.query.trim() === "" &&
      searchFormData.minPrice === 0 &&
      searchFormData.maxPrice === 10000000
    ) {
      setFilteredProducts(allProducts);
      return;
    }

    const handler = setTimeout(() => {
      fetchFiltered(searchFormData, setFilteredProducts);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFormData]);

  return (
    <header className="relative w-full bg-white shadow-md px-4 py-3 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_2fr_1fr] gap-2 items-center">
      <div className="flex gap-2 items-center justify-start">
        <Image
          src="/logo.svg"
          alt="Astrape Logo"
          width={40}
          height={40}
          className="block"
        />
        <h1 className="hidden md:block text-2xl font-bold text-indigo-600">
          Astrape.AI
        </h1>
      </div>

      <div className="w-full min-w-0">
        <form className="w-full">
          <div className="flex items-center gap-2 w-full">
            <input
              ref={inputRef}
              type="text"
              value={searchFormData.query}
              onFocus={() => {
                setShowCategory(true);
                setShowPrice(true);
              }}
              onChange={(e) =>
                setSearchFormData((prev) => ({
                  ...prev,
                  query: e.target.value,
                }))
              }
              placeholder="Search for products..."
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base md:text-lg"
            />

            {(searchFormData.query || showCategory || showPrice) && (
              <button
                type="button"
                onClick={() =>
                  handleResetSearch(
                    setSearchFormData,
                    defaultFormData,
                    setShowCategory,
                    setShowPrice,
                    inputRef
                  )
                }
                aria-label="Reset search"
                title="Reset search"
                className="ml-[-48px] p-1 rounded text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
            )}

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="p-2 rounded-md text-gray-600 hover:text-indigo-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div className="h-0 overflow-visible">
            <div
              ref={categoryRef}
              className={`relative z-30 transform transition-all duration-200 origin-top ${
                showCategory
                  ? "translate-y-0 opacity-100 pointer-events-auto"
                  : "-translate-y-4 opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-lg shadow-md p-2 flex flex-col md:flex-row md:items-center gap-2 min-w-0">
                <select
                  value={searchFormData.category}
                  onChange={(e) =>
                    setSearchFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full md:w-auto border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                >
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Books</option>
                </select>

                {showPrice && (
                  <div
                    ref={priceRef}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-auto"
                  >
                    <label className="text-gray-700 text-sm hidden sm:block">
                      Price range
                    </label>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <input
                        type="number"
                        min={0}
                        value={searchFormData.minPrice}
                        onChange={(e) =>
                          setSearchFormData((prev) => ({
                            ...prev,
                            minPrice: Number(e.target.value),
                          }))
                        }
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-full sm:min-w-[100px]"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        min={0}
                        value={searchFormData.maxPrice}
                        onChange={(e) =>
                          setSearchFormData((prev) => ({
                            ...prev,
                            maxPrice: Number(e.target.value),
                          }))
                        }
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-full sm:min-w-[100px]"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <nav className="hidden md:flex items-center gap-5 text-gray-600 justify-end">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={24} /> <span>Home</span>
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-1 hover:text-indigo-600"
        >
          <ShoppingCart size={24} /> <span>Cart</span>
        </Link>

        {!isLoggedIn ? (
          <Link
            href="/auth"
            className="flex items-center gap-1 hover:text-indigo-600"
          >
            <UserPlus size={24} /> <span>Signup/login</span>
          </Link>
        ) : (
          <button
            onClick={() => handleLogout(setIsLoggedIn, router, toast)}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <LogOut size={24} /> <span>Logout</span>
          </button>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col sm:hidden z-50">
          <Link
            href="/"
            className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={20} /> Home
          </Link>
          <Link
            href="/cart"
            className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ShoppingCart size={20} /> Cart
          </Link>
          {!isLoggedIn ? (
            <Link
              href="/auth"
              className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus size={20} /> Signup/login
            </Link>
          ) : (
            <button
              onClick={async () => {
                await handleLogout(setIsLoggedIn, router, toast);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-2 text-red-600"
            >
              <LogOut size={20} /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
