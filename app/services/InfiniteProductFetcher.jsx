'use client';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../components/ui/Loader'

export default function InfiniteProductFetcher({ apiRoute = '/api/products', renderItems }) {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch(`${apiRoute}${cursor ? `?cursor=${cursor}` : ''}`, { cache: 'no-store' });
    const json = await res.json();

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
  }, [apiRoute]);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasNextPage}
      loader={
        <div className="w-full py-10 flex justify-center items-center overflow-hidden">
          <Loader />
        </div>
      }
    >
      {renderItems(products)}
    </InfiniteScroll>
  );
}