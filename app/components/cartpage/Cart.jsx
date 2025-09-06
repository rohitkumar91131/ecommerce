"use client";

import React, { useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";

const initialCart = [
  { id: 1, name: "Product A", category: "Category 1", price: 500, count: 1 },
  { id: 2, name: "Product B", category: "Category 2", price: 300, count: 2 },
];


function cartReducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, count: item.count + 1 }
          : item
      );
    case "DECREASE":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item
      );
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export default function Cart() {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCart);


  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const handleProceedPayment = () => {
    toast.error("🛒 Feature in development!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 rounded-md"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm">Price: ₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch({ type: "DECREASE", id: item.id })}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => dispatch({ type: "INCREASE", id: item.id })}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <p>Total: ₹{item.price * item.count}</p>
              <button
                onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <p className="text-xl font-bold">Total Price: ₹{totalPrice}</p>
            <button
              onClick={handleProceedPayment}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
