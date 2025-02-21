import React from 'react'
import { useState, createContext, useContext, ReactNode } from 'react'

interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartCountProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart Must be used within a CartProvider")
  }
  return context
}