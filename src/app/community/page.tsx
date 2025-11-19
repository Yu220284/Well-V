
'use client';

import { Header } from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRAINERS } from "@/lib/data";
import { MessageSquare } from "lucide-react";
import { AdBanner } from "@/components/layout/AdBanner";

// Dummy data for community feed
const feedItems = {
  'sora-group': [
    {
        type: 'trainer_post',
        user: { name: 'Sora (トレーナー)', avatar: 'https://picsum.photos/seed/trainer1/100' },
        content: '皆さん、週末のトレーニングお疲れ様でした！来週は新しいワークアウト動画を公開予定です。お楽しみに！💪',
        time: '2時間前',
        likes: 152,
        comments: 28,
      },
      {
        type: 'achievement',
        user: { name: 'Emi', avatar: 'https://picsum.photos/seed/user1/100' },
        content: '「10分で脂肪燃焼！カーディオブラスト」を完了しました！',
        time: '5分前',
        likes: 12,
        comments: 3,
      },
  ],
  'kaito-group': [
    {
        type: 'post',
        user: { name: 'Kaito', avatar: 'https://picsum.photos/seed/user2/100' },
        content: '今日のヨガ、すごく気持ちよかった！新しいポーズにも挑戦できた。',
        time: '30分前',
        likes: 25,
        comments: 8,
      },
  ],
  'yui-group': [],
};

const reactions = [
    { label: 'すごい！', icon: '👏' },
    { label: 'おつかれさま！', icon: '👍' },
    { label: 'がんばったね！', icon: '🔥' },
    { label: 'わかる！', icon: '🙌' },
];

export default function CommunityPage() {
  return (
    <div className="pb-24 bg-secondary/20">
      <Header />
      <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-headline mb-6">グループ</h1>

            <Tabs defaultValue={TRAINERS[0].groupId}>
              <TabsList className="grid w-full grid-cols-3">
                {TRAINERS.map((trainer) => (
                  <TabsTrigger key={trainer.id} value={trainer.groupId}>{trainer.name}</TabsTrigger>
                ))}
              </TabsList>

              {TRAINERS.map((trainer) => (
                <TabsContent key={trainer.id} value={trainer.groupId}>
                  {/* Post creation card */}
                  <Card className="my-6">
                      <CardContent className="p-4 flex items-center gap-4">
                          <Avatar>
                              <AvatarImage src="https://picsum.photos/seed/me/100" />
                              <AvatarFallback>Me</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                              <input
                                  type="text"
                                  placeholder="今日の調子はどうですか？"
                                  className="w-full bg-transparent outline-none"
                              />
                          </div>
                          <Button size="sm">投稿する</Button>
                      </CardContent>
                  </Card>

                  {/* Feed items */}
                  <div className="space-y-4">
                  {feedItems[trainer.groupId].length > 0 ? (
                    feedItems[trainer.groupId].map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={item.user.avatar} alt={item.user.name} />
                              <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">{item.user.name}</p>
                                {item.type === 'trainer_post' && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">トレーナー</span>}
                              </div>
                              <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-2">
                          <p className="text-sm">{item.content}</p>
                        </CardContent>
                        <CardFooter className="p-2 bg-card/50 flex justify-between">
                            <div className="flex gap-1">
                                {reactions.map(reaction => (
                                    <Button key={reaction.label} variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground px-2">
                                        <span className="text-lg">{reaction.icon}</span>
                                        <span className="text-xs hidden sm:inline">{reaction.label}</span>
                                    </Button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                                <span className="text-xs text-muted-foreground">{item.comments}</span>
                            </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-10">まだ投稿がありません。</p>
                  )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
        </div>
      </main>
    </div>
  );
}
