"use client";
import React, { useEffect, useRef } from "react";
import ProductsPage from "./components/Homepage/Products";
import toast from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import { verifyAuth } from "@/lib/checkAuth";

function HomePage() {
  const { setIsLoggedIn, isLoggedIn ,greetedRef} = useAuth();


  useEffect(() => {
    const checkAuth = async () => {
      const data = await verifyAuth();

      if (data.success) {
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        if (!greetedRef.current) {
          toast.success(`Welcome back ${data.user.name}`);
          greetedRef.current = true;
        }
      } else {
        if (!greetedRef.current) {
          toast.error("Unauthenticated");
          greetedRef.current = true;
        }
      }
    };

    checkAuth();
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <div>
      <ProductsPage />
    </div>
  );
}

export default HomePage;
