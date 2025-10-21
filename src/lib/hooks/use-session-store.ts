"use client";

import { useState, useEffect, useCallback } from 'react';
import { isToday, isYesterday, differenceInCalendarDays, parseISO } from 'date-fns';
import type { LoggedSession } from '@/lib/types';

const SESSION_HISTORY_KEY = 'wellv_session_history';
const FAVORITES_KEY = 'wellv_favorites';

export function useSessionStore() {
  const [sessionHistory, setSessionHistory] = useState<LoggedSession[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const historyJson = localStorage.getItem(SESSION_HISTORY_KEY);
      const favoritesJson = localStorage.getItem(FAVORITES_KEY);

      if (historyJson) {
        setSessionHistory(JSON.parse(historyJson));
      }
      if (favoritesJson) {
        setFavorites(JSON.parse(favoritesJson));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveHistory = useCallback((history: LoggedSession[]) => {
    setSessionHistory(history);
    localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(history));
  }, []);

  const saveFavorites = useCallback((favs: string[]) => {
    setFavorites(favs);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  }, []);

  const addSession = useCallback((sessionId: string) => {
    const newSession: LoggedSession = {
      sessionId,
      completedAt: new Date().toISOString(),
    };
    saveHistory([...sessionHistory, newSession]);
  }, [sessionHistory, saveHistory]);

  const toggleFavorite = useCallback((sessionId: string) => {
    const newFavorites = favorites.includes(sessionId)
      ? favorites.filter(id => id !== sessionId)
      : [...favorites, sessionId];
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((sessionId: string) => {
    return favorites.includes(sessionId);
  }, [favorites]);

  const getTodayCount = useCallback(() => {
    if (!isLoaded) return 0;
    return sessionHistory.filter(s => isToday(parseISO(s.completedAt))).length;
  }, [sessionHistory, isLoaded]);

  const getCurrentStreak = useCallback(() => {
    if (!isLoaded || sessionHistory.length === 0) return 0;
  
    const uniqueDates = [...new Set(sessionHistory.map(s => s.completedAt.split('T')[0]))]
      .map(dateStr => parseISO(dateStr))
      .sort((a, b) => b.getTime() - a.getTime());

    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    
    if (isToday(uniqueDates[0]) || isYesterday(uniqueDates[0])) {
        streak = 1;
        for (let i = 0; i < uniqueDates.length - 1; i++) {
            const diff = differenceInCalendarDays(uniqueDates[i], uniqueDates[i+1]);
            if (diff === 1) {
                streak++;
            } else {
                break;
            }
        }
    }
    
    // If last session was not today, and the streak is still running, check if today breaks it.
    if (!isToday(uniqueDates[0]) && streak > 0) {
      if (!isYesterday(uniqueDates[0])) {
         // if the last session was before yesterday, the streak is broken
         const diffFromToday = differenceInCalendarDays(today, uniqueDates[0]);
         if(diffFromToday > 1) return 0;
      }
    }
  
    return streak;
  }, [sessionHistory, isLoaded]);

  return {
    isLoaded,
    sessionHistory,
    addSession,
    getTodayCount,
    getCurrentStreak,
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
