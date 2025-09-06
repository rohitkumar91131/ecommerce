'use client'
import React, { useEffect } from 'react'
import ProductsPage from './components/Homepage/Products'
import toast from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

function HomePage() {
  const {setIsLoggedIn} = useAuth();
  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(true)
          toast.success(`Welcome back ${data.user.name}`)
        } else {
          toast.error("Unauthenticated")
        }
      } catch (err) {
        toast.error(err.message)
      }
    };
    checkAuth();  
    
  },[])
  return (
    <div>
      <ProductsPage/>
    </div>
  )
}

export default HomePage
