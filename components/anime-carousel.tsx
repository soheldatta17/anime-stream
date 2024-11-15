"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import type { AnimeData } from "@/lib/api";
import { useState } from "react";
import { VideoPlayer } from "./video-player";

interface AnimeCarouselProps {
  items: AnimeData[];
  loading: boolean;
}

export function AnimeCarousel({ items, loading }: AnimeCarouselProps) {
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);

  if (loading) {
    return (
      <div className="flex space-x-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] flex-none">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((anime) => (
            <CarouselItem 
              key={anime.mal_id} 
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-1"
                onClick={() => setSelectedAnime(anime)}
              >
                <Card className="overflow-hidden cursor-pointer group">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

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