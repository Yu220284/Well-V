
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import { SESSIONS, TRAINERS } from '@/lib/data';
import { Twitter, Instagram, Copy, UserPlus, Heart, Users, CheckCircle, Home } from 'lucide-react';
import React, { useState } from 'react';
import { useSessionStore } from '@/lib/hooks/use-session-store';
import { useSupabaseFavorites } from '@/lib/hooks/use-supabase-favorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SessionResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [session, setSession] = useState(null);
  
  React.useEffect(() => {
    params.then(({ slug }) => {
      const foundSession = SESSIONS.find(s => s.id === slug);
      setSession(foundSession);
    });
  }, [params]);
  const trainer = TRAINERS.find(t => t.id === 1); // Mock trainer
  const [isFollowing, setIsFollowing] = useState(false);
  const [groupPost, setGroupPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { toggleFavorite: toggleSupabaseFavorite, isFavorite } = useSupabaseFavorites();
  const { toast } = useToast();
  
  const isFav = isFavorite(session?.id || '');

  const handleGroupPost = async () => {
    if (!groupPost.trim()) return;
    setIsPosting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "投稿完了", description: "グループに投稿しました" });
    setGroupPost('');
    setIsPosting(false);
  };

  if (!session) {
    return <div>Session not found</div>;
  }

  const minutes = Math.floor(session.duration / 60);
  const seconds = session.duration % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold font-headline mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              セッション完了！
            </h1>
            <p className="text-sm font-medium text-muted-foreground mb-4">お疲れさまでした</p>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 shadow-lg">
            <Image
              src={session.imageUrl}
              alt={session.imageHint}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">{session.title}</h2>
            <p className="text-muted-foreground mb-4">
              完了時間: {minutes}分{seconds}秒
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  toast({ 
                    title: isFollowing ? "フォロー解除" : "フォロー中", 
                    description: `${trainer?.name}を${isFollowing ? 'フォロー解除' : 'フォロー'}しました` 
                  });
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
                    toast({ 
                      title: isFav ? "お気に入り解除" : "お気に入り追加", 
                      description: session.title 
                    });
                  }
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <Heart className={cn("h-6 w-6", isFav && "fill-red-500 text-red-500")} />
              </Button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">グループに投稿</span>
              </div>
              <Textarea
                placeholder="今日のセッションはいかがでしたか？感想をシェアしましょう！"
                value={groupPost}
                onChange={(e) => setGroupPost(e.target.value)}
                className="mb-3 resize-none"
                rows={3}
              />
              <Button 
                onClick={handleGroupPost}
                disabled={!groupPost.trim() || isPosting}
                className="w-full"
                size="sm"
              >
                {isPosting ? '投稿中...' : 'グループに投稿'}
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-center text-sm font-medium text-muted-foreground mb-3">シェアする</p>
            <div className="flex justify-center gap-4">
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
                onClick={() => {
                  toast({ title: "Instagram共有", description: "Instagram共有機能は開発中です" });
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <Instagram className="h-6 w-6" />
              </Button>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(`${session.title}を完了しました！`);
                  toast({ title: "コピー完了", description: "クリップボードにコピーしました" });
                }}
                variant="ghost"
                className="h-12 w-12"
              >
                <Copy className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          <Link href="/" className="block">
            <Button className="w-full" size="sm">
              <Home className="h-4 w-4 mr-2" />
              ホームに戻る
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
