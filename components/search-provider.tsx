"use client";

import React, { createContext, useContext, useState } from 'react';
import { AnimeData } from '@/lib/api';

interface SearchContextType {
  searchResults: AnimeData[];
  setSearchResults: (results: AnimeData[]) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<AnimeData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}