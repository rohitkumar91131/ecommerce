export async function fetchProducts() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      return { success: false, products: [] };
    }
  }
  