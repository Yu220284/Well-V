"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Play, Heart, Clock, Users, Star, Search, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isFav = isLoaded ? isFavorite(session.id) : false;
  
  const availableTrainers = sessionTrainer ? [sessionTrainer] : TRAINERS;
  const selectedTrainerData = availableTrainers.find(t => t.id === selectedTrainer);
  const filteredTrainers = availableTrainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );



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
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge className={session.category === 'workout' ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' : session.category === 'yoga' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}>
                      {session.category === 'workout' ? 'ワークアウト' : session.category === 'yoga' ? 'ヨガ' : 'ストレッチ'}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-white bg-black/50 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {formatDuration(session.duration)}
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleFavoriteToggle}
                      className="bg-white/90 hover:bg-white h-9 w-9"
                    >
                      <Heart className={cn("h-4 w-4", isFav && "fill-red-500 text-red-500")} />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h1 className="text-xl font-bold font-headline mb-1">{session.title}</h1>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>初心者〜上級者</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="space-y-3 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {session.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-0">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">このセッションについて</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 心身のリラックスとストレス解消</li>
                      <li>• 集中力と注意力の向上</li>
                      <li>• 睡眠の質の改善</li>
                      <li>• 感情の安定とバランス</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">ガイド音声</h3>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between h-auto p-3"
                        >
                          {selectedTrainerData ? (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                  src={selectedTrainerData.imageUrl}
                                  alt={selectedTrainerData.name}
                                  width={40}
                                  height={40}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-medium text-sm">{selectedTrainerData.name}</p>
                                <p className="text-xs text-muted-foreground">{selectedTrainerData.specialty}</p>
                              </div>
                            </div>
                          ) : (
                            "トレーナーを選択..."
                          )}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2" align="start">
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="トレーナーを検索..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-8 h-9"
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto space-y-1">
                            {filteredTrainers.length > 0 ? filteredTrainers.map((trainer) => (
                              <button
                                key={trainer.id}
                                onClick={() => {
                                  setSelectedTrainer(trainer.id);
                                  setOpen(false);
                                  setSearchQuery('');
                                }}
                                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                              >
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                  <Image
                                    src={trainer.imageUrl}
                                    alt={trainer.name}
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="font-medium text-sm">{trainer.name}</p>
                                  <p className="text-xs text-muted-foreground">{trainer.specialty}</p>
                                </div>
                                {isFollowing(trainer.id) && (
                                  <span className="text-xs text-primary">フォロー中</span>
                                )}
                                <Check
                                  className={cn(
                                    "h-4 w-4",
                                    selectedTrainer === trainer.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </button>
                            )) : (
                              <p className="text-sm text-muted-foreground text-center py-4">該当するトレーナーが見つかりません</p>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Button 
                    onClick={handleStartSession}
                    className="w-full h-12 text-base font-semibold"
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