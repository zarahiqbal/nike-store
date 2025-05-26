// "use client"

// import { useEffect, useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ShoppingBag } from 'lucide-react'
// import { Button } from "../../components/ui/button"

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

// export default function HomePage() {
//   const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [categories, setCategories] = useState<any[]>([])
//   const [featuredImage, setFeaturedImage] = useState<string>("")
//   const [heroImage, setHeroImage] = useState<string>("")

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)

//         // Fetch products
//         const productsResponse = await fetch("https://elegant-duck-3bccb7b995.strapiapp.com/api/products?populate=*")
//         const productsData = await productsResponse.json()

//         const rawProducts = productsData.data || []

//         // First filter raw products that have "Trending" category
//         const trendingRawProducts = rawProducts.filter((p: any) => {
//           const productCategories = p.attributes?.categories?.data || p.categories || []
//           return productCategories.some(
//             (cat: any) => (cat.attributes?.name || cat.name || "").toLowerCase() === "trending",
//           )
//         })

//         const trending = trendingRawProducts.map((p: any, index: number) => ({
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

//         setTrendingProducts(trending.slice(0, 6))

//         // Fetch categories
//         try {
//           const categoriesResponse = await fetch(
//             "https://elegant-duck-3bccb7b995.strapiapp.com/api/categories?populate=*",
//           )
//           const categoriesData = await categoriesResponse.json()

//           const rawCategories = categoriesData.data || []

//           // Find the "nikemen" category for featured image
//           const nikemenCategory = rawCategories.find((cat: any) => {
//             const categoryName = cat.attributes?.name || cat.name || ""
//             return categoryName.toLowerCase() === "nikemen"
//           })

//           if (nikemenCategory) {
//             const featuredImg =
//               nikemenCategory.attributes?.image?.data?.attributes?.url ||
//               nikemenCategory.image?.url ||
//               "/placeholder.svg?height=400&width=600"
//             setFeaturedImage(featuredImg)
//           }

//           // Find the "Main" category for hero image
//           const mainCategory = rawCategories.find((cat: any) => {
//             const categoryName = cat.attributes?.name || cat.name || ""
//             return categoryName.toLowerCase() === "main"
//           })

//           if (mainCategory) {
//             const heroImg =
//               mainCategory.attributes?.image?.data?.attributes?.url ||
//               mainCategory.image?.url ||
//               "/placeholder.svg?height=600&width=1200"
//             setHeroImage(heroImg)
//           }

//           // Filter out "Trending", "nikemen", and "main" categories and limit to 3 categories
//           const filteredCategories = rawCategories
//             .filter((cat: any) => {
//               const categoryName = cat.attributes?.name || cat.name || ""
//               return (
//                 categoryName.toLowerCase() !== "trending" &&
//                 categoryName.toLowerCase() !== "nikemen" &&
//                 categoryName.toLowerCase() !== "main"
//               )
//             })
//             .slice(0, 3)

//           setCategories(filteredCategories)
//         } catch (categoryError) {
//           console.error("❌ Failed to fetch categories:", categoryError)
//           // Fallback to default categories if API fails
//           setCategories([
//             { name: "Running", slug: "running" },
//             { name: "Basketball", slug: "basketball" },
//             { name: "Training", slug: "training" },
//           ])
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Minimal Header with Cart */}
//       <header className="fixed top-4 right-4 z-50">
//         <Button variant="ghost" size="icon" className="bg-white shadow-lg hover:bg-gray-100">
//           <ShoppingBag className="w-5 h-5" />
//         </Button>
//       </header>

//       {/* Hero Section */}
//       <section className="relative">
//         <div className="relative h-[600px] bg-gray-100">
//           {heroImage ? (
//             <img
//               src={heroImage || "/placeholder.svg"}
//               alt="Nike Air Max"
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 const target = e.target as HTMLImageElement
//                 target.src = "/placeholder.svg?height=600&width=1200"
//               }}
//             />
//           ) : (
//             <Image src="/placeholder.svg?height=600&width=1200" alt="Nike Air Max" fill className="object-cover" />
//           )}
//           <div className="absolute inset-0 bg-black/20" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-6xl font-bold mb-4">JUST DO IT</h1>
//               <p className="text-xl mb-8">Nike Air Max 270</p>
//               <Link href="/products">
//                 <Button size="lg" className="bg-white text-black hover:bg-gray-100">
//                   Shop Now
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold mb-8">Featured</h2>
//         <div className="max-w-2xl mx-auto">
//           <div className="relative group cursor-pointer">
//             <Link href="/products">
//               <div className="relative h-[500px] bg-gray-100 overflow-hidden">
//                 {featuredImage ? (
//                   <img
//                     src={featuredImage || "/placeholder.svg"}
//                     alt="Men's Collection"
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement
//                       target.src = "/placeholder.svg?height=400&width=600"
//                     }}
//                   />
//                 ) : (
//                   <Image
//                     src="/placeholder.svg?height=400&width=600"
//                     alt="Men's Collection"
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 )}
//               </div>
//               <div className="mt-4 text-center">
//                 <h3 className="text-xl font-semibold">Men's Collection</h3>
//                 <p className="text-gray-600 mb-4">Step into comfort and style</p>
//                 <Button variant="outline">Shop Men's</Button>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Trending Section */}
//       <section className="bg-gray-50 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-8">Trending</h2>
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="group cursor-pointer">
//                   <div className="relative h-[300px] bg-gray-200 overflow-hidden animate-pulse"></div>
//                   <div className="mt-4 space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {trendingProducts.map((product) => {
//                 const image = product.images[0]?.url || "/placeholder.svg?height=300&width=400"
//                 return (
//                   <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
//                     <div className="relative h-[300px] bg-white overflow-hidden rounded-lg">
//                       <div className="w-full h-full flex items-center justify-center p-8">
//                         <img
//                           src={image || "/placeholder.svg"}
//                           alt={product.title}
//                           className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement
//                             target.src = "/placeholder.svg?height=300&width=400"
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <h3 className="font-semibold">{product.title}</h3>
//                       <p className="text-gray-600">SAR {product.price.toLocaleString()}.00</p>
//                     </div>
//                   </Link>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {categories.map((category) => {
//             const categoryName = category.attributes?.name || category.name || "Category"
//             const categorySlug = category.attributes?.slug || category.slug || categoryName.toLowerCase()
//             const categoryImage =
//               category.attributes?.image?.data?.attributes?.url ||
//               category.image?.url ||
//               `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(categoryName)}`

//             return (
//               <Link
//                 key={category.id || categorySlug}
//                 href={`/products?category=${categorySlug}`}
//                 className="text-center group cursor-pointer"
//               >
//                 <div className="relative h-[250px] bg-gray-100 rounded-lg overflow-hidden mb-4">
//                   <img
//                     src={categoryImage || "/placeholder.svg"}
//                     alt={categoryName}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement
//                       target.src = `/placeholder.svg?height=250&width=300&text=${encodeURIComponent(categoryName)}`
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h3 className="text-white text-xl font-bold text-center px-4">{categoryName}</h3>
//                   </div>
//                 </div>
//               </Link>
//             )
//           })}
//         </div>
//       </section>
//     </div>
//   )
// }

"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { CartDrawer } from "../../components/ui/cart-drawer"
import { ProductCardSkeleton } from "../../components/ui/loading-skeleton"
import { useApi } from "../../hooks/use-api"

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

type Category = {
  id: number
  attributes?: {
    name: string
    slug: string
    image?: {
      data?: {
        attributes?: {
          url: string
        }
      }
    }
  }
  name?: string
  slug?: string
  image?: { url: string }
}

export default function HomePage() {
  const { data: productsData, loading: productsLoading } = useApi<any>(
    "https://elegant-duck-3bccb7b995.strapiapp.com/api/products?populate=*",
  )

  const { data: categoriesData, loading: categoriesLoading } = useApi<any>(
    "https://elegant-duck-3bccb7b995.strapiapp.com/api/categories?populate=*",
  )

  const { trendingProducts, featuredImage, heroImage, categories } = useMemo(() => {
    const rawProducts = productsData?.data || []
    const rawCategories = categoriesData?.data || []

    // Process trending products
    const trendingRawProducts = rawProducts.filter((p: any) => {
      const productCategories = p.attributes?.categories?.data || p.categories || []
      return productCategories.some((cat: any) => (cat.attributes?.name || cat.name || "").toLowerCase() === "trending")
    })

    const trending = trendingRawProducts
      .map((p: any, index: number) => ({
        id: p.id,
        title: p.attributes?.title || p.title || `Nike Product ${index + 1}`,
        price: p.attributes?.Price || p.Price || Math.floor(Math.random() * 1000) + 500,
        slug: p.attributes?.slug || p.slug || `product-${p.id}`,
        category:
          p.attributes?.categories?.data?.[0]?.attributes?.name ||
          p.categories?.[0]?.name ||
          "Men's Road Running Shoes",
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
      .slice(0, 6)

    // Find special category images
    const nikemenCategory = rawCategories.find((cat: Category) => {
      const categoryName = cat.attributes?.name || cat.name || ""
      return categoryName.toLowerCase() === "nikemen"
    })

    const mainCategory = rawCategories.find((cat: Category) => {
      const categoryName = cat.attributes?.name || cat.name || ""
      return categoryName.toLowerCase() === "main"
    })

    const featuredImg =
      nikemenCategory?.attributes?.image?.data?.attributes?.url ||
      nikemenCategory?.image?.url ||
      "/placeholder.svg?height=400&width=600"

    const heroImg =
      mainCategory?.attributes?.image?.data?.attributes?.url ||
      mainCategory?.image?.url ||
      "/placeholder.svg?height=600&width=1200"

    // Filter categories for display
    const filteredCategories = rawCategories
      .filter((cat: Category) => {
        const categoryName = cat.attributes?.name || cat.name || ""
        return !["trending", "nikemen", "main"].includes(categoryName.toLowerCase())
      })
      .slice(0, 3)

    return {
      trendingProducts: trending,
      featuredImage: featuredImg,
      heroImage: heroImg,
      categories: filteredCategories,
    }
  }, [productsData, categoriesData])

  const formatImageUrl = (url: string) => {
    return url.startsWith("http") ? url : `https://elegant-duck-3bccb7b995.strapiapp.com${url}`
  }

  return (
    <div className="min-h-screen bg-white">
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[600px] bg-gray-100">
          <img
            src={formatImageUrl(heroImage) || "/placeholder.svg"}
            alt="Nike Air Max"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=600&width=1200"
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">JUST DO IT</h1>
              <p className="text-xl mb-8">Nike Air Max 270</p>
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured</h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative group cursor-pointer">
            <Link href="/products">
              <div className="relative h-[500px] bg-gray-100 overflow-hidden rounded-lg">
                <img
                  src={formatImageUrl(featuredImage) || "/placeholder.svg"}
                  alt="Men's Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=500&width=600"
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold">Men's Collection</h3>
                <p className="text-gray-600 mb-4">Step into comfort and style</p>
                <Button variant="outline">Shop Men's</Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending</h2>
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trendingProducts.map((product: Product) => {
                const image = product.images[0]?.url || "/placeholder.svg?height=300&width=400"
                return (
                  <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
                    <div className="relative h-[300px] bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <img
                          src={formatImageUrl(image) || "/placeholder.svg"}
                          alt={product.title}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=300&width=400"
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-gray-600">SAR {product.price.toLocaleString()}.00</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        {categoriesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[250px] bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category: Category) => {
              const categoryName = category.attributes?.name || category.name || "Category"
              const categorySlug = category.attributes?.slug || category.slug || categoryName.toLowerCase()
              const categoryImage =
                category.attributes?.image?.data?.attributes?.url ||
                category.image?.url ||
                `/placeholder.svg?height=250&width=300&text=${encodeURIComponent(categoryName)}`

              return (
                <Link
                  key={category.id || categorySlug}
                  href={`/products?category=${categorySlug}`}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative h-[250px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img
                      src={formatImageUrl(categoryImage) || "/placeholder.svg"}
                      alt={categoryName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=250&width=300&text=${encodeURIComponent(categoryName)}`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold text-center px-4">{categoryName}</h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
