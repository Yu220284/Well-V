"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Play, Heart, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { useSessionStore } from "@/lib/hooks/use-session-store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { TRAINERS } from "@/lib/data";
import { useTrainerStore } from "@/lib/hooks/use-trainer-store";
import type { Session } from "@/lib/types";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  return `${mins}分`;
}

export function SessionDetail({ session }: { session: Session }) {
  const router = useRouter();
  const { toggleFavorite, isFavorite, isLoaded } = useSessionStore();
  const { followedTrainers, isFollowing } = useTrainerStore();
  const { toast } = useToast();
  
  const sessionTrainer = TRAINERS.find(t => t.id === session.trainerId);
  const [selectedTrainer, setSelectedTrainer] = useState(sessionTrainer?.id || TRAINERS[0].id);
  
  const isFav = isLoaded ? isFavorite(session.id) : false;
  
  const availableTrainers = sessionTrainer ? [sessionTrainer] : TRAINERS;



  const handleStartSession = () => {
    router.push(`/session/${session.id}/play?trainer=${selectedTrainer}`);
  };

  const handleFavoriteToggle = () => {
    const wasIsFav = isFav;
    toggleFavorite(session.id);
    
    setTimeout(() => {
      toast({
        title: wasIsFav ? "お気に入りから削除しました" : "お気に入りに追加しました",
        description: session.title,
      });
    }, 0);
  };

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={session.imageUrl}
                    alt={session.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleFavoriteToggle}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Heart className={cn("h-5 w-5", isFav && "fill-red-500 text-red-500")} />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className={session.category === 'workout' ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' : session.category === 'yoga' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}>
                      {session.category === 'workout' ? 'ワークアウト' : session.category === 'yoga' ? 'ヨガ' : 'ストレッチ'}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatDuration(session.duration)}
                    </div>
                  </div>
                  
                  <h1 className="text-2xl font-bold font-headline">{session.title}</h1>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {session.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>初心者〜上級者</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">このセッションについて</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 心身のリラックスとストレス解消</li>
                      <li>• 集中力と注意力の向上</li>
                      <li>• 睡眠の質の改善</li>
                      <li>• 感情の安定とバランス</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">ガイド音声</h3>
                    <div className="space-y-2">
                      {availableTrainers.map((trainer) => (
                        <div key={trainer.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={trainer.imageUrl}
                              alt={trainer.name}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{trainer.name}</p>
                            <p className="text-xs text-muted-foreground">{trainer.specialty}</p>
                          </div>
                          {isFollowing(trainer.id) && (
                            <span className="text-xs text-primary">フォロー中</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleStartSession}
                    className="w-full h-14 text-lg font-semibold"
                    size="lg"
                    data-tutorial="session-start"
                  >
                    <Play className="h-6 w-6 mr-2" />
                    セッションを開始
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}