"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnimeCarousel } from "@/components/anime-carousel";
import { AnimeGrid } from "@/components/anime-grid";
import { Recommendations } from "@/components/recommendations";
import { useEffect, useState } from "react";
import { getTopAnime, getSeasonalAnime, AnimeData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { useSearch } from "@/components/search-provider";
import { Sparkles } from "@/components/sparkles";

const categories = [
  { id: "action", name: "Action", query: "action" },
  { id: "romance", name: "Romance", query: "romance" },
  { id: "comedy", name: "Comedy", query: "comedy" },
  { id: "drama", name: "Drama", query: "drama" },
  { id: "fantasy", name: "Fantasy", query: "fantasy" },
  { id: "horror", name: "Horror", query: "horror" },
  { id: "mystery", name: "Mystery", query: "mystery" },
  { id: "sci-fi", name: "Sci-Fi", query: "sci fi" },
];

export default function Home() {
  const [topAnime, setTopAnime] = useState<AnimeData[]>([]);
  const [seasonalAnime, setSeasonalAnime] = useState<AnimeData[]>([]);
  const [categoryAnime, setCategoryAnime] = useState<Record<string, AnimeData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchResults, isSearching } = useSearch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const [top, seasonal] = await Promise.all([
          getTopAnime(),
          getSeasonalAnime(),
        ]);
        
        if (!signal.aborted) {
          setTopAnime(top.data);
          setSeasonalAnime(seasonal.data);
          setLoading(false);
        }
      } catch (err) {
        if (!signal.aborted) {
          const message = err instanceof Error ? err.message : 'Failed to fetch anime data';
          setError(message);
          toast.error(message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const featuredAnime = topAnime[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 container mx-auto px-4"
          >
            <Sparkles>
              <h2 className="text-3xl font-bold mb-8 text-center">Search Results</h2>
            </Sparkles>
            <AnimeGrid items={searchResults} loading={false} />
          </motion.div>
        ) : (
          <>
            <section className="relative h-[80vh] overflow-hidden">
              {!loading && featuredAnime ? (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"
                  />
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${featuredAnime.images.jpg.large_image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="max-w-2xl"
                    >
                      <Sparkles>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                          {featuredAnime.title}
                        </h1>
                      </Sparkles>
                      <p className="text-lg mb-6 text-muted-foreground">
                        {featuredAnime.synopsis?.slice(0, 200)}...
                      </p>
                      <Button size="lg" className="group">
                        <PlayCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-125" />
                        Watch Now
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </section>

            <div className="container mx-auto px-4 space-y-12 pb-12">
              <Recommendations items={topAnime} />

              <section>
                <Sparkles>
                  <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
                </Sparkles>
                <AnimeCarousel items={topAnime} loading={loading} />
              </section>

              <section>
                <Sparkles>
                  <h2 className="text-3xl font-bold mb-8">This Season</h2>
                </Sparkles>
                <AnimeCarousel items={seasonalAnime} loading={loading} />
              </section>

              {categories.map((category) => (
                <section key={category.id}>
                  <Sparkles>
                    <h2 className="text-3xl font-bold mb-8">{category.name}</h2>
                  </Sparkles>
                  <AnimeCarousel
                    items={topAnime.slice(0, 10)} // Replace with actual category data
                    loading={loading}
                  />
                </section>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}