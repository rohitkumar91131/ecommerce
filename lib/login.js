export const loginUser = async ({ username, password }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
  
      if (!res.ok) {
        return { success: false, message: "Network response was not ok" };
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  };
  