"use client";
import { motion } from 'framer-motion';

export default function Loader({ size = 'default' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#f9ca86]/20" />
        
        {/* Spinning gradient arc */}
        <div className="absolute inset-0 rounded-full border-4 border-t-[#ec8387] border-r-[#ec8387]/50 border-b-transparent border-l-transparent" />
        
        {/* Inner dot */}
        <div className="absolute inset-[2px] rounded-full border-2 border-[#f9ca86]/40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ec8387]" />
        </div>
      </motion.div>
    </div>
  );
} 