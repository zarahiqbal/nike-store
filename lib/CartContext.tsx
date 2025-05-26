// // lib/CartContext.tsx
// 'use client';
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   size: string;
//   quantity: number;
//   image: string;
// };

// type CartContextType = {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (id: number, size: string) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addItem = (item: CartItem) => {
//     setItems((currItems) => {
//       // Check if item with same id and size exists, increment qty if yes
//       const idx = currItems.findIndex(
//         (i) => i.id === item.id && i.size === item.size
//       );
//       if (idx > -1) {
//         const newItems = [...currItems];
//         newItems[idx].quantity += item.quantity;
//         return newItems;
//       }
//       return [...currItems, item];
//     });
//   };

//   const removeItem = (id: number, size: string) => {
//     setItems((currItems) =>
//       currItems.filter((i) => !(i.id === id && i.size === size))
//     );
//   };

//   const clearCart = () => setItems([]);

//   return (
//     <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('useCart must be used within CartProvider');
//   return context;
// };


"use client"
import { createContext, useContext, useState, type ReactNode, useCallback, useMemo, useEffect } from "react"

export type CartItem = {
  id: number
  title: string
  price: number
  size: string
  quantity: number
  image: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number, size: string) => void
  updateQuantity: (id: number, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nike-cart")
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage whenever items change (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem("nike-cart", JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [items, isLoaded])

  const addItem = useCallback((item: CartItem) => {
    setItems((currItems) => {
      const existingIndex = currItems.findIndex((i) => i.id === item.id && i.size === item.size)

      if (existingIndex > -1) {
        const newItems = [...currItems]
        newItems[existingIndex].quantity += item.quantity
        return newItems
      }

      return [...currItems, item]
    })
  }, [])

  const removeItem = useCallback((id: number, size: string) => {
    setItems((currItems) => currItems.filter((i) => !(i.id === id && i.size === size)))
  }, [])

  const updateQuantity = useCallback(
    (id: number, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id, size)
        return
      }

      setItems((currItems) =>
        currItems.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item)),
      )
    },
    [removeItem],
  )

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items])

  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isLoaded,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isLoaded],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider. Make sure your component is wrapped with CartProvider.")
  }
  return context
}
