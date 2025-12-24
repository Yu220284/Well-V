"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { AdBanner } from "@/components/layout/AdBanner";
import { SearchBar } from "@/components/search/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { TRAINERS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollowStore } from "@/lib/hooks/use-follow-store";
import type { Trainer } from "@/lib/types";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";

export default function TrainersPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].trainers;
  const tTags = translations[language || 'ja'].tags;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('new');
  const { followedTrainers, toggleFollow, isFollowing, isLoaded } = useFollowStore();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterTrainers = (trainers: Trainer[]) => {
    if (!searchQuery.trim()) return trainers;
    return trainers.filter(trainer => 
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.id.toString().includes(searchQuery) ||
      trainer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const followingTrainers = filterTrainers(TRAINERS.filter(tr => followedTrainers.includes(tr.id)));
  const newTrainers = filterTrainers(TRAINERS.sort((a, b) => b.id - a.id).slice(0, 5));
  const workoutTrainers = filterTrainers(TRAINERS.filter(tr => tr.specialty === 'ワークアウト'));
  const yogaTrainers = filterTrainers(TRAINERS.filter(tr => tr.specialty === 'ヨガ'));
  const stretchTrainers = filterTrainers(TRAINERS.filter(tr => tr.specialty === 'ストレッチ'));

  const TrainerCard = ({ trainer, isFirst }: { trainer: Trainer; isFirst?: boolean }) => (
    <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1" data-tutorial={isFirst ? "trainer-card" : undefined}>
      <Link href={`/trainer/${trainer.id}`} className="block">
        <div className="aspect-square w-full relative overflow-hidden">
          <Image
            src={trainer.imageUrl}
            alt={`Portrait of ${trainer.name}`}
            data-ai-hint={trainer.imageHint}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-white">
            <h3 className="font-semibold text-sm truncate">{trainer.name}</h3>
            <p className="text-xs opacity-90">{trainer.specialty}</p>
          </div>
        </div>
      </Link>
      <CardContent className="p-2">
        <Button
          size="sm"
          variant={isFollowing(trainer.id) ? "default" : "outline"}
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            const isTutorialActive = typeof window !== 'undefined' && localStorage.getItem('wellv_tutorial_active') === 'true';
            if (!isTutorialActive) {
              toggleFollow(trainer.id);
            }
          }}
        >
          <Heart className={`h-3 w-3 mr-1 ${isFollowing(trainer.id) ? 'fill-current' : ''}`} />
          {isFollowing(trainer.id) ? t.following : t.follow}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <AdBanner />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="relative mb-2">
          <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
          <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">{t.title}</h1>
        </div>
        
        <SearchBar 
          placeholder={t.search}
          onSearch={handleSearch}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="new">
              <Sparkles className="h-4 w-4 mr-1" />
              {t.new}
            </TabsTrigger>
            <TabsTrigger value="workout">{tTags.workout}</TabsTrigger>
            <TabsTrigger value="yoga">{tTags.yoga}</TabsTrigger>
            <TabsTrigger value="stretch">{tTags.stretch}</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newTrainers.map((trainer) => <TrainerCard key={trainer.id} trainer={trainer} />)}
            </div>
          </TabsContent>

          <TabsContent value="workout" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {workoutTrainers.map((trainer) => <TrainerCard key={trainer.id} trainer={trainer} />)}
            </div>
          </TabsContent>

          <TabsContent value="yoga" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {yogaTrainers.map((trainer) => <TrainerCard key={trainer.id} trainer={trainer} />)}
            </div>
          </TabsContent>

          <TabsContent value="stretch" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {stretchTrainers.map((trainer) => <TrainerCard key={trainer.id} trainer={trainer} />)}
            </div>
          </TabsContent>
        </Tabs>
      </main>
        </div>
      </PageTransition>
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p className="inline-flex items-center">
          <Sparkles className="inline-block h-4 w-4 text-primary mx-1" />
          Well-V
        </p>
      </footer>
    </div>
  );
}
