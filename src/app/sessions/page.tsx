'use client';

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { AdBanner } from "@/components/layout/AdBanner";
import { SearchBar } from "@/components/search/SearchBar";
import { SESSIONS } from "@/lib/data";
import { Sparkles, Heart } from "lucide-react";
import React from "react";
import { useSupabaseSessions } from "@/lib/hooks/use-supabase-sessions";
import type { Session } from "@/lib/types";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavoriteStore } from "@/lib/hooks/use-favorite-store";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import { translateSessionTitle } from "@/lib/session-translations";

export default function SessionsPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].sessions;
  const tTags = translations[language || 'ja'].tags;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('new');
  const { favorites } = useFavoriteStore();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterSessions = (sessions: Session[]) => {
    if (!searchQuery.trim()) return sessions;
    return sessions.filter(session => 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session.tags && session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  };

  const newSessions = filterSessions([...SESSIONS].sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 8));
  const favoriteSessions = filterSessions(SESSIONS.filter(s => favorites.includes(s.id)));
  const workoutSessions = filterSessions(SESSIONS.filter(s => s.category === 'workout'));
  const yogaSessions = filterSessions(SESSIONS.filter(s => s.category === 'yoga'));
  const stretchSessions = filterSessions(SESSIONS.filter(s => s.category === 'stretch'));



  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="space-y-3">
          <section>
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
              <h2 className="relative text-lg font-bold font-headline py-1.5 pl-2">{t.title}</h2>
            </div>
            
            <SearchBar 
              placeholder={t.search}
              onSearch={handleSearch}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="new">
                  <Sparkles className="h-4 w-4 mr-1" />
                  {language === 'ja' ? '新着' : 'New'}
                </TabsTrigger>
                <TabsTrigger value="workout">{tTags.workout}</TabsTrigger>
                <TabsTrigger value="yoga">{tTags.yoga}</TabsTrigger>
                <TabsTrigger value="stretch">{tTags.stretch}</TabsTrigger>
              </TabsList>

              <TabsContent value="new" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {newSessions.map((session) => (
                    <Link key={session.id} href={`/session/${session.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                        <div className="aspect-video relative">
                          <Image src={session.imageUrl} alt={session.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{translateSessionTitle(session.title, language || 'ja')}</h3>
                            <p className="text-xs opacity-90">{Math.floor(session.duration / 60)}{language === 'ja' ? '分' : ' min'}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="mt-4">
                {favoriteSessions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">{t.noFavorites}</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoriteSessions.map((session) => (
                      <Link key={session.id} href={`/session/${session.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                          <div className="aspect-video relative">
                            <Image src={session.imageUrl} alt={session.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 text-white">
                              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{translateSessionTitle(session.title, language || 'ja')}</h3>
                              <p className="text-xs opacity-90">{Math.floor(session.duration / 60)}{language === 'ja' ? '分' : ' min'}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="workout" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {workoutSessions.map((session) => (
                    <Link key={session.id} href={`/session/${session.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                        <div className="aspect-video relative">
                          <Image src={session.imageUrl} alt={session.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{translateSessionTitle(session.title, language || 'ja')}</h3>
                            <p className="text-xs opacity-90">{Math.floor(session.duration / 60)}{language === 'ja' ? '分' : ' min'}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="yoga" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {yogaSessions.map((session) => (
                    <Link key={session.id} href={`/session/${session.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                        <div className="aspect-video relative">
                          <Image src={session.imageUrl} alt={session.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{translateSessionTitle(session.title, language || 'ja')}</h3>
                            <p className="text-xs opacity-90">{Math.floor(session.duration / 60)}{language === 'ja' ? '分' : ' min'}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stretch" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stretchSessions.map((session) => (
                    <Link key={session.id} href={`/session/${session.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                        <div className="aspect-video relative">
                          <Image src={session.imageUrl} alt={session.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{translateSessionTitle(session.title, language || 'ja')}</h3>
                            <p className="text-xs opacity-90">{Math.floor(session.duration / 60)}{language === 'ja' ? '分' : ' min'}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground">
          <p className="inline-flex items-center">
            Well-V
          </p>
      </footer>
        </div>
      </PageTransition>
    </div>
  );
}
