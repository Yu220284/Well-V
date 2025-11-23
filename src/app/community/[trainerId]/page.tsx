'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { TRAINERS } from '@/lib/data';
import { MessageSquare, ShoppingBag, Send } from 'lucide-react';

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
];

export default function TrainerCommunityPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainerId = parseInt(params.trainerId as string);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState(generateCommunityPosts(trainerId, TRAINERS.find(t => t.id === trainerId)?.name || ''));
  const { toast } = useToast();
  
  useEffect(() => {
    const comment = searchParams.get('comment');
    if (comment) {
      setNewPost(comment);
    }
  }, [searchParams]);
  
  const trainer = TRAINERS.find(t => t.id === trainerId);

  if (!trainer) {
    return <div>トレーナーが見つかりません</div>;
  }

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                <h1 className="relative text-xl font-bold font-headline py-2 pl-2">コミュニティ</h1>
              </div>

              <div className="my-6">
                <Link href="/community" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
                  ← コミュニティ一覧に戻る
                </Link>
                
                <Card className="mb-6 overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />
                  <CardContent className="-mt-12 pb-6">
                    <div className="flex items-end gap-4 mb-4">
                      <Link href={`/trainer/${trainer.id}`}>
                        <Avatar className="h-24 w-24 border-4 border-background cursor-pointer hover:opacity-80 transition-opacity">
                          <AvatarImage src={trainer.imageUrl} alt={trainer.name} />
                          <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">{trainer.name}のコミュニティ</h2>
                          <Link href={`/community/${trainerId}/shop`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <ShoppingBag className="h-5 w-5" />
                            </Button>
                          </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">{trainer.followers.toLocaleString()}人のメンバー</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{trainer.bio}</p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://picsum.photos/seed/currentuser/100" />
                        <AvatarFallback>あ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder={`${trainer.name}のコミュニティに投稿...`}
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-3 resize-none border-0 bg-transparent p-0 focus-visible:ring-0"
                          rows={3}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={async () => {
                              if (!newPost.trim()) return;
                              setIsPosting(true);
                              await new Promise(resolve => setTimeout(resolve, 1000));
                              const newPostData = {
                                user: { name: 'あなた', avatar: 'https://picsum.photos/seed/currentuser/100' },
                                content: newPost,
                                time: 'たった今',
                                likes: 0,
                                comments: 0
                              };
                              setPosts(prev => [newPostData, ...prev]);
                              setNewPost('');
                              setIsPosting(false);
                              toast({ title: "投稿完了", description: "コミュニティに投稿しました" });
                            }}
                            disabled={!newPost.trim() || isPosting}
                            size="sm"
                          >
                            <Send className="w-4 h-4 mr-1" />
                            {isPosting ? '投稿中...' : '投稿'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-lg font-semibold mb-4">最近の投稿</h3>
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
                          <button className="flex items-center gap-1 hover:text-primary">
                            👍 {post.likes}
                          </button>
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
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}