'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Languages, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/lib/hooks/use-translations';

const MOCK_POST = {
  user: { name: 'ゆうか', avatar: 'https://picsum.photos/seed/user1/100' },
  content: '今日のヨガセッション、すごく気持ちよかった！新しいポーズにも挑戦できた。',
  translatedContent: "Today's yoga session felt so good! I was able to try new poses too.",
  time: '2時間前',
  reactions: [
    { emoji: '👏', count: 8 },
    { emoji: '🔥', count: 5 },
    { emoji: '👍', count: 12 }
  ],
  comments: [
    { user: { name: 'たけし', avatar: 'https://picsum.photos/seed/user2/100' }, content: 'すごい！私も頑張ります💪', time: '1時間前' },
    { user: { name: 'さくら', avatar: 'https://picsum.photos/seed/user3/100' }, content: '素晴らしいですね✨', time: '30分前' }
  ]
};

export default function PostDetailPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslations();
  const [isTranslated, setIsTranslated] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [post, setPost] = useState(MOCK_POST);
  const [userReaction, setUserReaction] = useState<string | null>('👏');

  const handleReaction = (emoji: string) => {
    if (userReaction === emoji) {
      setUserReaction(null);
      setPost(prev => ({
        ...prev,
        reactions: prev.reactions.map(r => 
          r.emoji === emoji ? { ...r, count: r.count - 1 } : r
        )
      }));
    } else {
      const prevReaction = userReaction;
      setUserReaction(emoji);
      setPost(prev => ({
        ...prev,
        reactions: prev.reactions.map(r => {
          if (r.emoji === emoji) return { ...r, count: r.count + (prevReaction ? 0 : 1) };
          if (r.emoji === prevReaction) return { ...r, count: r.count - 1 };
          return r;
        })
      }));
    }
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    const newCommentData = {
      user: { name: 'あなた', avatar: 'https://picsum.photos/seed/currentuser/100' },
      content: newComment,
      time: 'たった今'
    };
    setPost(prev => ({
      ...prev,
      comments: [...prev.comments, newCommentData]
    }));
    setNewComment('');
    toast({ title: 'コメント投稿完了' });
  };

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.user.name}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{isTranslated ? post.translatedContent : post.content}</p>
                  <button
                    onClick={() => setIsTranslated(!isTranslated)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <Languages className="h-3 w-3" />
                    {isTranslated ? t('community.original') : t('community.translate')}
                  </button>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
                  {post.reactions.map((reaction, idx) => (
                    <Button
                      key={idx}
                      variant={userReaction === reaction.emoji ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleReaction(reaction.emoji)}
                      className="h-8"
                    >
                      <span className="mr-1">{reaction.emoji}</span>
                      {reaction.count}
                    </Button>
                  ))}
                </CardFooter>
              </Card>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">コメント ({post.comments.length})</h3>
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://picsum.photos/seed/currentuser/100" />
                        <AvatarFallback>あ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="コメントを入力..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mb-3 resize-none"
                          rows={2}
                        />
                        <div className="flex justify-end">
                          <Button onClick={handleComment} disabled={!newComment.trim()} size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            投稿
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {post.comments.map((comment, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">{comment.user.name}</p>
                              <p className="text-xs text-muted-foreground">{comment.time}</p>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
