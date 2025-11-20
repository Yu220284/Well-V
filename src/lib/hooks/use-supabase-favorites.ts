'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/supabase/auth';
import { getUserFavorites, toggleUserFavorite } from '@/lib/supabase/database';

export function useSupabaseFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          const userFavorites = await getUserFavorites(currentUser.id);
          setFavorites(userFavorites);
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (sessionId: string) => {
    if (!user) return;
    
    try {
      await toggleUserFavorite(user.id, sessionId);
      setFavorites(prev => 
        prev.includes(sessionId) 
          ? prev.filter(id => id !== sessionId)
          : [...prev, sessionId]
      );
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const isFavorite = (sessionId: string) => {
    return favorites.includes(sessionId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded,
    user
  };
}