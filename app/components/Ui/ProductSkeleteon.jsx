"use client"
import React from "react"

export default function ProductSkeleton() {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="border rounded-lg shadow-sm p-4 flex flex-col items-center animate-pulse"
        >
          <div className="w-full h-40 bg-gray-300 rounded-md mb-2"></div>
          <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 w-1/2 rounded mb-1"></div>
          <div className="h-3 bg-gray-200 w-1/3 rounded mb-2"></div>
          <div className="h-5 bg-gray-300 w-1/4 rounded mb-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
