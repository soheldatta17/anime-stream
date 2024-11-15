"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MouseCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{
        type: "spring",
        mass: 0.2,
        stiffness: 100,
        damping: 10,
      }}
    >
      <div className="w-full h-full rounded-full bg-white" />
    </motion.div>
  );
}