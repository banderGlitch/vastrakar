"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center space-x-8 py-6">
          <Link 
            href="/"
            className={`py-2 px-6 rounded-full transition-all duration-300 text-lg font-medium ${
              pathname === '/' 
                ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about"
            className={`py-2 px-6 rounded-full transition-all duration-300 text-lg font-medium ${
              pathname === '/about' 
                ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact"
            className={`py-2 px-6 rounded-full transition-all duration-300 text-lg font-medium ${
              pathname === '/contact' 
                ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}