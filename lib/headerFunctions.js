export const defaultFormData = {
    category: "All Categories",
    query: "",
    minPrice: 0,
    maxPrice: 10000000,
  };
  
  export const fetchFiltered = async (formData, setFilteredProducts) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/filter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  export const handleLogout = async (setIsLoggedIn, router, toast) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
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
  
  export const handleResetSearch = (setSearchFormData, defaultFormData, setShowCategory, setShowPrice, inputRef) => {
    setSearchFormData(defaultFormData);
    setShowCategory(false);
    setShowPrice(false);
    inputRef.current?.blur();
  };
  