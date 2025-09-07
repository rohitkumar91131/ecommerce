"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("cartItems") || "[]")
  : [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.find((item) => item._id === action.product._id);
      if (exists) {
        return state.map((item) =>
          item._id === action.product._id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }
      return [...state, { ...action.product, count: 1 }];
    }

    case "UPDATE_COUNT":
      return state
        .map((item) =>
          item._id === action.id
            ? { ...item, count: item.count + action.delta }
            : item
        )
        .filter((item) => item.count > 0);

    case "REMOVE":
      return state.filter((item) => item._id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
