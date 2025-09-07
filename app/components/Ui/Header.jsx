"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Home, Menu, X, LogOut, UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useProduct } from "@/app/context/FilterResultContext";

export default function Header() {
  const defaultFormData = {
    category: "All Categories",
    query: "",
    minPrice: 0,
    maxPrice: 10000000,
  };

  const [searchFormData, setSearchFormData] = useState(defaultFormData);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { filteredProducts, setFilteredProducts, setAllProducts, allProducts } = useProduct();

  const categoryRef = useRef(null);
  const inputRef = useRef(null);
  const priceRef = useRef(null);

  const fetchFiltered = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/filter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch filtered products");
    }
  };

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
      fetchFiltered(searchFormData);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFormData]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Logout failed");
        return;
      }
      setIsLoggedIn(false);
      toast.success("Logged out");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        priceRef.current &&
        !priceRef.current.contains(event.target)
      ) {
        setShowCategory(false);
        setShowPrice(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetSearch = () => {
    setSearchFormData(defaultFormData);
    setShowCategory(false);
    setShowPrice(false);
    inputRef.current?.blur();
  };

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_2fr_1fr] gap-2 relative items-center">
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="Astrape Logo" width={40} height={40} />
        <h1 className="hidden md:block text-2xl font-bold text-indigo-600">
          Astrape.AI
        </h1>
      </div>

      <form className="flex flex-col gap-2 w-full min-w-0">
        <div className="flex items-center gap-2 w-full relative">
          <input
            ref={inputRef}
            type="text"
            value={searchFormData.query}
            onFocus={() => {
              setShowCategory(true);
              setShowPrice(true);
            }}
            onChange={(e) =>
              setSearchFormData((prev) => ({ ...prev, query: e.target.value }))
            }
            placeholder="Search for products..."
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base md:text-lg"
          />

          {/* Cross button inside input:
              Shows when there's a query OR category/price panels are open.
              Click resets form to default and hides panels.
          */}
          {(searchFormData.query || showCategory || showPrice) && (
            <button
              type="button"
              onClick={handleResetSearch}
              aria-label="Reset search"
              title="Reset search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 p-1 rounded"
            >
              <X size={18} />
            </button>
          )}

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-center gap-2 mt-2 transition-all duration-300 ${
            showCategory ? "max-h-40" : "max-h-0 overflow-hidden"
          }`}
        >
          <select
            ref={categoryRef}
            value={searchFormData.category}
            onChange={(e) =>
              setSearchFormData((prev) => ({ ...prev, category: e.target.value }))
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
              <label className="text-gray-700 text-sm hidden sm:block">Price range</label>
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
                  className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-full sm:w-auto"
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
                  className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-full sm:w-auto"
                  placeholder="Max"
                />
              </div>
            </div>
          )}
        </div>
      </form>

      <nav className="hidden md:flex items-center gap-5 text-gray-600 justify-end">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={24} /> <span>Home</span>
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-indigo-600">
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
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <LogOut size={24} /> <span>Logout</span>
          </button>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden z-50">
          <Link
            href="/"
            className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={24} /> Home
          </Link>
          <Link
            href="/cart"
            className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ShoppingCart size={24} /> Cart
          </Link>

          {!isLoggedIn ? (
            <Link
              href="/auth"
              className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus size={24} /> Signup/login
            </Link>
          ) : (
            <button
              onClick={async () => {
                await handleLogout();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2 text-red-600 text-left"
            >
              <LogOut size={24} /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
