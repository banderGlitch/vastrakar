"use client";
import { useState, useEffect, useRef } from 'react';
import ProductCard from '../cards/ProductCard'
import Loader from '../ui/Loader'
import { useLoading } from '@/app/hooks/useLoading';

const PRODUCTS_PER_PAGE = 8;



export default function BestSeller({products =[]}) {
  console.log('products --->', products)
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null);
  const { isLoading, withLoading} = useLoading();

  const loadMoreProducts = async () => {
    if (isLoading) return;

    await withLoading(async () => {
      const start = (page - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;
      const nextProducts = products.slice(start, end);
      if (nextProducts.length) {
        setDisplayedProducts(prev => [...prev, ...nextProducts]);
        setPage(prev => prev + 1);
      }

    })
  }

    // Trigger initial load
    useEffect(() => {
      loadMoreProducts();
    }, []);


    // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && displayedProducts.length < products.length) {
          loadMoreProducts();
        }
      },
      { threshold: 0.5 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [displayedProducts, products.length]);

  useEffect(() => {
    console.log('displayedProducts --->', displayedProducts)
  }, [displayedProducts])

    
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

        {/* Loader container for IntersectionObserver */}
        <div ref={loaderRef} className="flex justify-center mt-10 pb-10">
          {isLoading && <Loader size="small" />}
          {!isLoading && displayedProducts.length >= products.length && (
            <p className="text-sm text-white opacity-60">🎉 You've reached the end!</p>
          )}
        </div>
      </div>
    </section>
  )
}
// import { useState, useEffect, useRef } from 'react';
// import ProductCard from '../cards/ProductCard';
// import Loader from '../ui/Loader';
// import { products } from '@/app/data/products';
// import { useLoading } from '@/app/hooks/useLoading';

// export default function BestSeller({ products }) {
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const loaderRef = useRef(null);
//   const PRODUCTS_PER_PAGE = 4;
//   const { isLoading, withLoading } = useLoading();

//   // Function to load more products
//   const loadMoreProducts = async () => {
//     await withLoading(async () => {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
//       const endIndex = startIndex + PRODUCTS_PER_PAGE;
//       const newProducts = products.slice(startIndex, endIndex);
      
//       setDisplayedProducts(prev => [...prev, ...newProducts]);
//       setPage(prev => prev + 1);
//     });
//   };

//   // Initialize intersection observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const first = entries[0];
//         if (first.isIntersecting && !isLoading && displayedProducts.length < products.length) {
//           loadMoreProducts();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const currentLoader = loaderRef.current;
//     if (currentLoader) {
//       observer.observe(currentLoader);
//     }

//     return () => {
//       if (currentLoader) {
//         observer.unobserve(currentLoader);
//       }
//     };
//   }, [isLoading, displayedProducts.length]);

//   // Initial load
//   useEffect(() => {
//     loadMoreProducts();
//   }, []);

//   return (
//     <section className="py-16 bg-black">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center font-playfair text-2xl font-bold mb-12 text-[#f9ca86]">
//           BESTSELLERS
//         </h2>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {displayedProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {/* Loader Reference */}
//         <div 
//           ref={loaderRef} 
//           className="flex justify-center mt-8 pb-8"
//         >
//           {isLoading && <Loader size="small" />}
//         </div>
//       </div>
//     </section>
//   );
// }