"use client";
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const pathname = usePathname();

  const mainMenuItems = [
    { title: 'NEW IN', href: '/new-in' },
    { title: 'BESTSELLER', href: '/bestseller' },
    { title: 'SHOP WOMEN', href: '/shop-women' },
    { title: 'SHOP MEN', href: '/shop-men' },
    { title: 'SHOP BY CRAFTS', href: '/crafts' },
    // { title: 'INFLUENCERS EDIT', href: '/influencers' },
    // { title: 'SPECIAL PRICES', href: '/special-prices', highlight: true },
    // { title: 'CELEBRITIES', href: '/celebrities' },
    // { title: 'OUR STORY', href: '/our-story' },
  ];

  const handleNavigation = useCallback(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black">
      {/* Top Navbar */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" onClick={handleNavigation}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <Image
                  src="/images/vastrakariLogoCroped.png"
                  alt="Vastrakari Logo"
                  width={140}
                  height={30}
                  className="rounded-lg mt-7"
                  priority
                />
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 text-[#f9ca86]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Navigation Menu */}
      <nav className="border-b border-white/10 hidden md:block">
        <div className="max-w-screen-2xl mx-auto">
          <ul className="flex items-center justify-center space-x-8 py-4 px-4 overflow-x-auto">
            {mainMenuItems.map((item) => (
              <li key={item.href} className="relative">
                <Link 
                  href={item.href}
                  className={`text-sm whitespace-nowrap text-[#f9ca86] hover:text-[#ec8387] transition-colors duration-200`}
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.title}
                  {hoveredItem === item.title && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 h-0.5 bg-[#ec8387]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden fixed inset-0 top-16 bg-black z-50 overflow-y-auto`}
      >
        <ul className="flex flex-col p-4">
          {mainMenuItems.map((item) => (
            <li key={item.href} className="border-b border-white/10 last:border-none">
              <Link
                href={item.href}
                onClick={handleNavigation}
                className="block py-3 px-4 text-[#f9ca86] hover:text-[#ec8387] hover:bg-white/5 transition-colors duration-200"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}