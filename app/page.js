'use client';
import HeroCarousel from './components/ui/HeroCarousel';
import BestSeller from './components/sections/BestSeller';
import InfiniteProductFetcher from './services/InfiniteProductFetcher';

export default function Home() {

  return (
    <main>
      <HeroCarousel />
      <InfiniteProductFetcher
        apiRoute="/api/products"
        renderItems={(products) => <BestSeller products={products} />}
      />
    </main>
  );
}