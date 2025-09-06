"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Home, Menu, X, LogOut, UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const [category, setCategory] = useState("All Categories");
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const {isLoggedIn ,setIsLoggedIn} = useAuth();

  const categoryRef = useRef(null);
  const inputRef = useRef(null);
  const priceRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ category, query, minPrice, maxPrice });
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Logout failed");
        return;
      }
      setIsLoggedIn(false)
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

  return (
    <header className=" bg-white shadow-md px-4 py-3 w-full flex flex-col md:flex-row items-center justify-between gap-2 relative">
      <div className="flex items-center justify-between w-full md:w-auto gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo.svg" alt="Astrape Logo" width={40} height={40} />
          <h1 className="hidden md:block text-2xl font-bold text-indigo-600">
            Astrape.AI
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center gap-2 md:gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => {
              setShowCategory(true);
              setShowPrice(true);
            }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-2 md:mt-0">
        <div
          ref={categoryRef}
          className={`overflow-hidden transition-all duration-300 ${
            showCategory ? "max-h-20" : "max-h-0"
          } md:max-h-none`}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Home & Kitchen</option>
          </select>
        </div>

        {showPrice && (
          <div
            ref={priceRef}
            className="flex items-center gap-2 border rounded-lg px-3 py-2"

          >
            <label className="text-gray-700 text-sm hidden sm:block">Price range</label>
            <label className="text-gray-700 text-sm sm:hidden">Min Price :-</label>
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <label className="text-gray-700 text-sm ml-2 sm:hidden">Max Price :-</label>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>
        )}
      </div>

      <nav className="hidden md:flex items-center gap-5 text-gray-600 flex-shrink-0">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={24} /> <span>Home</span>
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-indigo-600">
          <ShoppingCart size={24} /> <span>Cart</span>
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              href="/auth"
              className="flex items-center gap-1 hover:text-indigo-600"
            >
              <UserPlus size={24} /> <span>Signup/login</span>
            </Link>
          </>
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
            <>
              <Link
                href="/auth"
                className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus size={24} /> Signup/login
              </Link>
            </>
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
