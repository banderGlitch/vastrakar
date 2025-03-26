"use client";
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Loader from '../ui/Loader';

export default function ProductCard({ product }) {
  console.log("product", product)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <motion.div
      className="h-full flex flex-col bg-black p-4 rounded-lg shadow-sm border border-white/10"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden bg-black-100">
        {
          !imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
              <Loader />
            </div>
          )
        }
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Badge - Left Top */}
        <div className="absolute top-3 left-3 bg-[#ec8387] text-white px-3 py-1 text-xs font-medium rounded">
          {product.badge}
        </div>

        {/* Rating - Right Top */}
        <div className="absolute top-3 right-12 bg-black/90 px-2 py-1 rounded-sm flex items-center gap-1">
          <span className="text-[#f9ca86] text-sm">★</span>
          <span className="text-xs font-medium text-white">{product.rating}</span>
        </div>

        {/* Wishlist Button - Right Top Corner */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-sm bg-black/90 hover:bg-black/80"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-[#ec8387] text-[#ec8387]' : 'text-[#f9ca86]/70'
              }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col">
        {/* Title */}
        <h3 className="font-medium text-[#f9ca86] mb-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold text-[#f9ca86]">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-[#f9ca86]/50 line-through">
                M.R.P. ₹{product.originalPrice}
              </span>
              <span className="text-sm text-[#ec8387]">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Size Options */}
        <div className="flex gap-2 flex-wrap mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-9 h-9 text-xs font-medium border rounded-sm transition-colors
                ${size === selectedSize
                  ? 'border-[#ec8387] text-[#ec8387] bg-[#ec8387]/10'
                  : 'border-white/20 text-white/50 hover:border-[#ec8387]/30'
                }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full py-3 mt-auto text-[#f9ca86] text-sm font-medium bg-[#ec8387] rounded-sm hover:bg-[#ec8387]/90 transition-colors">
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
}