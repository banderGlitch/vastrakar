import HeroCarousel from './components/ui/HeroCarousel'
import BestSellers from './components/sections/BestSeller'
const Home = () => {
  const products = [
    {
      id: 1,
      name: "Nora Chikankari Muslin Straight Kurta",
      price: "4,450",
      image: "/images/products/kurts1.webp",
      badge: "Most Popular",
      rating: "5",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
      category: "kurta",
      description: "Beautiful hand-embroidered Chikankari kurta in pure muslin fabric",
      details: {
        fabric: "Pure Muslin",
        work: "Chikankari",
        style: "Straight Cut",
        length: "45 inches",
        occasion: "Casual, Festive",
      }
    },
    {
      id: 2,
      name: "Karima Chikankari Rayon Straight Kurta Set",
      price: "2,650",
      originalPrice: "2,950",
      discount: "10",
      image: "/images/products/kurts2.webp",
      badge: "Bestseller",
      rating: "4.94",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      category: "kurta-set",
      description: "Elegant Chikankari kurta set with matching palazzo",
      details: {
        fabric: "Rayon",
        work: "Chikankari",
        style: "Straight Cut with Palazzo",
        length: "42 inches",
        occasion: "Casual, Office Wear",
      }
    },
  ];
  return (
    <>
      <HeroCarousel />
      <BestSellers products={products} />
    </>
  );
};

export default Home;