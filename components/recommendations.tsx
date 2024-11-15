"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from '@/components/sparkles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimeData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

interface RecommendationsProps {
  items: AnimeData[];
}

export function Recommendations({ items }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<AnimeData[]>([]);

  useEffect(() => {
    // Simulate personalized recommendations by randomly selecting items
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 4));
  }, [items]);

  return (
    <section className="py-12">
      <Sparkles>
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Just For You
        </h2>
      </Sparkles>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((anime) => (
          <motion.div
            key={anime.mal_id}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[2/3]">
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold mb-2">{anime.title}</h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-3">
                    {anime.synopsis}
                  </p>
                  <Button className="w-full group">
                    <PlayCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
                    Watch Now
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}