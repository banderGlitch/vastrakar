"use client";
import ProductCard from '../cards/ProductCard'




export default function BestSeller({products =[]}) {
  console.log('products --->', products)
  return (
    <section className="py-16 bg-black">
    <div className="container mx-auto px-4">
      <h2 className="text-center font-playfair text-2xl font-bold mb-12 text-[#f9ca86]">
        BESTSELLERS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={`${product.id}-${product.image}`} product={product} />
        ))}
      </div>
    </div>
  </section>
  )
}
