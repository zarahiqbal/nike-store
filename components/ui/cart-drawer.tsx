"use client"
import { useState } from "react"
import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import { useCart } from "../../lib/CartContext"
import { Button } from "./button"

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, totalItems, totalPrice, updateQuantity, removeItem, isLoaded } = useCart()

  const formatImageUrl = (url: string) => {
    return url.startsWith("http") ? url : `https://elegant-duck-3bccb7b995.strapiapp.com${url}`
  }

  // Don't render until cart is loaded to prevent hydration issues
  if (!isLoaded) {
    return (
      <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-50 bg-white shadow-lg hover:bg-gray-100">
        <ShoppingBag className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <>
      {/* Cart Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-white shadow-lg hover:bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Bag ({totalItems})</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Your bag is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 border-b pb-4">
                    <img
                      src={formatImageUrl(item.image) || "/placeholder.svg"}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-gray-600 text-sm">Size: {item.size}</p>
                      <p className="font-medium">SAR {item.price.toLocaleString()}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>SAR {totalPrice.toLocaleString()}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
