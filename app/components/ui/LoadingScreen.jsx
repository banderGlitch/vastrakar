"use client";
import { motion } from 'framer-motion';
import Loader from './Loader';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <img
          src="/logo.png"
          alt="Vastrakari Logo"
          className="w-32 h-auto"
        />
      </motion.div>
      
      <Loader size="default" />
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-[#f9ca86] text-sm font-medium"
      >
        Loading your fashion experience...
      </motion.p>
    </motion.div>
  );
} 