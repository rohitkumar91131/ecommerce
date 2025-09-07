"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, ShoppingCart, UserPlus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";
import { handleLogout } from "@/lib/headerFunctions";

export default function HeaderTwo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <header className="relative h-[15dvh] z-10 w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={36} height={36} className="block" />
        <span className="font-bold text-lg md:text-2xl text-indigo-600">Astrape.AI</span>
      </div>

      <nav className="hidden sm:flex items-center gap-5 text-gray-600">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={20} /> Home
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-indigo-600">
          <ShoppingCart size={20} /> Cart
        </Link>
        {!isLoggedIn ? (
          <Link href="/auth" className="flex items-center gap-1 hover:text-indigo-600">
            <UserPlus size={20} /> Login/Signup
          </Link>
        ) : (
          <button
            onClick={() => handleLogout(setIsLoggedIn, router, toast)}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <LogOut size={20} /> Logout
          </button>
        )}
      </nav>

      <div className="sm:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-indigo-600"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col sm:hidden z-50">
          <Link href="/" className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Home size={20} /> Home
          </Link>

          <Link href="/cart" className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart size={20} /> Cart
          </Link>

          {!isLoggedIn ? (
            <Link href="/auth" className="px-4 py-3 hover:bg-gray-100 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <UserPlus size={20} /> Login/Signup
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
