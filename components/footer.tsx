"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Sparkles } from "./sparkles";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          </motion.div>
          <span>by</span>
          <Sparkles>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Sohel Datta
            </span>
          </Sparkles>
          <span>© 2024</span>
        </div>
      </div>
    </motion.footer>
  );
}