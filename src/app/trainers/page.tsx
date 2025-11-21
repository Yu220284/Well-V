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

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('following');
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

  const followingTrainers = filterTrainers(TRAINERS.filter(t => followedTrainers.includes(t.id)));
  const newTrainers = filterTrainers(TRAINERS.sort((a, b) => b.id - a.id).slice(0, 5));
  const workoutTrainers = filterTrainers(TRAINERS.filter(t => t.specialty === 'ワークアウト'));
  const yogaTrainers = filterTrainers(TRAINERS.filter(t => t.specialty === 'ヨガ'));
  const stretchTrainers = filterTrainers(TRAINERS.filter(t => t.specialty === 'ストレッチ'));

  const TrainerCard = ({ trainer }: { trainer: Trainer }) => (
    <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
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
        </div>
      </Link>
      <CardContent className="p-3">
        <Link href={`/trainer/${trainer.id}`}>
          <h3 className="font-semibold text-sm truncate">{trainer.name}</h3>
          <p className="text-xs text-muted-foreground">{trainer.specialty}</p>
        </Link>
        <Button
          size="sm"
          variant={isFollowing(trainer.id) ? "default" : "outline"}
          className="w-full mt-2"
          onClick={(e) => {
            e.preventDefault();
            toggleFollow(trainer.id);
          }}
        >
          <Heart className={`h-3 w-3 mr-1 ${isFollowing(trainer.id) ? 'fill-current' : ''}`} />
          {isFollowing(trainer.id) ? 'フォロー中' : 'フォロー'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <AdBanner />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
          <h1 className="relative text-xl font-bold font-headline py-2 pl-2">トレーナー</h1>
        </div>
        
        <SearchBar 
          placeholder="トレーナーを検索..."
          onSearch={handleSearch}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="following">
              <Heart className="h-4 w-4 mr-1" />
              フォロー中
            </TabsTrigger>
            <TabsTrigger value="new">
              <Sparkles className="h-4 w-4 mr-1" />
              新人
            </TabsTrigger>
            <TabsTrigger value="workout">ワークアウト</TabsTrigger>
            <TabsTrigger value="yoga">ヨガ</TabsTrigger>
            <TabsTrigger value="stretch">ストレッチ</TabsTrigger>
          </TabsList>

          <TabsContent value="following" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {!isLoaded ? (
                <p className="col-span-full text-center text-muted-foreground py-8">読み込み中...</p>
              ) : followingTrainers.length > 0 ? (
                followingTrainers.map((trainer) => <TrainerCard key={trainer.id} trainer={trainer} />)
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">フォロー中のトレーナーはいません</p>
              )}
            </div>
          </TabsContent>

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
    </div>
  );
}
