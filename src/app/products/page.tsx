// "use client"

// import { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { Heart } from "lucide-react"
// import { ShoppingCart } from "lucide-react"

// type Product = {
//   id: number
//   title: string
//   price: number
//   slug: string
//   category: string
//   images: {
//     url: string
//   }[]
//   colors?: number
//   badge?: "Just In" | "Bestseller"
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selectedCategory, setSelectedCategory] = useState<string>("all")
//   const [cartItems, setCartItems] = useState<number>(0)
//   const [categories, setCategories] = useState<string[]>(["all"])

//   const searchParams = useSearchParams()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)

//         // Fetch products
//         const response = await fetch("https://elegant-duck-3bccb7b995.strapiapp.com/api/products?populate=*")
//         const data = await response.json()

//         console.log("API Response:", data) // Debug log

//         const rawProducts = data.data || []

//         const mapped = rawProducts.map((p: any, index: number) => ({
//           id: p.id,
//           title: p.attributes?.title || p.title || `Nike Product ${index + 1}`,
//           price: p.attributes?.Price || p.Price || Math.floor(Math.random() * 1000) + 500,
//           slug: p.attributes?.slug || p.slug || `product-${p.id}`,
//           category:
//             p.attributes?.categories?.data?.[0]?.attributes?.name ||
//             p.categories?.[0]?.name ||
//             (p.categories && p.categories.length > 0 ? p.categories[0].name : "Men's Road Running Shoes"),
//           images: (p.attributes?.images?.data || p.images || []).map((img: any) => ({
//             url:
//               img.attributes?.formats?.medium?.url ||
//               img.attributes?.url ||
//               img.formats?.medium?.url ||
//               img.url ||
//               "/placeholder.svg?height=400&width=400",
//           })),
//           colors: p.attributes?.colors || p.colors || Math.floor(Math.random() * 7) + 1,
//           badge: index === 1 ? "Just In" : index === 2 ? "Bestseller" : undefined,
//         }))

//         setProducts(mapped)

//         // Extract unique categories from products (excluding "Trending")
//         const uniqueCategories: string[] = Array.from(
//           new Set(mapped.map((product: Product) => product.category.toLowerCase()).filter((cat: string) => cat !== "trending")),
//         )
//         setCategories(["all", ...uniqueCategories])

//         // Set initial category from URL parameter
//         const categoryParam = searchParams.get("category")
//         if (categoryParam && uniqueCategories.includes(categoryParam.toLowerCase())) {
//           setSelectedCategory(categoryParam.toLowerCase())
//         } else {
//           setSelectedCategory("all")
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch products:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [searchParams])

//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Category Filter Skeleton */}
//           <div className="mb-8">
//             <div className="flex flex-wrap gap-3">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="px-6 py-2 bg-gray-200 rounded-full animate-pulse h-10 w-20"></div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
//                 <div className="bg-gray-200 aspect-square"></div>
//                 <div className="p-6 space-y-3">
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/3"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       {/* Cart Header */}
//       <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
//             Nike Store
//           </Link>
//           <button
//             className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
//             onClick={() => alert(`Cart has ${cartItems} items`)}
//           >
//             <ShoppingCart className="w-6 h-6 text-gray-700" />
//             {cartItems > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
//                 {cartItems > 99 ? "99+" : cartItems}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto pt-20">
//         {/* Category Filter */}
//         <div className="mb-8">
//           <div className="flex flex-wrap gap-3">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
//                   selectedCategory === category
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
//                 }`}
//               >
//                 {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Results count */}
//           <div className="mt-4 text-gray-600">
//             {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
//             {selectedCategory !== "all" && (
//               <span className="ml-1">in "{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}"</span>
//             )}
//           </div>
//         </div>

//         {/* PRODUCTS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProducts.length === 0 ? (
//             <div className="col-span-full text-center text-gray-500 py-12">
//               <p className="text-lg">No products found in this category.</p>
//               <button
//                 onClick={() => setSelectedCategory("all")}
//                 className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//               >
//                 View All Products
//               </button>
//             </div>
//           ) : (
//             filteredProducts.map((product) => {
//               const image = product.images[0]?.url
//               return (
//                 <Link key={product.id} href={`/products/${product.slug}`} className="group block">
//                   <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     {/* Product Image Container */}
//                     <div className="relative bg-gray-100 aspect-square">
//                       {/* Heart Icon */}
//                       <button
//                         className="absolute top-4 right-4 z-10 p-2 hover:bg-white/80 rounded-full transition-colors"
//                         onClick={(e) => {
//                           e.preventDefault()
//                           e.stopPropagation()
//                           // Add to favorites logic here
//                           alert(`Added "${product.title}" to favorites!`)
//                         }}
//                       >
//                         <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
//                       </button>

//                       {/* Badge */}
//                       {product.badge && (
//                         <div className="absolute top-4 left-4 z-10">
//                           <span className="px-2 py-1 text-xs font-medium rounded bg-orange-500 text-white">
//                             {product.badge}
//                           </span>
//                         </div>
//                       )}

//                       {/* Product Image */}
//                       <div className="w-full h-full flex items-center justify-center p-8">
//                         <img
//                           src={image || "/placeholder.svg?height=400&width=400"}
//                           alt={product.title}
//                           className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement
//                             target.src = "/placeholder.svg?height=400&width=400"
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-6">
//                       <h3 className="text-lg font-medium text-gray-900 mb-1">{product.title}</h3>
//                       <p className="text-gray-600 mb-2">{product.category}</p>
//                       <p className="text-gray-600 mb-4">
//                         {product.colors} {product.colors === 1 ? "Colour" : "Colours"}
//                       </p>
//                       <p className="text-lg font-medium text-gray-900">SAR {product.price.toLocaleString()}.00</p>
//                     </div>
//                   </div>
//                 </Link>
//               )
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Heart } from "lucide-react"
import { CartDrawer } from "../../../components/ui/cart-drawer"
import { ProductCardSkeleton, CategorySkeleton } from "../../../components/ui/loading-skeleton"
import { useApi } from "../../../hooks/use-api"

type Product = {
  id: number
  title: string
  price: number
  slug: string
  category: string
  images: { url: string }[]
  colors?: number
  badge?: "Just In" | "Bestseller"
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const searchParams = useSearchParams()

  const { data: productsData, loading } = useApi<any>(
    "https://elegant-duck-3bccb7b995.strapiapp.com/api/products?populate=*",
  )

  const { products, categories } = useMemo(() => {
    const rawProducts = productsData?.data || []

    const mapped = rawProducts.map((p: any, index: number) => ({
      id: p.id,
      title: p.attributes?.title || p.title || `Nike Product ${index + 1}`,
      price: p.attributes?.Price || p.Price || Math.floor(Math.random() * 1000) + 500,
      slug: p.attributes?.slug || p.slug || `product-${p.id}`,
      category:
        p.attributes?.categories?.data?.[0]?.attributes?.name || p.categories?.[0]?.name || "Men's Road Running Shoes",
      images: (p.attributes?.images?.data || p.images || []).map((img: any) => ({
        url:
          img.attributes?.formats?.medium?.url ||
          img.attributes?.url ||
          img.formats?.medium?.url ||
          img.url ||
          "/placeholder.svg?height=400&width=400",
      })),
      colors: p.attributes?.colors || p.colors || Math.floor(Math.random() * 7) + 1,
      badge: index === 1 ? "Just In" : index === 2 ? "Bestseller" : undefined,
    }))

    // Extract unique categories (excluding "Trending")
    const uniqueCategories: string[] = Array.from(
      new Set(
        mapped.map((product: Product) => product.category.toLowerCase()).filter((cat: string) => cat !== "trending"),
      ),
    )

    return {
      products: mapped,
      categories: ["all", ...uniqueCategories],
    }
  }, [productsData])

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && categories.includes(categoryParam.toLowerCase())) {
      setSelectedCategory(categoryParam.toLowerCase())
    } else {
      setSelectedCategory("all")
    }
  }, [searchParams, categories])

  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p: Product) => p.category.toLowerCase() === selectedCategory.toLowerCase())
  }, [products, selectedCategory])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const formatImageUrl = (url: string) => {
    return url.startsWith("http") ? url : `https://elegant-duck-3bccb7b995.strapiapp.com${url}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto pt-20">
          <CategorySkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <CartDrawer />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Nike Store
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-4 text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            {selectedCategory !== "all" && (
              <span className="ml-1">in "{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}"</span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              <p className="text-lg">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                View All Products
              </button>
            </div>
          ) : (
            filteredProducts.map((product: Product) => {
              const image = product.images[0]?.url
              const isFavorite = favorites.has(product.id)

              return (
                <div key={product.id} className="group block">
                  <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Product Image Container */}
                    <div className="relative bg-gray-100 aspect-square">
                      {/* Heart Icon */}
                      <button
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
                          isFavorite ? "bg-red-100 text-red-500" : "hover:bg-white/80 text-gray-600 hover:text-red-500"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                      >
                        <Heart className={`w-6 h-6 transition-colors ${isFavorite ? "fill-current" : ""}`} />
                      </button>

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-2 py-1 text-xs font-medium rounded bg-orange-500 text-white">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Product Image */}
                      <Link href={`/products/${product.slug}`}>
                        <div className="w-full h-full flex items-center justify-center p-8 cursor-pointer">
                          <img
                            src={formatImageUrl(image || "/placeholder.svg?height=400&width=400")}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=400&width=400"
                            }}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Product Info */}
                    <Link href={`/products/${product.slug}`}>
                      <div className="p-6 cursor-pointer">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.title}</h3>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-gray-600 mb-4">
                          {product.colors} {product.colors === 1 ? "Colour" : "Colours"}
                        </p>
                        <p className="text-lg font-medium text-gray-900">SAR {product.price.toLocaleString()}.00</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
