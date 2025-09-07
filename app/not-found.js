"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (seconds === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col justify-center items-center bg-gray-50 text-center">
      <div className="flex items-center gap-3 mb-8">
        <Image src="/logo.svg" alt="Astrape Logo" width={60} height={60} />
        <h1 className="text-3xl font-bold text-indigo-600">Astrape.AI</h1>
      </div>

      <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-600">
        Redirecting you to the homepage in{" "}
        <span className="font-bold text-indigo-600">{seconds}</span> seconds...
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition duration-300"
      >
        Go Home Now
      </button>
    </div>
  );
}
