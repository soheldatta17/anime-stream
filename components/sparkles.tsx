"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateSparkle = () => ({
  id: Math.random(),
  createdAt: Date.now(),
  color: `hsl(${Math.random() * 360}deg, 100%, 75%)`,
  size: Math.random() * 10 + 5,
  style: {
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    zIndex: 2,
  },
});

interface SparklesProps {
  children: React.ReactNode;
}

export function Sparkles({ children }: SparklesProps) {
  const [sparkles, setSparkles] = useState<Array<ReturnType<typeof generateSparkle>>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle();
      setSparkles(sparkles => [...sparkles, sparkle]
        .filter(sp => now - sp.createdAt < 750));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      {children}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.span
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={sparkle.style}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 180 }}
            exit={{ scale: 0, rotate: 360 }}
            transition={{ duration: 0.75 }}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                fill={sparkle.color}
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}