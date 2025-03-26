'use client';
import { useEffect, useState } from 'react';
import HeroCarousel from './components/ui/HeroCarousel';
import BestSeller from './components/sections/BestSeller';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        const { products } = await res.json();
        console.log('Products fetched------------>:', products);
        setData(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>  
          <HeroCarousel />
          <BestSeller />
      </main>
  );
}