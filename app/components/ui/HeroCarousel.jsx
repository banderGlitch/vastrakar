"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const carouselItems = [
  {
    id: 1,
    image: '/images/kurti1.png',
    title: 'Swadesh',
    subtitle: 'Republic Day Edit',
    offers: [
      { text: 'Buy 1, Get 10% Off', code: 'FLAT10' },
      { text: 'Buy 2, Get 15% Off', code: 'FLAT15' },
      { text: 'Buy 3, Get 20% Off', code: 'FLAT20' },
    ],
  },
  {
    id: 2,
    image: '/images/kurti2.png',
    title: 'Marnada',
    subtitle: 'Republic Day Edit',
    offers: [
      { text: 'Buy 1, Get 10% Off', code: 'FLAT10' },
      { text: 'Buy 2, Get 15% Off', code: 'FLAT15' },
      { text: 'Buy 3, Get 20% Off', code: 'FLAT20' },
    ],
  },
  {
    id: 3,
    image: '/images/kurti3.png',
    title: 'Marnada',
    subtitle: 'Republic Day Edit',
    offers: [
      { text: 'Buy 1, Get 10% Off', code: 'FLAT10' },
      { text: 'Buy 2, Get 15% Off', code: 'FLAT15' },
      { text: 'Buy 3, Get 20% Off', code: 'FLAT20' },
    ],
  },
  // Add more carousel items here
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full mt-4 sm:mt-6">
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-[#f5e6d3]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={carouselItems[currentSlide].image}
                alt={carouselItems[currentSlide].title}
                fill
                className="object-contain sm:object-cover object-center"
                priority
                sizes="100vw"
                quality={100}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '100%',
                  objectPosition: 'center',
                }}
              />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center w-full px-4">
                {/* <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-[#f9ca86] mb-2 sm:mb-4"
                >
                  {carouselItems[currentSlide].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl text-[#ec8387] mb-4 sm:mb-8"
                >
                  {carouselItems[currentSlide].subtitle}
                </motion.p> */}
{/*               
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                  {carouselItems[currentSlide].offers.map((offer, index) => (
                    <motion.div
                      key={offer.code}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-black/80 backdrop-blur-sm rounded-lg p-2 sm:p-4 shadow-lg w-full sm:w-auto max-w-[200px]"
                    >
                      <p className="text-xs sm:text-sm mb-1 sm:mb-2 text-[#f9ca86]">{offer.text}</p>
                      <p className="font-bold text-[#ec8387]">Use Code {offer.code}</p>
                    </motion.div>
                  ))}
                </div>
                 */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 sm:mt-8 bg-[#ec8387] text-[#f9ca86] px-6 sm:px-8 py-2 sm:py-3 rounded-full 
                           hover:bg-[#ec8387]/90 transition-colors duration-200 text-sm sm:text-base"
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentSlide === index ? 'bg-[#ec8387]' : 'bg-[#f9ca86]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}