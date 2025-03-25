"use client";
import { useState, useEffect, useRef } from 'react';
import ProductCard from '../cards/ProductCard';
import Loader from '../ui/Loader';
import { products } from '@/app/data/products';
import { useLoading } from '@/app/hooks/useLoading';

export default function BestSeller() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const PRODUCTS_PER_PAGE = 4;
  const { isLoading, withLoading } = useLoading();

  // Function to load more products
  const loadMoreProducts = async () => {
    await withLoading(async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = products.slice(startIndex, endIndex);
      
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);
    });
  };

  // Initialize intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && displayedProducts.length < products.length) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isLoading, displayedProducts.length]);

  // Initial load
  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-playfair text-2xl font-bold mb-12 text-[#f9ca86]">
          BESTSELLERS
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Loader Reference */}
        <div 
          ref={loaderRef} 
          className="flex justify-center mt-8 pb-8"
        >
          {isLoading && <Loader size="small" />}
        </div>

        {/* Show message when all products are loaded */}
        {displayedProducts.length >= products.length && (
          <p className="text-center text-[#f9ca86]/60 mt-8">
            You've reached the end of the collection
          </p>
        )}
      </div>
    </section>
  );
}