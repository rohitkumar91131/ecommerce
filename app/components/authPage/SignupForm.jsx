"use client"
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/signup"


export default function SignupForm() {
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    username: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const { setLoginPageInTheWondow, setIsLoggedIn } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, username, password } = signupFormData

    if (!name || !username || !password) {
      toast.error("All fields are required")
      return
    }

    const data = await signup({ name, username, password })

    if (!data.success) {
      toast.error(data.message || "Signup failed")
      return
    }

    setIsLoggedIn(true)
    toast.success("Signup successful")
    router.push("/")
  }

  return (
    <div className="flex justify-center items-center h-[85dvh] bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h1 className="text-4xl font-extrabold text-green-600 text-center">
          Astrape.AI
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Create your account and start shopping smarter
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={signupFormData.name}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupFormData.username}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={signupFormData.password}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
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
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => setLoginPageInTheWondow(true)}
            className="text-green-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}
