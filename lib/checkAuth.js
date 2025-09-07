export async function verifyAuth() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
        method: "GET",
        credentials: "include",
      });
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message || "Something went wrong" };
    }
  }
  