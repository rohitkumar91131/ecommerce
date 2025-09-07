"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/login";

export default function LoginForm() {
  const [loginFormData, setLoginFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setLoginPageInTheWondow } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginFormData;

    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }

    const data = await loginUser({ username, password });

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success("Login successful");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-[85dvh] bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h1 className="text-4xl font-extrabold text-indigo-600 text-center">
          Astrape.AI
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Please login to continue
        </p>

        <div className="flex items-start gap-2 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded mb-4">
          <AlertCircle size={20} className="mt-0.5"/>
          <p className="text-sm">
            To use our app fully, please ensure third-party cookies are enabled in your browser.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginFormData.username}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginFormData.password}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 ${
              isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <button onClick={() => setLoginPageInTheWondow(false)} className="text-indigo-600 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
