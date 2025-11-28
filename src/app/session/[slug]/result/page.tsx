
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import Link from 'next/link';
import { SESSIONS, TRAINERS } from '@/lib/data';
import { Twitter, MessageCircle, Copy, UserPlus, Heart, Users, CheckCircle, Search, Check, ChevronDown, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/lib/hooks/use-session-store';
import { useSupabaseFavorites } from '@/lib/hooks/use-supabase-favorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { saveSessionCompletion } from '@/lib/supabase/session-history';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function SessionResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  
  React.useEffect(() => {
    params.then(({ slug }) => {
      const foundSession = SESSIONS.find(s => s.id === slug);
      setSession(foundSession);
      if (foundSession) {
        setSelectedTrainerId(foundSession.trainerId);
      }
    });
  }, [params]);

  React.useEffect(() => {
    const tutorialActive = localStorage.getItem('wellv_tutorial_active') === 'true';
    const currentStep = parseInt(localStorage.getItem('wellv_tutorial_step') || '0');
    if (tutorialActive && currentStep === 10) {
      localStorage.setItem('wellv_tutorial_step', '11');
    }
    
    // セッション完了を保存
    if (session) {
      saveSessionCompletion(session.id, session.duration)
        .catch(error => console.error('Failed to save session completion:', error));
    }
  }, [session]);
  const trainer = session ? TRAINERS.find(t => t.id === session.trainerId) : null;
  const [isFollowing, setIsFollowing] = useState(false);
  const [communityPost, setCommunityPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(session?.trainerId || 1);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock followed trainers (in real app, get from user data)
  const followedTrainerIds = [1, 2, 3, 4, 5]; // Mock followed trainer IDs
  const sessionTrainerId = session?.trainerId;
  const allFollowedIds = sessionTrainerId && !followedTrainerIds.includes(sessionTrainerId) 
    ? [...followedTrainerIds, sessionTrainerId] 
    : followedTrainerIds;
  const followedTrainers = TRAINERS.filter(t => allFollowedIds.includes(t.id));
  
  const selectedTrainerData = followedTrainers.find(t => t.id === selectedTrainerId);
  const filteredTrainers = followedTrainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { toggleFavorite: toggleSupabaseFavorite, isFavorite } = useSupabaseFavorites();
  const { toast } = useToast();
  
  const isFav = isFavorite(session?.id || '');



  if (!session) {
    return <div>Session not found</div>;
  }

  const minutes = Math.floor(session.duration / 60);
  const seconds = session.duration % 60;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold font-headline mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              セッション完了！
            </h1>
            <p className="text-sm font-medium text-muted-foreground">お疲れさまでした</p>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 shadow-lg">
            <Image
              src={session.imageUrl}
              alt={session.imageHint}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h2 className="text-xl font-bold mb-1">{session.title}</h2>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-3 w-3" />
                <span>完了時間: {minutes}分{seconds}秒</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => {
                  setIsFollowing(!isFollowing);

                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <UserPlus className={cn("h-6 w-6", isFollowing && "text-primary")} />
              </Button>
              <Button 
                onClick={() => {
                  if (session) {
                    toggleSupabaseFavorite(session.id);

                  }
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <Heart className={cn("h-6 w-6", isFav && "fill-red-500 text-red-500")} />
              </Button>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="bg-muted/50 rounded-lg p-3" data-tutorial="post">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">コミュニティに投稿</span>
              </div>
              
              <div className="mb-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between h-auto p-2"
                    >
                      {selectedTrainerData ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={selectedTrainerData.imageUrl}
                              alt={selectedTrainerData.name}
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-xs">{selectedTrainerData.name}</p>
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
                              setSelectedTrainerId(trainer.id);
                              setOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={trainer.imageUrl}
                                alt={trainer.name}
                                width={32}
                                height={32}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-xs">{trainer.name}</p>
                            </div>
                            <Check
                              className={cn(
                                "h-4 w-4",
                                selectedTrainerId === trainer.id ? "opacity-100" : "opacity-0"
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
                onClick={() => {
                  const defaultComment = `${session.title}をクリアしました！`;
                  router.push(`/community/${selectedTrainerId}?comment=${encodeURIComponent(defaultComment)}`);
                }}
                className="w-full"
                size="sm"
              >
                コミュニティに投稿
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-center text-sm font-medium text-muted-foreground mb-2">シェアする</p>
            <div className="flex justify-center gap-4" data-tutorial="share">
              <Button 
                onClick={async () => {
                  const text = `${session.title}を完了しました！ #WellV`;
                  
                  if (navigator.share) {
                    try {
                      const response = await fetch(session.imageUrl);
                      const blob = await response.blob();
                      const file = new File([blob], 'session.jpg', { type: blob.type });
                      
                      await navigator.share({
                        text: text,
                        files: [file]
                      });
                    } catch (error) {
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                      window.open(url, '_blank');
                    }
                  } else {
                    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                    window.open(url, '_blank');
                  }
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <Twitter className="h-6 w-6" />
              </Button>
              <Button 
                onClick={async () => {
                  const text = `🏃♀️ ${session.title}を完了しました！\n\n💪 トレーナー: ${trainer?.name || 'トレーナー'}\n⏱️ 時間: ${Math.floor(session.duration / 60)}分\n\n🌱 Well-Vで一緒にフィットネスを始めませんか？`;
                  
                  try {
                    // LINE share URL
                    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`;
                    
                    // Try LINE app on mobile
                    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    
                    if (isMobile) {
                      // Try LINE app first
                      window.location.href = `line://msg/text/${encodeURIComponent(text)}`;
                      
                      // Fallback to LINE web after delay
                      setTimeout(() => {
                        window.open(lineUrl, '_blank');
                      }, 1000);
                    } else {
                      // Desktop: Open LINE web share
                      window.open(lineUrl, '_blank');
                    }
                    
                    toast({ title: "LINEでシェア", description: "セッション完了をシェアしました" });
                    
                  } catch (error) {
                    // Fallback: Copy text to clipboard
                    try {
                      await navigator.clipboard.writeText(text);
                      toast({ title: "コピー完了", description: "テキストをコピーしました。LINEでシェアしてください。" });
                    } catch {
                      toast({ title: "エラー", description: "LINEシェアに失敗しました" });
                    }
                  }
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button 
                onClick={async () => {
                  const text = `${session.title}を完了しました！ #WellV`;
                  try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      await navigator.clipboard.writeText(text);
                      toast({ title: "コピー完了", description: "クリップボードにコピーしました" });
                    } else {
                      // Fallback for older browsers
                      const textArea = document.createElement('textarea');
                      textArea.value = text;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      toast({ title: "コピー完了", description: "クリップボードにコピーしました" });
                    }
                  } catch (error) {
                    toast({ title: "エラー", description: "コピーに失敗しました" });
                  }
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <Copy className="h-6 w-6" />
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
      </div>
    </ProtectedRoute>
  );
}
