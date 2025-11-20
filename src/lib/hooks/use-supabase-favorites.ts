'use client';

import { useState } from 'react';

export function useSupabaseFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (sessionId: string) => {
    setFavorites(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const isFavorite = (sessionId: string) => {
    return favorites.includes(sessionId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}