'use client'
import React, { useEffect } from 'react'
import ProductsPage from './components/Homepage/Products'
import toast from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import { verifyAuth } from '@/lib/checkAuth';


function HomePage() {
  const { setIsLoggedIn, isLoggedIn } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const data = await verifyAuth();

      if (data.success) {
        setIsLoggedIn(true);
        toast.success(`Welcome back ${data.user.name}`);
      } else {
        toast.error("Unauthenticated");
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  return (
    <div>
      <ProductsPage />
    </div>
  )
}

export default HomePage;
