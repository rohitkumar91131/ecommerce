"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cartItems, dispatch } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const handleProceedPayment = () => {
    toast.error("🚧 Feature in development!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 grid-rows-[1fr_0.5fr] sm:grid-rows-1 sm:grid-cols-[6fr_4fr] bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                  <Image
                    fill
                    src={item.imageUrl}
                    alt={item.name}
                    placeholder="blur"
                    blurDataURL={item.base64Url}
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm text-gray-700">₹{item.price}</p>
                </div>
              </div>
              <div className="w-full flex items-center justify-around">
              <div className="w-full flex  items-center space-x-2">
                <button
                  className="p-2 bg-gray-200 rounded"
                  onClick={() =>
                    dispatch({ type: "DECREMENT", id: item._id })
                  }
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium">{item.count}</span>
                <button
                  className="p-2 bg-gray-200 rounded"
                  onClick={() =>
                    dispatch({ type: "INCREMENT", id: item._id })
                  }
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex w-full">
                <p className="font-semibold text-lg text-gray-800">
                  ₹{item.price * item.count}
                </p>
              </div>
            </div>
            </div>
          ))}

          <div className="bg-gray-50 shadow-inner rounded-xl p-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold text-green-600">₹{totalPrice}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleProceedPayment}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
