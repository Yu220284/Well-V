
'use client';

import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SearchBar } from "@/components/search/SearchBar";

import { TRAINERS } from "@/lib/data";
import { MessageSquare, ChevronRight, Users, ShoppingBag, Sparkles } from "lucide-react";
import { AdBanner } from "@/components/layout/AdBanner";
import { useTrainerStore } from "@/lib/hooks/use-trainer-store";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";

const generateCommunityPosts = (trainerId: number, trainerName: string) => [
  {
    user: { name: `${trainerName} (トレーナー)`, avatar: 'https://picsum.photos/seed/trainer/100', isTrainer: true },
    content: 'みんな、今週もお疲れ様！来週は新しいセッションを公開予定だよ✨',
    time: '2時間前',
    likes: 152,
    comments: 28,
  },
  {
    user: { name: 'ゆうか', avatar: 'https://picsum.photos/seed/user1/100' },
    content: '今日のセッション、すごく良かったです！明日も頑張ります💪',
    time: '30分前',
    likes: 45,
    comments: 12,
  },
  {
    user: { name: 'たくみ', avatar: 'https://picsum.photos/seed/user2/100' },
    content: '初めて完走できました！このコミュニティのみんなのおかげです。ありがとうございます！',
    time: '1時間前',
    likes: 67,
    comments: 15,
  },
  {
    user: { name: 'みさき', avatar: 'https://picsum.photos/seed/user3/100' },
    content: '毎日続けて100日達成！継続は力なりですね✨',
    time: '3時間前',
    likes: 89,
    comments: 22,
  },
];





export default function CommunityPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].community;
  const searchParams = useSearchParams();
  const communityId = searchParams.get('tab');
  const { followedTrainers, isLoaded } = useTrainerStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const filterTrainers = (trainers: any[]) => {
    if (!searchQuery.trim()) return trainers;
    return trainers.filter(trainer => 
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const followedTrainersList = filterTrainers(TRAINERS.filter(t => followedTrainers.includes(t.id)));
  const currentTrainer = communityId ? TRAINERS.find(t => t.communityId === communityId) : null;
  const posts = currentTrainer ? generateCommunityPosts(currentTrainer.id, currentTrainer.name) : [];

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <AdBanner />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-2xl mx-auto">
            {!currentTrainer && (
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">{t.community}</h1>
              </div>
            )}

            {currentTrainer ? (
              <div className="my-6">
                  <Link href="/community" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
                    ← {t.backToList}
                  </Link>
                
                <Card className="mb-6">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Link href={`/trainer/${currentTrainer.id}`}>
                        <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition-opacity">
                          <AvatarImage src={currentTrainer.imageUrl} alt={currentTrainer.name} />
                          <AvatarFallback>{currentTrainer.name[0]}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">{currentTrainer.name}</h2>
                          <Link href={`/community/${currentTrainer.communityId}/shop`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <ShoppingBag className="h-5 w-5" />
                            </Button>
                          </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">{currentTrainer.followers.toLocaleString()}{t.members}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentTrainer.bio}</p>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{t.recentPosts}</h3>
                  <div className="space-y-4">
                    {posts.map((post: any, idx: number) => (
                      <Card key={idx}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.user.avatar} />
                              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{post.user.name}</p>
                              <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm">{post.content}</p>
                        </CardContent>
                        <CardFooter className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            {post.likes}
                          </div>
                          <button className="flex items-center gap-1 hover:text-primary">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : !isLoaded ? (
              <p className="text-center text-muted-foreground py-10">{translations[language || 'ja'].loading}</p>
            ) : followedTrainersList.length === 0 ? (
              <Card className="my-6">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">{language === 'ja' ? 'まだトレーナーをフォローしていません' : 'No trainers followed yet'}</p>
                  <Link href="/trainers">
                    <Button>{language === 'ja' ? 'トレーナーを探す' : 'Find Trainers'}</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div>
                <SearchBar 
                  placeholder={language === 'ja' ? '検索' : 'Search'}
                  onSearch={handleSearch}
                />
                <div className="space-y-4 mt-4">
                  {followedTrainersList.map((trainer) => (
                    <Link key={trainer.id} href={`/community/${trainer.id}`}>
                      <Card className="hover:bg-accent/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={trainer.imageUrl} alt={trainer.name} />
                              <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{trainer.name}</h3>
                              <p className="text-sm text-muted-foreground">{trainer.followers.toLocaleString()}{t.members}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </main>
        </div>
      </PageTransition>
      <footer className="text-center py-6 text-sm text-muted-foreground">
        <p className="inline-flex items-center">
          Well-V
        </p>
      </footer>
    </div>
  );
}
