
// 'use client';

// import { useState, useEffect } from 'react';
// import { useCart } from '../../../../lib/CartContext';
// import api from '../../../../lib/api';
// import { useParams } from 'next/navigation';

// type ProductDetail = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   images: { url: string }[];
//   sizes: { size: string; in_stock: boolean }[];
//   category?: {
//     name: string;
//   };
// };

// export default function ProductDetailPage() {
//   const { slug } = useParams();
//   const [product, setProduct] = useState<ProductDetail | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string>('');
//   const [mainImage, setMainImage] = useState<string | null>(null);
//   const { addItem, items } = useCart();
//   const [cartOpen, setCartOpen] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(
//           `/products?filters[slug][$eq]=${slug}&populate=*`
//         );
//         const p = res.data.data[0];
//         if (!p) return;
//         const data: ProductDetail = {
//           id: p.id,
//           title: p.title,
//           description: p.Description,
//           price: p.Price,
//           images: (p.images || []).map((img: any) => ({ url: img.url })),
//           sizes: p.size || [],
//           category: p.category ? { name: p.category.name } : undefined,
//         };
//         setProduct(data);
//         setMainImage(data.images[0]?.url || null);
//       } catch (e) {
//         console.error('Failed to fetch product:', e);
//       }
//     };
//     fetchProduct();
//   }, [slug]);

//   if (!product) return <div>Loading...</div>;

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       alert('Please select a shoe size.');
//       return;
//     }

//     const selected = product.sizes.find(s => s.size === selectedSize);
//     if (!selected?.in_stock) {
//       alert('This size is out of stock.');
//       return;
//     }

//     addItem({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       size: selectedSize,
//       quantity: 1,
//       image: mainImage || '',
//     });
//     alert('Added to cart!');
//   };

//   return (
//     <div className="pt-20 px-6">
//       {/* Cart icon + toggle */}
//       <div className="fixed top-4 right-4 z-50">
//         <button
//           onClick={() => setCartOpen(!cartOpen)}
//           className="relative bg-black text-white px-4 py-2 rounded"
//         >
//           Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
//         </button>

//         {cartOpen && (
//           <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg p-4 text-black z-50">
//             <h3 className="font-semibold mb-2">Cart Items</h3>
//             {items.length === 0 ? (
//               <p>Cart is empty</p>
//             ) : (
//               items.map((item) => (
//                 <div key={`${item.id}-${item.size}`} className="mb-2 border-b pb-2">
//                   <div className="flex items-center gap-2">
//                     <img
//                       //src={`http://localhost:1337${item.image}`}
//                       src= {item.image.startsWith('http') ? item.image : `https://elegant-duck-3bccb7b995.strapiapp${item.image}`}
                      
//                       alt={item.title}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-semibold">{item.title}</p>
//                       <p>Size: {item.size}</p>
//                       <p>Qty: {item.quantity}</p>
//                       <p>SAR {item.price}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left: Images */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex md:flex-col gap-2">
//             {product.images.map((img, i) => (
//               <img
//                 key={i}
//                // src={`https://elegant-duck-3bccb7b995.strapiapp.com${img.url}`}
//                src={img.url.startsWith('http') ? img.url : `https://elegant-duck-3bccb7b995.strapiapp${img.url}`} 
//                alt={`${product.title} ${i}`}
//                 className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
//                   mainImage === img.url ? 'border-black' : 'border-transparent'
//                 }`}
//                 onClick={() => setMainImage(img.url)}
//               />
//             ))}
//           </div>
//           {mainImage && (
//             <img
//               //src={`http://localhost:1337${mainImage}`}
//               src= {mainImage.startsWith('http') ? mainImage : `https://elegant-duck-3bccb7b995.strapiapp${mainImage}`}
//               alt={product.title}
//               className="w-[550px] h-[600px] object-cover rounded"
//             />
//           )}
//         </div>

//         {/* Right: Product Info */}
//         <div className="flex flex-col gap-4 max-w-lg">
//           <h1 className="text-3xl font-bold">{product.title}</h1>

//           {product.category && (
//             <p className="text-sm italic text-gray-600">{product.category.name}</p>
//           )}

//           <p className="text-lg font-semibold">SAR {product.price}.00</p>

//           <div>
//             <label className="block mb-1 font-semibold">Select Size:</label>
//             <div className="grid grid-cols-3 gap-2">
//               {product.sizes.map((option, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedSize(option.size)}
//                   disabled={!option.in_stock}
//                   className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
//                     selectedSize === option.size
//                       ? 'bg-black text-white'
//                       : option.in_stock
//                       ? 'bg-white text-black hover:bg-gray-100'
//                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   }`}
//                 >
//                   {option.size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="mt-4 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 text-lg"
//           >
//             Add to Bag
//           </button>

//           <p className="text-white-700 mt-6 leading-relaxed">{product.description}</p>
//            {/* Delivery and Returns Section */}
//             <div className="mt-8 border-t pt-6">
//               <details className="group">
//                 <summary className="flex justify-between items-center cursor-pointer py-4 text-lg font-semibold">
//                   <span>Free Delivery and Returns</span>
//                   <svg
//                     className="w-5 h-5 transition-transform group-open:rotate-180"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </summary>
//                 <div className="pb-4 text-gray-700 space-y-3">
//                   <ul className="space-y-2 text-sm leading-relaxed">
//                     <li className="flex items-start">
//                       <span className="mr-2">•</span>
//                       <span>Free returns within 30 days, either online or to any of our Nike stores.</span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2">•</span>
//                       <span>
//                         Free delivery on all orders for our members. Non-members will have free delivery on orders SAR
//                         299 and above.
//                       </span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2">•</span>
//                       <span>Order delivery is usually within 2-5 working days.</span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2">•</span>
//                       <span>Cash on Delivery not available on this product.</span>
//                     </li>
//                   </ul>
//                 </div>
//               </details>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Heart, Truck, RotateCcw } from "lucide-react"
import { useCart } from "../../../../lib/CartContext"
import { CartDrawer } from "../../../../components/ui/cart-drawer"
import { Button } from "../../../../components/ui/button"
import { useApi } from "../../../../hooks/use-api"

type ProductDetail = {
  id: number
  title: string
  description: string
  price: number
  images: { url: string }[]
  sizes: { size: string; in_stock: boolean }[]
  category?: { name: string }
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()

  const {
    data: productData,
    loading,
    error,
  } = useApi<any>(`https://elegant-duck-3bccb7b995.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=*`)

  const product = useMemo(() => {
    if (!productData?.data?.[0]) return null

    const p = productData.data[0]
    return {
      id: p.id,
      title: p.attributes?.title || p.title,
      description: p.attributes?.Description || p.Description || "No description available.",
      price: p.attributes?.Price || p.Price,
      images: (p.attributes?.images?.data || p.images || []).map((img: any) => ({
        url: img.attributes?.url || img.url,
      })),
      sizes: p.attributes?.size || p.size || [],
      category: p.attributes?.category ? { name: p.attributes.category.name } : undefined,
    }
  }, [productData])

  const formatImageUrl = (url: string) => {
    return url.startsWith("http") ? url : `https://elegant-duck-3bccb7b995.strapiapp.com${url}`
  }

  const handleAddToCart = async () => {
    if (!product) return

    if (!selectedSize) {
      alert("Please select a shoe size.")
      return
    }

    const selectedSizeOption = product.sizes.find((s: { size: string; in_stock: boolean }) => s.size === selectedSize)
    if (!selectedSizeOption?.in_stock) {
      alert("This size is out of stock.")
      return
    }

    setIsAddingToCart(true)

    try {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        size: selectedSize,
        quantity: 1,
        image: product.images[mainImageIndex]?.url || "",
      })

      // Show success feedback
      alert("Added to cart!")
    } catch (error) {
      alert("Failed to add to cart. Please try again.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-20 px-6">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex md:flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="w-[550px] h-[600px] bg-gray-200 rounded" />
            </div>
            <div className="flex flex-col gap-4 max-w-lg">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <CartDrawer />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/products"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Products</span>
          </Link>
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Images */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnail Images */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {product.images.map((img: { url: string }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setMainImageIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      mainImageIndex === i ? "border-black" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={formatImageUrl(img.url) || "/placeholder.svg"}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="order-1 md:order-2">
                {product.images[mainImageIndex] && (
                  <div className="relative">
                    <img
                      src={formatImageUrl(product.images[mainImageIndex].url) || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full max-w-[550px] h-[600px] object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                        isFavorite ? "bg-red-100 text-red-500" : "bg-white/80 text-gray-600 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col gap-6 max-w-lg">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                {product.category && <p className="text-gray-600 mb-4">{product.category.name}</p>}
                <p className="text-2xl font-semibold">SAR {product.price.toLocaleString()}.00</p>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold">Select Size</label>
                    <button className="text-sm text-gray-600 hover:text-black underline">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map((option: { size: string; in_stock: boolean }, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(option.size)}
                        disabled={!option.in_stock}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                          selectedSize === option.size
                            ? "bg-black text-white border-black"
                            : option.in_stock
                              ? "bg-white text-black border-gray-300 hover:border-black"
                              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        }`}
                      >
                        {option.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || isAddingToCart}
                loading={isAddingToCart}
                size="lg"
                className="w-full"
              >
                Add to Bag
              </Button>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Delivery and Returns */}
              <div className="border-t pt-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-4 text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5" />
                      <span>Free Delivery and Returns</span>
                    </div>
                    <svg
                      className="w-5 h-5 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pb-4 text-gray-700 space-y-3">
                    <ul className="space-y-2 text-sm leading-relaxed">
                      <li className="flex items-start">
                        <RotateCcw className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Free returns within 30 days, either online or to any of our Nike stores.</span>
                      </li>
                      <li className="flex items-start">
                        <Truck className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          Free delivery on all orders for our members. Non-members will have free delivery on orders SAR
                          299 and above.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Order delivery is usually within 2-5 working days.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Cash on Delivery not available on this product.</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
