'use client';
import { useEffect, useState } from 'react';
import HeroCarousel from './components/ui/HeroCarousel';
import BestSeller from './components/sections/BestSeller';
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './components/ui/Loader';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch(`/api/products${cursor ? `?cursor=${cursor}` : ''}`, { cache: 'no-store' });
    const json = await res.json();
    console.log('json------------>:', json);

    setProducts((prev) => {
      const all = [...prev, ...json.products];
      const seen = new Set();
      return all.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });
    });

    setCursor(json.endCursor);
    setHasNextPage(json.hasNextPage);
  };

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
        loader={
          <div className="w-full py-10 flex justify-center items-center overflow-hidden">
            <Loader />
          </div>

        }
      >
        <BestSeller products={products} />
      </InfiniteScroll>
    </main>
  );
}