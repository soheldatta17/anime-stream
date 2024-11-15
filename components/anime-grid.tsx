"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import type { AnimeData } from "@/lib/api";
import { useState } from "react";
import { VideoPlayer } from "./video-player";

interface AnimeGridProps {
  items: AnimeData[];
  loading: boolean;
}

export function AnimeGrid({ items, loading }: AnimeGridProps) {
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {items.map((anime) => (
          <motion.div
            key={anime.mal_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card 
              className="overflow-hidden cursor-pointer group"
              onClick={() => setSelectedAnime(anime)}
            >
              <div className="relative aspect-[2/3]">
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="text-white font-semibold line-clamp-2">{anime.title}</h3>
                    <p className="text-white/80 text-sm">
                      Score: {anime.score} • Episodes: {anime.episodes}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedAnime && (
        <VideoPlayer
          isOpen={!!selectedAnime}
          onClose={() => setSelectedAnime(null)}
          title={selectedAnime.title}
        />
      )}
    </>
  );
}