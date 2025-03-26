'use client';
import { useEffect, useState } from 'react';
import HeroCarousel from './components/ui/HeroCarousel';
import BestSeller from './components/sections/BestSeller';
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch('/api/products', { cache: 'no-store' });
  //       const { products } = await res.json();
  //       console.log('Products fetched------------>:', products);
  //       setData(products);
  //     } catch (err) {
  //       console.error('Error fetching products:', err);
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const fetchProducts = async () => {
    const res = await fetch(`/api/products${cursor ? `?cursor=${cursor}` : ''}`, { cache: 'no-store' });
    const json = await res.json();  
    console.log('json------------>:', json);  
    setProducts(prev => [...prev, ...json.products]);
    setCursor(json.endCursor);
    setHasNextPage(json.hasNextPage);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchMoreProducts = () => {
    fetchProducts();
  }

  return (
    <main>  
          <HeroCarousel />
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreProducts}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more products to show.</p>}
          >
          <BestSeller products={products} />
          </InfiniteScroll>
      </main>
  );
}