"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MainNav() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { title: 'NEW IN', href: '/new-in' },
    { title: 'BESTSELLER', href: '/bestseller' },
    { title: 'SHOP WOMEN', href: '/shop-women' },
    { title: 'SHOP MEN', href: '/shop-men' },
    { title: 'SHOP BY CRAFTS', href: '/crafts' },
    { title: 'INFLUENCERS EDIT', href: '/influencers' },
    { title: 'SPECIAL PRICES', href: '/special-prices', highlight: true },
    { title: 'CELEBRITIES', href: '/celebrities' },
    { title: 'OUR STORY', href: '/our-story' },
  ];

  return (
    <nav className="w-full bg-black border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto">
        <ul className="flex items-center justify-center space-x-8 py-4 px-4 overflow-x-auto">
          {menuItems.map((item) => (
            <li key={item.href} className="relative">
              <Link 
                href={item.href}
                className="text-sm whitespace-nowrap text-[#f9ca86] hover:text-[#ec8387] transition-colors duration-200"
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
  );
}