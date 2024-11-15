"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, Search as SearchIcon, Menu, Home, Compass, Heart, List, X } from "lucide-react";
import { motion } from "framer-motion";
import { searchAnime } from "@/lib/api";
import { useSearch } from "./search-provider";
import { toast } from "sonner";
import { Sparkles } from "./sparkles";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchResults, setIsSearching } = useSearch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      const results = await searchAnime(searchQuery);
      setSearchResults(results.data);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to search anime");
    }
  };

  const navItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Compass, label: "Browse", href: "#browse" },
    { icon: Heart, label: "My List", href: "#list" },
  ];

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles>
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        AniStream
                      </span>
                    </Sparkles>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search anime..."
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Sparkles>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              >
                AniStream
              </motion.div>
            </Sparkles>
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search anime..."
                className="pl-10 w-[200px] focus:w-[300px] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:scale-110 transition-transform"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}