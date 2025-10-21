"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { Header } from "@/components/layout/Header";
import { SESSIONS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play, HeartCrack } from "lucide-react";
import { useSessionStore } from "@/lib/hooks/use-session-store";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const t = useTranslations("FavoritesPage");
  const { favorites, isLoaded } = useSessionStore();
  const favoriteSessions = SESSIONS.filter(session => favorites.includes(session.id));

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline mb-2">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('description')}</p>
        </div>

        {!isLoaded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[280px] w-full rounded-xl" />)}
            </div>
        )}

        {isLoaded && favoriteSessions.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-xl bg-card">
              <HeartCrack className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-2xl font-bold">{t('no_favorites_title')}</h2>
              <p className="text-muted-foreground mt-2">{t('no_favorites_description')}</p>
              <Link href="/" className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full shadow-lg hover:scale-105 transition-transform">
                {t('explore_sessions_button')}
              </Link>
          </div>
        )}
        
        {isLoaded && favoriteSessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteSessions.map((session) => (
              <Link key={session.id} href={`/session/${session.id}`} className="group">
                <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                  <div className="relative h-40 w-full">
                    <Image
                      src={session.imageUrl}
                      alt={session.title}
                      data-ai-hint={session.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white fill-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">{session.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1.5" />
                      <span>{formatDuration(session.duration)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
