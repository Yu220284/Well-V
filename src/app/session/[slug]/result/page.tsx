
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { SESSIONS, TRAINERS } from '@/lib/data';
import { Twitter, Instagram, Copy, UserPlus, Heart } from 'lucide-react';
import { useState } from 'react';
import { useSessionStore } from '@/lib/hooks/use-session-store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SessionResultPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = SESSIONS.find(s => s.id === params.slug);
  const trainer = TRAINERS.find(t => t.id === 1); // Mock trainer
  const [isFollowing, setIsFollowing] = useState(false);
  const { toggleFavorite, isFavorite } = useSessionStore();
  const { toast } = useToast();
  
  const isFav = isFavorite(session?.id || '');

  if (!session) {
    return <div>Session not found</div>;
  }

  const minutes = Math.floor(session.duration / 60);
  const seconds = session.duration % 60;

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>セッション完了！</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{session.title}</h2>
          <div className="relative w-full h-60 mb-4">
            <Image
              src={session.imageUrl}
              alt={session.imageHint}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-lg mb-4">
            時間: {minutes}分{seconds}秒
          </p>
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex space-x-2">
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
                className="flex-1 flex items-center gap-2"
              >
                <Twitter className="h-4 w-4" />
                Xで共有
              </Button>
              <Button 
                onClick={() => {
                  toast({ title: "Instagram共有", description: "Instagram共有機能は開発中です" });
                }}
                className="flex-1 flex items-center gap-2"
                variant="outline"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </Button>
            </div>
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(`${session.title}を完了しました！`);
                toast({ title: "コピー完了", description: "クリップボードにコピーしました" });
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              クリップボードにコピー
            </Button>
          </div>
          
          <div className="flex space-x-2 mb-4">
            <Button 
              onClick={() => {
                setIsFollowing(!isFollowing);
                toast({ 
                  title: isFollowing ? "フォロー解除" : "フォロー中", 
                  description: `${trainer?.name}を${isFollowing ? 'フォロー解除' : 'フォロー'}しました` 
                });
              }}
              variant={isFollowing ? "default" : "outline"}
              className="flex-1 flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              {isFollowing ? 'フォロー中' : 'トレーナーをフォロー'}
            </Button>
            <Button 
              onClick={() => {
                if (session) {
                  toggleFavorite(session.id);
                  toast({ 
                    title: isFav ? "お気に入り解除" : "お気に入り追加", 
                    description: session.title 
                  });
                }
              }}
              variant={isFav ? "default" : "outline"}
              className="flex-1 flex items-center gap-2"
            >
              <Heart className={cn("h-4 w-4", isFav && "fill-red-500 text-red-500")} />
              {isFav ? 'お気に入り済み' : 'お気に入りに追加'}
            </Button>
          </div>
          <Link href="/">
            <Button variant="outline">ホームに戻る</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
