
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const [userId, setUserId] = useState('user123');
  const [lastIdChange] = useState(new Date('2024-11-01')); // 最後のID変更日
  const canChangeId = new Date().getTime() - lastIdChange.getTime() > 30 * 24 * 60 * 60 * 1000;
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold font-headline mb-6">プロフィール</h1>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <UserAvatar size="lg" userId="profile-user" />
                <Button variant="outline">画像を変更</Button>
              </div>

              <form className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input id="name" defaultValue="山田 太郎" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userId">ID</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="userId" 
                      value={userId} 
                      onChange={(e) => setUserId(e.target.value)}
                      disabled={!canChangeId}
                    />
                    {!canChangeId && (
                      <span className="text-sm text-muted-foreground self-center">
                        次回変更可能: {new Date(lastIdChange.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea id="bio" defaultValue="フィットネスと健康的な食事が大好きです。" />
                </div>
                <Button type="submit">プロフィールを更新</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
