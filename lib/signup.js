export async function signup({ name, username, password }) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, username, password }),
      });
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Something went wrong" };
    }
  }
  